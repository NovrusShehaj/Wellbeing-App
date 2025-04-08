import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  ScaleControl,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix for Leaflet marker icons
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Neighborhood data with more detailed properties
const neighborhoodData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: 1,
        name: "Downtown",
        score: 78,
        population: 4500,
        medianIncome: 65000,
        safetyRating: 82,
        amenities: ["Restaurants", "Museums", "Parks", "Public Transport"],
        description:
          "The bustling heart of Hartford with commercial and cultural attractions.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.68, 41.76],
            [-72.67, 41.76],
            [-72.67, 41.77],
            [-72.68, 41.77],
            [-72.68, 41.76],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: 2,
        name: "Asylum Hill",
        score: 72,
        population: 8200,
        medianIncome: 48000,
        safetyRating: 68,
        amenities: ["Schools", "Community Centers", "Local Shops"],
        description:
          "Residential neighborhood with historic homes and strong community.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.69, 41.76],
            [-72.68, 41.76],
            [-72.68, 41.77],
            [-72.69, 41.77],
            [-72.69, 41.76],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: 3,
        name: "West End",
        score: 85,
        population: 6200,
        medianIncome: 78000,
        safetyRating: 88,
        amenities: ["Parks", "Cafes", "Boutiques", "Historic Sites"],
        description:
          "Affluent area known for its historic architecture and cultural diversity.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.7, 41.76],
            [-72.69, 41.76],
            [-72.69, 41.77],
            [-72.7, 41.77],
            [-72.7, 41.76],
          ],
        ],
      },
    },
  ],
};

const DHMapPage = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter neighborhoods based on search term
  const filteredNeighborhoods = useMemo(
    () => ({
      ...neighborhoodData,
      features: neighborhoodData.features.filter((feature) =>
        feature.properties.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      ),
    }),
    [searchTerm],
  );

  // Get color based on score
  const getColor = (score) => {
    if (score >= 80) return "#1E40AF"; // Dark blue
    if (score >= 70) return "#2563EB"; // Medium blue
    if (score >= 60) return "#3B82F6"; // Light blue
    if (score >= 50) return "#60A5FA"; // Very light blue
    return "#93C5FD"; // Lightest blue
  };

  // Highlight style for hovered neighborhood
  const highlightStyle = {
    weight: 3,
    color: "#F59E0B",
    fillOpacity: 0.9,
  };

  // Reset selected neighborhood when search changes
  React.useEffect(() => {
    setSelectedNeighborhood(null);
  }, [searchTerm]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-blue-400 font-bold text-4xl md:text-5xl mb-4">
            Hartford Neighborhood Map
          </h1>
          <h2 className="text-blue-200 font-medium text-xl md:text-2xl">
            Detailed view of neighborhood wellbeing metrics
          </h2>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search neighborhoods..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-2 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="h-[500px] w-full rounded-md overflow-hidden relative">
              <MapContainer
                center={[41.7658, -72.6734]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false} // We'll add our own positioned control
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeoJSON
                  data={filteredNeighborhoods}
                  style={(feature) => {
                    const score = feature.properties.score || 50;
                    const isHovered =
                      hoveredNeighborhood === feature.properties.id;
                    const isSelected =
                      selectedNeighborhood === feature.properties.id;

                    return {
                      fillColor: getColor(score),
                      weight: isHovered || isSelected ? 3 : 1,
                      opacity: 1,
                      color: isHovered || isSelected ? "#F59E0B" : "white",
                      fillOpacity: 0.7,
                    };
                  }}
                  onEachFeature={(feature, layer) => {
                    layer.on({
                      mouseover: () => {
                        setHoveredNeighborhood(feature.properties.id);
                      },
                      mouseout: () => {
                        setHoveredNeighborhood(null);
                      },
                      click: () => {
                        setSelectedNeighborhood(feature.properties.id);
                      },
                    });

                    layer.bindPopup(`
                                            <div class="text-black p-2">
                                                <h3 class="font-bold text-lg mb-1">${feature.properties.name}</h3>
                                                <div class="flex items-center mb-1">
                                                    <span class="font-medium">Wellbeing Score:</span>
                                                    <span class="ml-2 px-2 py-1 rounded text-white"
                                                          style="background-color: ${getColor(feature.properties.score)}">
                                                        ${feature.properties.score}
                                                    </span>
                                                </div>
                                                <p class="text-sm">${feature.properties.description}</p>
                                            </div>
                                        `);
                  }}
                />
                <ScaleControl position="bottomleft" />
                <ZoomControl position="topright" />
              </MapContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl text-blue-400 mb-4">Map Legend</h3>
              <div className="space-y-3 text-gray-300">
                {[
                  { label: "Excellent (80-100)", color: "#1E40AF" },
                  { label: "Good (70-79)", color: "#2563EB" },
                  { label: "Average (60-69)", color: "#3B82F6" },
                  { label: "Fair (50-59)", color: "#60A5FA" },
                  { label: "Needs Improvement (<50)", color: "#93C5FD" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-4 h-4 mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedNeighborhood ? (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl text-blue-400 mb-4">
                  {
                    neighborhoodData.features.find(
                      (f) => f.properties.id === selectedNeighborhood,
                    )?.properties.name
                  }
                </h3>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-medium">Wellbeing Score</h4>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                      <div
                        className="h-2.5 rounded-full"
                        style={{
                          width: `${neighborhoodData.features.find((f) => f.properties.id === selectedNeighborhood)?.properties.score}%`,
                          backgroundColor: getColor(
                            neighborhoodData.features.find(
                              (f) => f.properties.id === selectedNeighborhood,
                            )?.properties.score,
                          ),
                        }}
                      ></div>
                    </div>
                    <p className="text-right mt-1">
                      {
                        neighborhoodData.features.find(
                          (f) => f.properties.id === selectedNeighborhood,
                        )?.properties.score
                      }
                      /100
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Population</h4>
                    <p>
                      {neighborhoodData.features
                        .find((f) => f.properties.id === selectedNeighborhood)
                        ?.properties.population?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Median Income</h4>
                    <p>
                      $
                      {neighborhoodData.features
                        .find((f) => f.properties.id === selectedNeighborhood)
                        ?.properties.medianIncome?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Safety Rating</h4>
                    <p>
                      {
                        neighborhoodData.features.find(
                          (f) => f.properties.id === selectedNeighborhood,
                        )?.properties.safetyRating
                      }
                      /100
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Key Amenities</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {neighborhoodData.features
                        .find((f) => f.properties.id === selectedNeighborhood)
                        ?.properties.amenities?.map((amenity, i) => (
                          <span
                            key={i}
                            className="bg-blue-900 text-blue-100 text-xs px-2 py-1 rounded"
                          >
                            {amenity}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Description</h4>
                    <p className="text-sm">
                      {
                        neighborhoodData.features.find(
                          (f) => f.properties.id === selectedNeighborhood,
                        )?.properties.description
                      }
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl text-blue-400 mb-4">
                  Neighborhood Details
                </h3>
                <p className="text-gray-300">
                  {hoveredNeighborhood
                    ? `Hovering over ${neighborhoodData.features.find((f) => f.properties.id === hoveredNeighborhood)?.properties.name}`
                    : "Click on any neighborhood to view detailed metrics and information."}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center bg-blue-800 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors border border-blue-600"
          >
            ← Back to Dashboard
          </Link>
          <div className="text-gray-400 text-sm">
            Data updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DHMapPage;
