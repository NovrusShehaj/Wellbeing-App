// src/pages/DisparityHighlighting.jsx
import React, { useState, useEffect } from "react";
import { Bar, Scatter } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Link } from 'react-router-dom';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const DisparityHighlighting = () => {
    const [year, setYear] = useState(2023); // Set default to existing data year
    const [selectedMetric, setSelectedMetric] = useState("overall");
    const [loading, setLoading] = useState(true);
    const [disparityData, setDisparityData] = useState(null);
    const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);

    // Sample data - in a real app, this would come from an API
    const mockData = {
        2023: {
            overall: [
                { neighborhood: "Downtown", score: 78, population: 4500, change: 2.4 },
                { neighborhood: "Frog Hollow", score: 62, population: 12500, change: -1.2 },
                { neighborhood: "Asylum Hill", score: 65, population: 9800, change: 0.8 },
                { neighborhood: "South Green", score: 58, population: 8700, change: -0.5 },
                { neighborhood: "Clay Arsenal", score: 52, population: 5600, change: 1.7 },
                { neighborhood: "Barry Square", score: 68, population: 7200, change: 3.1 },
                { neighborhood: "Sheldon Charter Oak", score: 71, population: 6300, change: 2.2 },
            ],
            health: [
                { neighborhood: "Downtown", score: 82, population: 4500, change: 3.1 },
                { neighborhood: "Frog Hollow", score: 65, population: 12500, change: -2.0 },
                { neighborhood: "Asylum Hill", score: 68, population: 9800, change: 1.2 },
                { neighborhood: "South Green", score: 60, population: 8700, change: -1.8 },
                { neighborhood: "Clay Arsenal", score: 55, population: 5600, change: 0.9 },
                { neighborhood: "Barry Square", score: 72, population: 7200, change: 2.5 },
                { neighborhood: "Sheldon Charter Oak", score: 75, population: 6300, change: 1.8 },
            ],
            education: [
                { neighborhood: "Downtown", score: 75, population: 4500, change: 1.8 },
                { neighborhood: "Frog Hollow", score: 58, population: 12500, change: -0.5 },
                { neighborhood: "Asylum Hill", score: 62, population: 9800, change: 0.4 },
                { neighborhood: "South Green", score: 55, population: 8700, change: -1.2 },
                { neighborhood: "Clay Arsenal", score: 48, population: 5600, change: 2.3 },
                { neighborhood: "Barry Square", score: 65, population: 7200, change: 3.5 },
                { neighborhood: "Sheldon Charter Oak", score: 68, population: 6300, change: 2.6 },
            ],
            economy: [
                { neighborhood: "Downtown", score: 85, population: 4500, change: 4.2 },
                { neighborhood: "Frog Hollow", score: 55, population: 12500, change: -2.3 },
                { neighborhood: "Asylum Hill", score: 60, population: 9800, change: 0.7 },
                { neighborhood: "South Green", score: 52, population: 8700, change: -0.8 },
                { neighborhood: "Clay Arsenal", score: 45, population: 5600, change: 1.5 },
                { neighborhood: "Barry Square", score: 70, population: 7200, change: 4.0 },
                { neighborhood: "Sheldon Charter Oak", score: 72, population: 6300, change: 3.2 },
            ]
        }
    };

    useEffect(() => {
        // Simulate API call
        const fetchData = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
                setDisparityData(mockData[year]);
            } catch (error) {
                console.error("Error fetching disparity data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [year]);

    // Chart options matching your theme
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: "#E5E7EB" // Gray-200
                }
            },
            tooltip: {
                backgroundColor: "#1F2937", // Gray-800
                titleColor: "#60A5FA", // Blue-400
                bodyColor: "#E5E7EB", // Gray-200
                borderColor: "#374151", // Gray-700
                borderWidth: 1
            }
        },
        scales: {
            x: {
                grid: {
                    color: "#374151" // Gray-700
                },
                ticks: {
                    color: "#9CA3AF" // Gray-400
                }
            },
            y: {
                grid: {
                    color: "#374151" // Gray-700
                },
                ticks: {
                    color: "#9CA3AF" // Gray-400
                },
                beginAtZero: false,
                min: 0,
                max: 100
            }
        }
    };

    // Prepare data for the disparity chart
    const prepareDisparityChartData = () => {
        if (!disparityData || !disparityData[selectedMetric]) return null;

        const data = [...disparityData[selectedMetric]].sort((a, b) => b.score - a.score);
        const colors = data.map(item => {
            if (selectedNeighborhood && item.neighborhood === selectedNeighborhood) {
                return "#F59E0B"; // Yellow-500 for selected
            }
            return item.score >= 70 ? "#10B981" : // Green-500 for high scores
                item.score >= 50 ? "#3B82F6" : // Blue-500 for medium
                    "#EF4444"; // Red-500 for low
        });

        return {
            labels: data.map(item => item.neighborhood),
            datasets: [{
                label: `${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Wellbeing Score`,
                data: data.map(item => item.score),
                backgroundColor: colors,
                borderColor: "#1F2937", // Gray-800
                borderWidth: 1,
                hoverBackgroundColor: "#60A5FA", // Blue-400 on hover
            }]
        };
    };

    // Prepare data for the scatter plot (score vs population)
    const prepareScatterPlotData = () => {
        if (!disparityData || !disparityData[selectedMetric]) return null;

        return {
            datasets: [{
                label: 'Neighborhoods',
                data: disparityData[selectedMetric].map(item => ({
                    x: item.population,
                    y: item.score,
                    neighborhood: item.neighborhood
                })),
                backgroundColor: disparityData[selectedMetric].map(item =>
                    selectedNeighborhood === item.neighborhood ? "#F59E0B" : "#3B82F6"
                ),
                borderColor: "#1F2937", // Gray-800
                borderWidth: 1,
                pointRadius: disparityData[selectedMetric].map(item =>
                    selectedNeighborhood === item.neighborhood ? 8 : 6
                ),
            }]
        };
    };

    const scatterOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.raw.neighborhood}: ${context.parsed.y} score (Pop: ${context.parsed.x})`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Population',
                    color: '#9CA3AF' // Gray-400
                },
                grid: {
                    color: "#374151" // Gray-700
                },
                ticks: {
                    color: "#9CA3AF" // Gray-400
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Wellbeing Score',
                    color: '#9CA3AF' // Gray-400
                },
                grid: {
                    color: "#374151" // Gray-700
                },
                ticks: {
                    color: "#9CA3AF" // Gray-400
                },
                min: 0,
                max: 100
            }
        },
        onClick: (event, elements) => {
            if (elements.length > 0 && disparityData && disparityData[selectedMetric]) {
                const index = elements[0].index;
                const neighborhood = disparityData[selectedMetric][index].neighborhood;
                setSelectedNeighborhood(prev => prev === neighborhood ? null : neighborhood);
            }
        }
    };

    // Get neighborhood details for the selected neighborhood
    const getSelectedNeighborhoodDetails = () => {
        if (!selectedNeighborhood || !disparityData || !disparityData[selectedMetric]) return null;

        return disparityData[selectedMetric].find(item => item.neighborhood === selectedNeighborhood);
    };

    // Render loading state
    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Render if no data is available
    if (!disparityData) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="text-center p-6 bg-gray-900 rounded-lg border border-red-500 max-w-md">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Data Unavailable</h2>
                    <p className="text-gray-300 mb-4">Could not load disparity data. Please try again later.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-blue-400 font-bold text-5xl md:text-6xl mb-4">
                        Hartford Wellbeing Disparities
                    </h1>
                    <h2 className="text-blue-200 font-medium text-2xl md:text-3xl">
                        Identifying and addressing inequalities across neighborhoods
                    </h2>
                </div>

                {/* Filters */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="year" className="block text-blue-200 font-medium mb-2">Select Year:</label>
                            <select
                                id="year"
                                value={year}
                                onChange={(e) => setYear(parseInt(e.target.value))}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {[2023].map((y) => ( // Only 2023 has data in our mock
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="metric" className="block text-blue-200 font-medium mb-2">Select Metric:</label>
                            <select
                                id="metric"
                                value={selectedMetric}
                                onChange={(e) => setSelectedMetric(e.target.value)}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="overall">Overall Wellbeing</option>
                                <option value="health">Health</option>
                                <option value="education">Education</option>
                                <option value="economy">Economic</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                {disparityData[selectedMetric] ? (
                    <>
                        {/* Disparity Visualization */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                            {/* Bar Chart */}
                            <div className="lg:col-span-2 bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-400 transition-all">
                                <h2 className="text-xl font-bold text-blue-400 mb-4">
                                    {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Wellbeing by Neighborhood
                                </h2>
                                <div className="h-96">
                                    {prepareDisparityChartData() && (
                                        <Bar
                                            data={prepareDisparityChartData()}
                                            options={{
                                                ...chartOptions,
                                                onClick: (event, elements) => {
                                                    if (elements.length > 0) {
                                                        const index = elements[0].index;
                                                        const neighborhood = disparityData[selectedMetric][index].neighborhood;
                                                        setSelectedNeighborhood(prev => prev === neighborhood ? null : neighborhood);
                                                    }
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Neighborhood Details */}
                            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-400 transition-all">
                                <h2 className="text-xl font-bold text-blue-400 mb-4">
                                    {selectedNeighborhood ? selectedNeighborhood : "Select a Neighborhood"}
                                </h2>
                                {selectedNeighborhood && getSelectedNeighborhoodDetails() ? (
                                    <div className="space-y-4">
                                        <div className="bg-gray-800 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-300 mb-2">Current Score</h3>
                                            <div className="flex items-center">
                        <span className="text-3xl font-bold text-white mr-2">
                          {getSelectedNeighborhoodDetails().score}
                        </span>
                                                <span className="text-sm text-gray-400">/ 100</span>
                                            </div>
                                        </div>
                                        <div className="bg-gray-800 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-300 mb-2">Population</h3>
                                            <p className="text-xl text-white">
                                                {getSelectedNeighborhoodDetails().population.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="bg-gray-800 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-blue-300 mb-2">Yearly Change</h3>
                                            <div className="flex items-center">
                        <span className={`text-xl font-bold ${
                            getSelectedNeighborhoodDetails().change >= 0
                                ? "text-green-500"
                                : "text-red-500"
                        }`}>
                          {getSelectedNeighborhoodDetails().change >= 0 ? "+" : ""}
                            {getSelectedNeighborhoodDetails().change}%
                        </span>
                                                {getSelectedNeighborhoodDetails().change >= 0 ? (
                                                    <svg className="w-5 h-5 ml-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5 ml-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <Link
                                                to={`/neighborhood/${selectedNeighborhood.toLowerCase().replace(/\s+/g, '-')}`}
                                                className="block text-center bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600"
                                            >
                                                View Neighborhood Details
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-500">
                                        <p>Click on a neighborhood in the chart to see details</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Scatter Plot */}
                        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-10 hover:border-blue-400 transition-all">
                            <h2 className="text-xl font-bold text-blue-400 mb-4">
                                Score vs Population Density
                            </h2>
                            <div className="h-96">
                                {prepareScatterPlotData() && (
                                    <Scatter
                                        data={prepareScatterPlotData()}
                                        options={scatterOptions}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Disparity Analysis */}
                        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-10 hover:border-blue-400 transition-all">
                            <h2 className="text-xl font-bold text-blue-400 mb-4">Disparity Analysis</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-blue-300 mb-2">Highest Score</h3>
                                    <p className="text-2xl font-bold text-white mb-1">
                                        {Math.max(...disparityData[selectedMetric].map(item => item.score))}
                                    </p>
                                    <p className="text-gray-400">
                                        {disparityData[selectedMetric].find(
                                            item => item.score === Math.max(...disparityData[selectedMetric].map(item => item.score))
                                        ).neighborhood}
                                    </p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-blue-300 mb-2">Lowest Score</h3>
                                    <p className="text-2xl font-bold text-white mb-1">
                                        {Math.min(...disparityData[selectedMetric].map(item => item.score))}
                                    </p>
                                    <p className="text-gray-400">
                                        {disparityData[selectedMetric].find(
                                            item => item.score === Math.min(...disparityData[selectedMetric].map(item => item.score))
                                        ).neighborhood}
                                    </p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-blue-300 mb-2">Disparity Gap</h3>
                                    <p className="text-2xl font-bold text-white">
                                        {Math.max(...disparityData[selectedMetric].map(item => item.score)) -
                                            Math.min(...disparityData[selectedMetric].map(item => item.score))}
                                        <span className="text-lg text-gray-400 ml-1">points</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-center">
                        <p className="text-gray-400">No data available for the selected metric</p>
                    </div>
                )}

                {/* Additional Resources */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-blue-400 mb-8 text-center">
                        Additional Resources
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Disparity Reports Card */}
                        <div className="resource-card text-center p-4 border border-gray-700 rounded-lg hover:border-blue-400 transition-all">
                            <div className="text-blue-400 text-3xl mb-3">📋</div>
                            <h3 className="font-semibold text-lg mb-2 text-white">Disparity Reports</h3>
                            <p className="text-gray-400 text-center mb-4">Download detailed reports on neighborhood disparities</p>
                            <Link
                                to="/disparity-reports"
                                className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600 inline-block hover:scale-105 transform transition-transform"
                            >
                                View Reports
                            </Link>
                        </div>

                        {/* Neighborhood Profiles Card */}
                        <div className="resource-card text-center p-4 border border-gray-700 rounded-lg hover:border-blue-400 transition-all">
                            <div className="text-blue-400 text-3xl mb-3">🏘️</div>
                            <h3 className="font-semibold text-lg mb-2 text-white">Neighborhood Profiles</h3>
                            <p className="text-gray-400 text-center mb-4">Detailed profiles for each Hartford neighborhood</p>
                            <Link
                                to="/neighborhood-profiles"
                                className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600 inline-block hover:scale-105 transform transition-transform"
                            >
                                Explore Neighborhoods
                            </Link>
                        </div>

                        {/* Trend Analysis Card */}
                        <div className="resource-card text-center p-4 border border-gray-700 rounded-lg hover:border-blue-400 transition-all">
                            <div className="text-blue-400 text-3xl mb-3">📈</div>
                            <h3 className="font-semibold text-lg mb-2 text-white">Trend Analysis</h3>
                            <p className="text-gray-400 text-center mb-4">See how disparities have changed over time</p>
                            <Link
                                to="/trend-analysis"
                                className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600 inline-block hover:scale-105 transform transition-transform"
                            >
                                View Trends
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisparityHighlighting;