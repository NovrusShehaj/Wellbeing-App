import React, { useEffect, useState, Suspense } from "react";
import { Line, Bar } from "react-chartjs-2";
import { getWellbeingScore, getNeighborhoodData } from "../services/WellbeingService.jsx";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import {Link} from "react-router-dom";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Dynamic import for map component
const MapComponent = React.lazy(() => import('../components/MapComponent'));

const Dashboard = () => {
    const [score, setScore] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({});
    const [neighborhoodData, setNeighborhoodData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mapKey, setMapKey] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const wellbeingData = await getWellbeingScore(year);
                setScore(wellbeingData.score);

                setChartData({
                    labels: wellbeingData.months,
                    datasets: [{
                        label: `Monthly Wellbeing Scores - ${year}`,
                        data: wellbeingData.scores,
                        borderColor: "#60A5FA",
                        backgroundColor: "rgba(37, 99, 235, 0.1)",
                        tension: 0.3,
                        borderWidth: 2,
                        pointBackgroundColor: "#1E40AF",
                        pointBorderColor: "#3B82F6"
                    }]
                });

                const geoData = await getNeighborhoodData(year);
                setNeighborhoodData(geoData);
                setMapKey(prev => prev + 1);
            } catch (error) {
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [year]);

    // Chart options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: "#E5E7EB" }
            },
            tooltip: {
                backgroundColor: "#1F2937",
                titleColor: "#60A5FA",
                bodyColor: "#E5E7EB",
                borderColor: "#374151",
                borderWidth: 1
            }
        },
        scales: {
            x: {
                grid: { color: "#374151" },
                ticks: { color: "#9CA3AF" }
            },
            y: {
                grid: { color: "#374151" },
                ticks: { color: "#9CA3AF" },
                beginAtZero: false,
                min: 0,
                max: 100
            }
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-6 lg:py-10">
                {/* Header Section */}
                <div className="text-center mb-8 lg:mb-12">
                    <h1 className="text-blue-400 font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-2 lg:mb-4">
                        Hartford Wellbeing Dashboard
                    </h1>
                    <h2 className="text-blue-200 font-medium text-lg sm:text-xl lg:text-2xl xl:text-3xl">
                        Comprehensive overview of community wellbeing metrics
                    </h2>
                </div>

                {/* Year Selection */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 sm:p-6 mb-6 lg:mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <label htmlFor="year" className="text-blue-200 font-medium text-sm sm:text-base">Select Year:</label>
                        <select
                            id="year"
                            value={year}
                            onChange={(e) => setYear(parseInt(e.target.value))}
                            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {[2023, 2022, 2021].map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 lg:mb-10">
                    {/* Aggregated Score Card */}
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 sm:p-6 hover:border-blue-400 transition-all">
                        <h2 className="text-lg sm:text-xl font-bold text-blue-400 mb-3 sm:mb-4">Annual Wellbeing Score</h2>
                        {loading ? (
                            <div className="animate-pulse h-32 flex items-center justify-center">
                                <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-full border-4 border-t-blue-500 border-gray-700 animate-spin"></div>
                            </div>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-3 sm:mb-4">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle
                                            className="text-gray-700"
                                            strokeWidth="8"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="40"
                                            cx="50"
                                            cy="50"
                                        />
                                        <circle
                                            className="text-blue-600"
                                            strokeWidth="8"
                                            strokeDasharray={`${score * 2.51}, 251`}
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="40"
                                            cx="50"
                                            cy="50"
                                        />
                                    </svg>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                        <span className="text-2xl sm:text-3xl font-bold text-white">{score}</span>
                                        <span className="block text-xs sm:text-sm text-blue-200">out of 100</span>
                                    </div>
                                </div>
                                <p className="text-sm sm:text-base text-blue-200 text-center">
                                    {score >= 80 ? "Excellent wellbeing" :
                                        score >= 60 ? "Good wellbeing" :
                                            score >= 40 ? "Average wellbeing" : "Needs improvement"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Metrics Breakdown */}
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 sm:p-6 hover:border-blue-400 transition-all">
                        <h2 className="text-lg sm:text-xl font-bold text-blue-400 mb-3 sm:mb-4">Wellbeing Metrics</h2>
                        {loading ? (
                            <div className="animate-pulse h-48 sm:h-64"></div>
                        ) : (
                            <div className="h-48 sm:h-64">
                                <Bar
                                    data={{
                                        labels: ['Health', 'Education', 'Economy', 'Environment'],
                                        datasets: [{
                                            label: 'Wellbeing Metrics',
                                            data: [score * 0.8, score * 0.9, score * 0.75, score * 0.85],
                                            backgroundColor: [
                                                '#1E40AF',
                                                '#1D4ED8',
                                                '#2563EB',
                                                '#3B82F6'
                                            ],
                                            borderColor: [
                                                '#1E3A8A',
                                                '#1E40AF',
                                                '#1D4ED8',
                                                '#2563EB'
                                            ],
                                            borderWidth: 1
                                        }]
                                    }}
                                    options={chartOptions}
                                />
                            </div>
                        )}
                    </div>

                    {/* Neighborhood Map - Responsive Container */}
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 sm:p-6 hover:border-blue-400 transition-all flex flex-col">
                        <h2 className="text-lg sm:text-xl font-bold text-blue-400 mb-3 sm:mb-4">Neighborhood Overview</h2>
                        <div className="flex-grow min-h-[300px] sm:min-h-[400px] relative">
                            {neighborhoodData ? (
                                <Suspense fallback={
                                    <div className="absolute inset-0 flex items-center justify-center text-blue-200">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                    </div>
                                }>
                                    <div className="absolute inset-0 rounded-md overflow-hidden">
                                        <MapComponent
                                            key={mapKey}
                                            neighborhoodData={neighborhoodData}
                                        />
                                    </div>
                                </Suspense>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-blue-200">
                                    Loading map data...
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Monthly Scores Chart */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 sm:p-6 mb-6 lg:mb-10 hover:border-blue-400 transition-all">
                    <h2 className="text-lg sm:text-xl font-bold text-blue-400 mb-3 sm:mb-4">Monthly Wellbeing Scores</h2>
                    {loading ? (
                        <div className="animate-pulse h-64 sm:h-96"></div>
                    ) : (
                        <div className="h-64 sm:h-96">
                            <Line
                                data={chartData}
                                options={chartOptions}
                            />
                        </div>
                    )}
                </div>

                {/* Additional Resources */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-blue-400 mb-8 text-center">
                        Additional Resources
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Historical Data Card */}
                        <Link
                            to="/historical-data"
                            className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-400 transition-all text-center flex flex-col items-center"
                        >
                            <div className="text-blue-400 text-3xl mb-4">📊</div>
                            <h3 className="font-semibold text-lg mb-2 text-white">Historical Data</h3>
                            <p className="text-gray-400 text-center mb-6 px-4">View trends and historical wellbeing metrics</p>
                            <div
                                className="w-full max-w-[200px] bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600">
                                Explore Trends
                            </div>
                        </Link>

                        {/* Methodology Card */}
                        <Link
                            to="/methodology"
                            className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-400 transition-all text-center flex flex-col items-center"
                        >
                            <div className="text-blue-400 text-3xl mb-4">📝</div>
                            <h3 className="font-semibold text-lg mb-2 text-white">Methodology</h3>
                            <p className="text-gray-400 text-center mb-6 px-4">Learn how we calculate wellbeing scores</p>
                            <div
                                className="w-full max-w-[200px] bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600">
                                Learn More
                            </div>
                        </Link>

                        {/* Interactive Map Card */}
                        <Link
                            to="/interactive-map"
                            className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-400 transition-all text-center flex flex-col items-center"
                        >
                            <div className="text-blue-400 text-3xl mb-4">🗺️</div>
                            <h3 className="font-semibold text-lg mb-2 text-white">Interactive Map</h3>
                            <p className="text-gray-400 text-centermb-6 px-4">Explore the full interactive map</p>
                            <div
                                className="w-full max-w-[200px] bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600">
                                View Map
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;