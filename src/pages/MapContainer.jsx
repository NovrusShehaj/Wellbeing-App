import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  getNeighborhoods,
  getNeighborhoodsByName,
} from "../services/NeighborhoodService";

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
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  // List of livable/sustainable districts
  const livableSustainableDistricts = [
    "Downtown",
    "West End",
    "South Green",
    "Frog Hollow",
    "Sheldon Charter Oak",
  ];

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        setLoading(true);
        const data = await getNeighborhoods();
        if (data && Array.isArray(data)) {
          setNeighborhoods(data);
        } else {
          setError("Invalid neighborhoods data format");
        }
      } catch (error) {
        console.error("Error loading neighborhoods:", error);
        setError("Failed to load neighborhood data");
      } finally {
        setLoading(false);
      }
    };

    fetchNeighborhoods();
  }, []);

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

  const onEachLivableNeighborhood = (feature, layer) => {
    try {
      if (feature.properties?.NAME) {
        layer.bindTooltip(
          `<div class="livable-tooltip">${feature.properties.NAME}<br><span class="livable-badge">Sustainable</span></div>`,
          {
            permanent: false,
            direction: "top",
            className: "livable-neighborhood-label",
          },
        );

        layer.bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-lg text-green-700">${feature.properties.NAME}</h3>
            <div class="bg-green-100 text-green-800 p-2 rounded-md mb-2 flex items-center">
              <svg class="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="font-bold">Livable & Sustainable District</span>
            </div>
            ${feature.properties.Inspector ? `<p class="text-sm"><strong>Inspector:</strong> ${feature.properties.Inspector}</p>` : ""}
            ${feature.properties.Captain ? `<p class="text-sm"><strong>Captain:</strong> ${feature.properties.Captain}</p>` : ""}
            ${feature.properties.ShapeSTArea ? `<p class="text-sm"><strong>Area:</strong> ${feature.properties.ShapeSTArea.toLocaleString()} sq ft</p>` : ""}
          </div>
        `);

        layer.on({
          mouseover: (e) => {
            e.target.setStyle({
              weight: 5,
              color: "#ffffff",
              fillOpacity: 1,
              className: "livable-district-hover",
            });
            e.target.bringToFront();
          },
          mouseout: (e) => {
            e.target.setStyle({
              weight: 4,
              color: "#ffffff",
              fillOpacity: 0.9,
              className: "livable-district-pulse",
            });
          },
        });
      }
    } catch (err) {
      console.error("Error rendering livable neighborhood feature:", err);
    }
  };

  const onEachRegularNeighborhood = (feature, layer) => {
    try {
      if (feature.properties?.NAME) {
        layer.bindTooltip(feature.properties.NAME, {
          permanent: false,
          direction: "top",
          className: "neighborhood-label",
        });

        layer.bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-lg">${feature.properties.NAME}</h3>
            ${feature.properties.Inspector ? `<p class="text-sm"><strong>Inspector:</strong> ${feature.properties.Inspector}</p>` : ""}
            ${feature.properties.Captain ? `<p class="text-sm"><strong>Captain:</strong> ${feature.properties.Captain}</p>` : ""}
            ${feature.properties.ShapeSTArea ? `<p class="text-sm"><strong>Area:</strong> ${feature.properties.ShapeSTArea.toLocaleString()} sq ft</p>` : ""}
          </div>
        `);

        layer.on({
          mouseover: (e) => {
            e.target.setStyle({
              weight: 2,
              color: "#e5e7eb",
              fillOpacity: 0.6,
            });
            e.target.bringToFront();
          },
          mouseout: (e) => {
            e.target.setStyle({
              weight: 1,
              color: "#e5e7eb",
              fillOpacity: 0.4,
            });
          },
        });
      }
    } catch (err) {
      console.error("Error rendering regular neighborhood feature:", err);
    }
  };

  const styleLivableNeighborhood = () => {
    return {
      fillColor: "#22c55e", // Vibrant green
      weight: 4, // Thicker border
      opacity: 1,
      color: "#ffffff", // White border
      dashArray: "",
      fillOpacity: 0.9, // More opaque
      className: "livable-district-pulse", // Animation class
    };
  };

  const styleRegularNeighborhood = () => {
    return {
      fillColor: "#6b7280", // Dark gray
      weight: 1,
      opacity: 0.7,
      color: "#e5e7eb", // Light gray border
      dashArray: "5, 5", // Dashed border
      fillOpacity: 0.4, // More transparent
    };
  };

  if (loading) {
    return <div className="text-center py-8">Loading map data...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-400">
        Error: {error}
        <button
          onClick={() => window.location.reload()}
          className="ml-4 bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  // Separate neighborhoods into livable and regular
  const livableNeighborhoods = neighborhoods.filter((neighborhood) =>
    livableSustainableDistricts.includes(neighborhood.properties?.NAME),
  );

  const regularNeighborhoods = neighborhoods.filter(
    (neighborhood) =>
      !livableSustainableDistricts.includes(neighborhood.properties?.NAME),
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-blue-400 font-bold text-4xl md:text-5xl mb-2">
            Hartford Resources Map
          </h1>
          <h2 className="text-blue-200 font-medium text-xl md:text-2xl">
            Explore community resources and sustainable neighborhoods in
            Hartford
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

              {/* Render regular neighborhood boundaries first (gray) */}
              {regularNeighborhoods.map((neighborhood, index) => {
                try {
                  const geometry = neighborhood?.geometry;
                  if (!geometry || !geometry.type || !geometry.coordinates) {
                    console.warn(
                      "Invalid neighborhood geometry:",
                      neighborhood,
                    );
                    return null;
                  }

                  return (
                    <GeoJSON
                      key={`regular-${neighborhood.properties?.NAME || index}-${index}`}
                      data={{
                        type: geometry.type,
                        coordinates: geometry.coordinates,
                        properties: neighborhood.properties || {},
                      }}
                      style={styleRegularNeighborhood}
                      onEachFeature={onEachRegularNeighborhood}
                    />
                  );
                } catch (err) {
                  console.error(
                    "Error rendering regular neighborhood:",
                    err,
                    neighborhood,
                  );
                  return null;
                }
              })}

              {/* Render livable neighborhood boundaries on top (green) */}
              {livableNeighborhoods.map((neighborhood, index) => {
                try {
                  const geometry = neighborhood?.geometry;
                  if (!geometry || !geometry.type || !geometry.coordinates) {
                    console.warn(
                      "Invalid neighborhood geometry:",
                      neighborhood,
                    );
                    return null;
                  }

                  return (
                    <GeoJSON
                      key={`livable-${neighborhood.properties?.NAME || index}-${index}`}
                      data={{
                        type: geometry.type,
                        coordinates: geometry.coordinates,
                        properties: neighborhood.properties || {},
                      }}
                      style={styleLivableNeighborhood}
                      onEachFeature={onEachLivableNeighborhood}
                    />
                  );
                } catch (err) {
                  console.error(
                    "Error rendering livable neighborhood:",
                    err,
                    neighborhood,
                  );
                  return null;
                }
              })}

              {/* Render resource markers */}
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
