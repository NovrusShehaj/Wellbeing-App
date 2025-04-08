import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icons with blue color scheme
const govIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/6715/6715901.png",
  iconSize: [40, 40],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  className: "map-marker-blue",
});

const schoolIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/3976/3976631.png",
  iconSize: [40, 40],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  className: "map-marker-blue",
});

const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/179/179571.png",
  iconSize: [40, 40],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  className: "map-marker-blue",
});

const housingIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/2641/2641242.png",
  iconSize: [40, 40],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  className: "map-marker-blue",
});

const employmentIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/8955/8955270.png",
  iconSize: [40, 40],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  className: "map-marker-blue",
});

const hartfordPosition = [41.7658, -72.6734];

const resources = [
  {
    id: 1,
    type: "education",
    position: [41.75970689310172, -72.67245798833926],
    name: "Betances Learning Lab Magnet School",
    address: "42 Charter Oak Ave, Hartford, CT 06106",
    website: "https://www.betancesowls.org/"
  },
  {
    id: 2,
    type: "education",
    position: [41.74510520990086, -72.67204516135463],
    name: "Betances STEM Magnet School",
    address: "400 Wethersfield Ave, Hartford, CT 06114",
    website: "https://www.bstemhartford.org/o/betancesstem"
  },
  {
    id: 3,
    type: "education",
    position: [41.74586146506485, -72.7070435256589],
    name: "Breakthrough Magnet School - South",
    address: "290 Brookfield St, Hartford, CT 06106",
    website: "https://www.breakthroughmagnetschool.org/o/btmss"
  },
  {
    id: 4,
    type: "education",
    position: [41.7861927675441, -72.6970662171737],
    name: "Breakthrough Magnet School - North",
    address: "25 Ridgefield St, Hartford, CT 06112",
    website: "https://www.hartfordschools.org/o/btmsn"
  },
  {
    id: 5,
    type: "education",
    position: [41.761190041908336, -72.69158114971157],
    name: "Burns Latino Studies Academy",
    address: "195 Putnam St, Hartford, CT 06106",
    website: "https://www.hartfordschools.org/o/burnslatinostudy"
  },
  {
    id: 6,
    type: "education",
    position: [41.74508101081767, -72.67243019204075],
    name: "Alfred E. Burr Middle School",
    address: "400 Wethersfield Ave, Hartford, CT 06114",
    website: "https://www.burrhps.org/o/burr"
  },
  {
    id: 7,
    type: "education",
    position: [41.77277950118139, -72.67580614971094],
    name: "Capital Prepatory Magnet School",
    address: "1304 Main St, Hartford, CT 06103",
    website: "https://www.thecapitalprep.org/"
  },
  {
    id: 8,
    type: "education",
    position: [41.73086524056437, -72.67525081902686],
    name: "Dr. James H Naylor/CCSU Leadership Academy",
    address: "639 Franklin Ave, Hartford, CT 06114",
    website: "https://www.hartfordschools.org/o/naylorschool"
  },
  {
    id: 9,
    type: "education",
    position: [41.77331090995863, -72.70130000183126],
    name: "Dr. Joseph S. Renzulli Gifted and Talented Academy",
    address: "85 Woodland St, Hartford, CT 06105",
    website: "https://www.hartfordschools.org/o/renzulli/"
  },
  {
    id: 10,
    type: "education",
    position: [41.74622523496303, -72.68021449019032],
    name: "Dr. Michael D. Fox School",
    address: "470 Maple Ave, Hartford, CT 06114",
    website: "https://www.hartfordschools.org/o/mdfox"
  },
  {
    id: 11,
    type: "education",
    position: [41.73435813408519, -72.68059203251941],
    name: "Dwight Bellizzi Dual Language Academy",
    address: "215 South St, Hartford, CT 06114",
    website: "https://www.hartfordschools.org/o/dwightbellizzi"
  },
  {
    id: 12,
    type: "education",
    position: [41.73541735739312, -72.69467729019092],
    name: "E. B. Kennelly School",
    address: "180 White St, Hartford, CT 06114",
    website: "https://www.kennellyschool.org/"
  },
  {
    id: 13,
    type: "education",
    position: [41.74159371135509, -72.70103855950443],
    name: "Environmental Sciences Magnet School at Mary Hooker",
    address: "440 Broadview Terrace, Hartford, CT 06106",
    website: "https://www.environmentalsciencesmagnet.org/"
  },
  {
    id: 14,
    type: "education",
    position: [41.74640764888024, -72.69920602457724],
    name: "Expeditionary Learning Academy at Moylan School",
    address: "101 Catherine St, Hartford, CT 06106",
    website: "https://www.hartfordschools.org/o/elams"
  },
  {
    id: 15,
    type: "education",
    position: [41.78277707701602, -72.68712961902425],
    name: "Fred D. Wish Museum School",
    address: "104 Vine St, Hartford, CT 06112",
    website: "https://www.hartfordschools.org/o/wishmuseumschool/"
  },
  {
    id: 16,
    type: "education",
    position: [41.775175910987635, -72.68240898576798],
    name: "Global Communications Academy",
    address: "85 Edwards St, Hartford, CT 06120",
    website: "https://www.hartfordschools.org/o/global"
  },
  {
    id: 17,
    type: "education",
    position: [41.79191284293324, -72.70202628463686],
    name: "Hartford Pre-K Magnet",
    address: "121 Cornwall St, Hartford, CT 06112",
    website: "https://www.hartfordschools.org/o/hpkm"
  },
  {
    id: 18,
    type: "education",
    position: [41.80073154134314, -72.70819646135182],
    name: "Kinsella Magnet School of Performing Arts (PreK - 8)",
    address: "415 Granby St, Hartford, CT 06112",
    website: "https://www.hartfordschools.org/o/kinsellaprek8"
  },
  {
    id: 19,
    type: "education",
    position: [41.759099554600446, -72.68913268833931],
    name: "María C. Colón Sánchez Elementary",
    address: "176 Babcock St, Hartford, CT 06106",
    website: "https://www.sanchezschool.org/o/sanchez"
  },
  {
    id: 20,
    type: "education",
    position: [41.786196426308265, -72.69714477680202],
    name: "Martin Luther King Jr. Middle School",
    address: "25 Ridgefield St, Hartford, CT 06112",
    website: "https://www.hartfordschools.org/o/mlk"
  },
  {
    id: 21,
    type: "education",
    position: [41.750222466089305, -72.69818600368279],
    name: "McDonough Middle School",
    address: "111 Hillside Ave, Hartford, CT 06106",
    website: "https://www.hartfordschools.org/o/mcdonough/"
  },
  {
    id: 22,
    type: "education",
    position: [41.7979395014897, -72.6698074441585],
    name: "Milner Middle School",
    address: "150 Tower Ave, Hartford, CT 06120",
    website: "https://www.hartfordschools.org/o/milner/"
  },
  {
    id: 23,
    type: "education",
    position: [41.79218334070588, -72.7077669668248],
    name: "Montessori Magnet School at Annie Fisher",
    address: "280 Plainfield St, Hartford, CT 06112",
    website: "https://www.hartfordschools.org/o/anniefisher"
  },
  {
    id: 24,
    type: "education",
    position: [41.73258377972185, -72.70779523251946],
    name: "Montessori Magnet at Batchelder",
    address: "280 Plainfield St, Hartford, CT 06112",
    website: "https://www.hartfordschools.org/o/batchelder"
  },
  {
    id: 25,
    type: "education",
    position: [41.76879477873677, -72.71223236929502],
    name: "Noah Webster MicroSociety Magnet School",
    address: "5 Cone St, Hartford, CT 06105",
    website: "https://www.nwmms.org/o/nwmms"
  },
  {
    id: 26,
    type: "education",
    position: [41.75697116150175, -72.70791856135405],
    name: "Parkville Community School",
    address: "47 New Park Ave, Hartford, CT 06106",
    website: "https://www.hartfordschools.org/o/parkville"
  },
  {
    id: 27,
    type: "education",
    position: [41.77937448268038, -72.67605143436751],
    name: "S.A.N.D School",
    address: "1750 Main St, Hartford, CT 06120",
    website: "https://sand.hartfordschools.org/o/sand"
  },
  {
    id: 28,
    type: "education",
    position: [41.796452633435344, -72.70131063251623],
    name: "Sarah J. Rawson Elementary School",
    address: "260 Holcomb St, Hartford, CT 06112",
    website: "https://www.hartfordschools.org/o/rawson"
  },
  {
    id: 29,
    type: "education",
    position: [41.79205777586525, -72.70766785950184],
    name: "Science, Technology, Engineering and Math (STEM) Magnet School at Annie Fisher",
    address: "280 Plainfield St, Hartford, CT 06112",
    website: "https://anniefisherstem.hartfordschools.org/o/stemfisher"
  },
  {
    id: 30,
    type: "education",
    position: [41.77024392028868, -72.69571447484601],
    name: "West Middle School",
    address: "44 Niles St, Hartford, CT 06105",
    website: "https://www.hartfordschools.org/o/west"
  },

  {
    id: 31,
    type: "education",
    position: [41.74006884986331, -72.67222001902643],
    name: "Bulkeley High School",
    address: "585 Wethersfield Ave, Hartford, CT 06114",
    website: "https://bulkeley.hartfordschools.org/o/bulkeleyhigh"
  },
  {
    id: 32,
    type: "education",
    position: [41.77277950118139, -72.67580614971094],
    name: "Capital Prepatory Magnet School",
    address: "1304 Main St, Hartford, CT 06103",
    website: "https://www.thecapitalprep.org/"
  },
  {
    id: 33,
    type: "education",
    position: [41.77326315280794, -72.70135935156128],
    name: "Classical Magnet School",
    address: "85 Woodland St, Hartford, CT 06105",
    website: "https://www.classicalmagnet.org/o/classicalmagnet"
  },
  {
    id: 34,
    type: "education",
    position: [41.76394277436404, -72.56120169016539],
    name: "Great Path Academy at Manchester Community College",
    address: "60 Bidwell St, Manchester, CT 06040",
    website: "https://www.hartfordschools.org/o/gpa"
  },
  {
    id: 35,
    type: "education",
    position: [41.75051277488835, -72.68705883806977],
    name: "Hartford Magnet Trinity College Academy",
    address: "53 Vernon St, Hartford, CT 06106",
    website: "https://www.hartfordschools.org/o/hmtca"
  },
  {
    id: 36,
    type: "education",
    position: [41.76483995854785, -72.70078890368207],
    name: "Hartford Public High School",
    address: "55 Forest St, Hartford, CT 06105",
    website: "https://www.hartfordschools.org/o/hphs"
  },
  {
    id: 37,
    type: "education",
    position: [41.80085950918856, -72.70813208833721],
    name: "Kinsella Magnet School of Performing Arts (9-12)",
    address: "415 Granby St, Hartford, CT 06112",
    website: "https://www.hartfordschools.org/o/kinsella912"
  },
  {
    id: 38,
    type: "education",
    position: [41.740791858993056, -72.63537224177102],
    name: "Pathways Academy of Technology and Design",
    address: "2 Pent Rd, East Hartford, CT 06118",
    website: "https://www.hartfordschools.org/o/pathways"
  },
  {
    id: 39,
    type: "education",
    position: [41.75280715100274, -72.6607336208761],
    name: "Sport and Medical Sciences Academy",
    address: "280 Huyshope Ave, Hartford, CT 06106",
    website: "https://www.hartfordschools.org/o/smsa"
  },
  {
    id: 40,
    type: "education",
    position: [41.80152895900805, -72.7073049158584],
    name: "Thomas Snell Weaver High School",
    address: "415 Granby St, Hartford, CT 06112",
    website: "https://www.hartfordschools.org/o/weaver"
  },
  {
    id: 41,
    type: "education",
    position: [41.79632582530961, -72.70955587669512],
    name: "University High School of Science and Engineering",
    address: "351 Mark Twain Dr, Hartford, CT 06112",
    website: "https://www.uhsse.org/o/universityhigh"
  },

  {
    id: 42,
    type: "medical",
    position: [41.75608336529734, -72.68043823752289],
    name: "Hartford Hospital",
    address: "80 Seymour St, Hartford, CT 06106",
    website: "https://hartfordhospital.org/",
    phone: "+18605455000"
  },
  {
    id: 43,
    type: "medical",
    position: [41.76570982711526, -72.68333870449491],
    name: "Connecticut Children's Medical Center",
    address: "282 Washington St, Hartford, CT 06106",
    website: "https://www.connecticutchildrens.org/", 
    phone: "+18605459000"
  },
  {
    id: 44,
    type: "medical",
    position: [41.77534790769684, -72.69889497324345],
    name: "St Francis Hospital & Medical Center",
    address: "114 Woodland St, Hartford, CT 06105",
    website: "https://www.trinityhealthofne.org/location/saint-francis-hospital", 
    phone: "+18607144000"
  },
  {
    id: 45,
    type: "government",
    position: [41.76448314095881, -72.68233394754601],
    name: "Connecticut State Capitol",
    address: "Connecticut State Capitol, 210 Capitol Ave, Hartford, CT 06106",
    website: "https://portal.ct.gov/About/State-Symbols/The-State-Capitol", 
    phone: "+18605459000"
  }
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
        <div className="text-center mb-8">
          <h1 className="text-blue-400 font-bold text-4xl md:text-5xl mb-2">
            Hartford Resources Map
          </h1>
          <h2 className="text-blue-200 font-medium text-xl md:text-2xl">
            Explore community resources in Hartford
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
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

          <div className="w-full lg:w-1/3">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
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
