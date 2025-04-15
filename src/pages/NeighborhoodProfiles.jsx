import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NeighborhoodProfiles = () => {
    const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);

    const neighborhoods = [
        { id: 1, name: "Downtown", population: 4500, wellbeingScore: 78, featuredImage: "/images/downtown.jpg" },
        { id: 2, name: "Frog Hollow", population: 12500, wellbeingScore: 62, featuredImage: "/images/frog-hollow.jpg" },
        { id: 3, name: "Asylum Hill", population: 9800, wellbeingScore: 65, featuredImage: "/images/asylum-hill.jpg" },
        { id: 4, name: "South Green", population: 8700, wellbeingScore: 58, featuredImage: "/images/south-green.jpg" },
        { id: 5, name: "Clay Arsenal", population: 5600, wellbeingScore: 52, featuredImage: "/images/clay-arsenal.jpg" },
        { id: 6, name: "Barry Square", population: 7200, wellbeingScore: 68, featuredImage: "/images/barry-square.jpg" }
    ];

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <div className="text-center mb-12">
                    <h1 className="text-blue-400 font-bold text-5xl md:text-6xl mb-4">
                        Neighborhood Profiles
                    </h1>
                    <h2 className="text-blue-200 font-medium text-2xl md:text-3xl">
                        Detailed profiles for each Hartford neighborhood
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {neighborhoods.map(neighborhood => (
                        <div
                            key={neighborhood.id}
                            className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-400 transition-all"
                            onClick={() => setSelectedNeighborhood(neighborhood)}
                        >
                            <div className="h-48 bg-gray-800 flex items-center justify-center">
                                <div className="text-blue-400 text-3xl">🏘️</div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2">{neighborhood.name}</h3>
                                <div className="flex justify-between text-gray-400 mb-4">
                                    <span>Population: {neighborhood.population.toLocaleString()}</span>
                                    <span>Score: {neighborhood.wellbeingScore}/100</span>
                                </div>
                                <Link
                                    to={`/neighborhood/${neighborhood.name.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="block text-center bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600"
                                >
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedNeighborhood && (
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 mb-12">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">{selectedNeighborhood.name} Quick Facts</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2">Demographics</h4>
                                <ul className="text-gray-400 space-y-2">
                                    <li>Median Age: 34.2 years</li>
                                    <li>Household Income: $42,500</li>
                                    <li>Poverty Rate: 28%</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2">Key Indicators</h4>
                                <ul className="text-gray-400 space-y-2">
                                    <li>Food Access Score: 72/100</li>
                                    <li>Education Index: 65/100</li>
                                    <li>Employment Rate: 58%</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NeighborhoodProfiles;