import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icons with blue color scheme
const govIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2907/2907241.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  className: "map-marker-blue",
});

const schoolIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2936/2936886.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  className: "map-marker-blue",
});

const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2961/2961837.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  className: "map-marker-blue",
});

const housingIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2379/2379676.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  className: "map-marker-blue",
});

const employmentIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3062/3062635.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  className: "map-marker-blue",
});

const hartfordPosition = [41.7658, -72.6734];

const resources = [
  {
    id: 1,
    type: "government",
    position: [41.7627, -72.6739],
    name: "Hartford City Hall",
    address: "550 Main St, Hartford, CT 06103",
    website: "https://www.hartfordct.gov/",
  },
  {
    id: 2,
    type: "education",
    position: [41.7688, -72.6754],
    name: "Capital Community College",
    address: "950 Main St, Hartford, CT 06103",
    website: "https://www.capitalcc.edu/",
  },
  {
    id: 3,
    type: "medical",
    position: [41.7628, -72.6714],
    name: "Hartford Hospital",
    address: "80 Seymour St, Hartford, CT 06102",
    website: "https://hartfordhospital.org/",
  },
  {
    id: 4,
    type: "medical",
    position: [41.7675, -72.6932],
    name: "Connecticut Children's",
    address: "282 Washington St, Hartford, CT 06106",
    website: "https://www.connecticutchildrens.org/",
  },
  {
    id: 5,
    type: "housing",
    position: [41.7632, -72.6815],
    name: "Hartford Housing Authority",
    address: "180 Overlook Terrace, Hartford, CT 06106",
    website: "https://www.hartfordhousing.org/",
  },
  {
    id: 6,
    type: "housing",
    position: [41.7589, -72.6741],
    name: "Community Renewal Team",
    address: "555 Windsor St, Hartford, CT 06120",
    website: "https://www.crtct.org/",
  },
  {
    id: 7,
    type: "employment",
    position: [41.7663, -72.6834],
    name: "CT Department of Labor",
    address: "200 Folly Brook Blvd, Wethersfield, CT 06109",
    website: "https://www.ctdol.state.ct.us/",
  },
  {
    id: 8,
    type: "employment",
    position: [41.7695, -72.6721],
    name: "Career Resources Inc",
    address: "3580 Main St, Hartford, CT 06120",
    website: "https://www.crinc.org/",
  },
];

const ResetMapView = ({ resetTrigger }) => {
  const map = useMap();
  React.useEffect(() => {
    if (resetTrigger) {
      map.flyTo(hartfordPosition, 13, { duration: 1.5 });
    }
  }, [resetTrigger, map]);
  return null;
};

const MoveToLocation = ({ position }) => {
  const map = useMap();
  React.useEffect(() => {
    if (position) {
      map.flyTo(position, 16, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const ResourceInfoPanel = ({ resource, onClose }) => {
  if (!resource) return null;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mt-4 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
      >
        ×
      </button>
      <h3 className="text-xl font-bold text-blue-400 mb-2">{resource.name}</h3>
      <p className="text-gray-300 italic mb-4">{resource.address}</p>
      {resource.website && (
        <a
          href={resource.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600"
        >
          Visit Website
        </a>
      )}
    </div>
  );
};

const MapPage = () => {
  const [resetTrigger, setResetTrigger] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const handleResetClick = () => {
    setResetTrigger(true);
    setTimeout(() => setResetTrigger(false), 1000);
    setSelectedPosition(null);
    setSelectedResource(null);
    setSearchTerm("");
  };

  const handleCardClick = (position, resource) => {
    setSelectedPosition(position);
    setSelectedResource(resource);
  };

  const handleCloseInfoPanel = () => {
    setSelectedResource(null);
  };

  const filteredResources = resources.filter(
    (resource) =>
      (filter === "all" || resource.type === filter) &&
      (resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.address.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const getIconForMarker = (item) => {
    switch (item.type) {
      case "government":
        return govIcon;
      case "education":
        return schoolIcon;
      case "medical":
        return hospitalIcon;
      case "housing":
        return housingIcon;
      case "employment":
        return employmentIcon;
      default:
        return schoolIcon;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-blue-400 font-bold text-4xl md:text-5xl mb-2">
            Hartford Resources Map
          </h1>
          <h2 className="text-blue-200 font-medium text-xl md:text-2xl">
            Explore community resources in Hartford
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map Container */}
          <div className="w-full lg:w-2/3 h-96 lg:h-[600px] rounded-lg overflow-hidden border-2 border-blue-400">
            <MapContainer
              center={hartfordPosition}
              zoom={13}
              className="h-full w-full"
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <ResetMapView resetTrigger={resetTrigger} />
              <MoveToLocation position={selectedPosition} />

              {filteredResources.map((item) => (
                <Marker
                  key={item.id}
                  position={item.position}
                  icon={getIconForMarker(item)}
                  eventHandlers={{
                    click: () => handleCardClick(item.position, item),
                  }}
                >
                  <Popup className="rounded-md shadow-lg border border-blue-400">
                    <div className="p-2 min-w-[200px] bg-gray-900 text-white">
                      <h4 className="font-bold text-blue-400">{item.name}</h4>
                      <p className="text-sm text-gray-300">{item.address}</p>
                      {item.website && (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-300 hover:text-blue-200 text-xs block mt-1"
                        >
                          Visit Website
                        </a>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Sidebar Container */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              {/* Filters */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    "all",
                    "government",
                    "education",
                    "medical",
                    "housing",
                    "employment",
                  ].map((type) => (
                    <button
                      key={type}
                      className={`py-1 px-3 border-2 border-white text-white cursor-pointer text-sm rounded-md flex items-center justify-center h-8 ${
                        filter === type
                          ? "bg-blue-800 border-blue-400"
                          : "bg-gray-900 hover:text-blue-200"
                      }`}
                      onClick={() => setFilter(type)}
                    >
                      {type === "all"
                        ? "All"
                        : type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 pl-8 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <svg
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Resource Cards */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {filteredResources.length === 0 ? (
                  <div className="text-center text-gray-400 py-4">
                    No resources found matching your criteria
                  </div>
                ) : (
                  filteredResources.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedResource?.id === item.id
                          ? "bg-blue-900 border-2 border-blue-400"
                          : "bg-gray-800 border border-gray-700 hover:border-blue-400"
                      }`}
                      onClick={() => handleCardClick(item.position, item)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {item.address}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            item.type === "government"
                              ? "bg-blue-900 text-blue-200"
                              : item.type === "education"
                                ? "bg-purple-900 text-purple-200"
                                : item.type === "medical"
                                  ? "bg-red-900 text-red-200"
                                  : item.type === "housing"
                                    ? "bg-green-900 text-green-200"
                                    : "bg-indigo-900 text-indigo-200"
                          }`}
                        >
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Resource Info Panel or Reset Button */}
              {selectedResource ? (
                <ResourceInfoPanel
                  resource={selectedResource}
                  onClose={handleCloseInfoPanel}
                />
              ) : (
                <button
                  onClick={handleResetClick}
                  className="w-full mt-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-md transition-colors border border-blue-600"
                >
                  Reset Map View
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
