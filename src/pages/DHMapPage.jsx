import React from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const DHMapPage = () => {
    // Properly formatted GeoJSON data
    const neighborhoodData = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    name: "Downtown",
                    score: 78
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [-72.68, 41.76],
                        [-72.67, 41.76],
                        [-72.67, 41.77],
                        [-72.68, 41.77],
                        [-72.68, 41.76]
                    ]]
                }
            },
            // Add more neighborhoods as needed
            {
                type: "Feature",
                properties: {
                    name: "Asylum Hill",
                    score: 72
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [-72.69, 41.76],
                        [-72.68, 41.76],
                        [-72.68, 41.77],
                        [-72.69, 41.77],
                        [-72.69, 41.76]
                    ]]
                }
            }
        ]
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <div className="text-center mb-12">
                    <h1 className="text-blue-400 font-bold text-4xl md:text-5xl mb-4">
                        Hartford Neighborhood Map
                    </h1>
                    <h2 className="text-blue-200 font-medium text-xl md:text-2xl">
                        Detailed view of neighborhood wellbeing metrics
                    </h2>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-10">
                    <div className="h-[500px] w-full rounded-md overflow-hidden">
                        <MapContainer
                            center={[41.7658, -72.6734]}
                            zoom={13}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <GeoJSON
                                data={neighborhoodData}
                                style={(feature) => {
                                    const score = feature.properties.score || 50;
                                    return {
                                        fillColor: score >= 80 ? "#1E40AF" :
                                            score >= 60 ? "#2563EB" :
                                                "#3B82F6",
                                        weight: 1,
                                        opacity: 1,
                                        color: "white",
                                        fillOpacity: 0.7
                                    };
                                }}
                                onEachFeature={(feature, layer) => {
                                    layer.bindPopup(`
                                        <div class="text-black">
                                            <h3 class="font-bold">${feature.properties.name}</h3>
                                            <p>Wellbeing Score: ${feature.properties.score}</p>
                                        </div>
                                    `);
                                }}
                            />
                        </MapContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-xl text-blue-400 mb-4">Map Legend</h3>
                        <div className="space-y-3 text-gray-300">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-blue-800 mr-2"></div>
                                <span>Wellbeing Score 80+</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-blue-600 mr-2"></div>
                                <span>Wellbeing Score 60-79</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-blue-400 mr-2"></div>
                                <span>Wellbeing Score Below 60</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-xl text-blue-400 mb-4">Neighborhood Details</h3>
                        <p className="text-gray-300">
                            Click on any neighborhood to view detailed wellbeing metrics.
                        </p>
                    </div>
                </div>

                <Link
                    to="/dashboard"
                    className="inline-block bg-blue-800 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors border border-blue-600"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default DHMapPage;