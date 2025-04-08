import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TrendAnalysis = () => {
    const [timeRange, setTimeRange] = useState('3y');
    const [loading, setLoading] = useState(true);
    const [predictionData, setPredictionData] = useState(null);
    const [comparisonData, setComparisonData] = useState(null);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            // Generate prediction data
            const labels = ['2020', '2021', '2022', '2023', '2024*', '2025*'];
            setPredictionData({
                labels,
                datasets: [
                    {
                        label: 'Your Wellbeing Score',
                        data: [65, 68, 70, 72, 74, 76],
                        borderColor: '#60A5FA',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        tension: 0.3,
                        borderWidth: 2,
                        pointBackgroundColor: '#1E40AF'
                    },
                    {
                        label: 'ML Prediction',
                        data: [null, null, null, 72, 74, 76],
                        borderColor: '#F59E0B',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        pointBackgroundColor: '#D97706'
                    }
                ]
            });

            // Generate comparison data
            setComparisonData({
                labels: ['Health', 'Education', 'Economy', 'Environment', 'Social'],
                datasets: [
                    {
                        label: 'Your Trends',
                        data: [8, 5, -2, 6, 9],
                        backgroundColor: '#3B82F6',
                        borderColor: '#1D4ED8',
                        borderWidth: 1
                    },
                    {
                        label: 'Community Avg',
                        data: [5, 3, 1, 4, 5],
                        backgroundColor: '#10B981',
                        borderColor: '#047857',
                        borderWidth: 1
                    }
                ]
            });

            setLoading(false);
        }, 1500);
    }, [timeRange]);

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
                beginAtZero: false
            }
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-6 lg:py-10">
                {/* Header Section */}
                <div className="text-center mb-8 lg:mb-12">
                    <h1 className="text-blue-400 font-bold text-3xl sm:text-4xl lg:text-5xl mb-2 lg:mb-4">
                        Trend Analysis & Predictions
                    </h1>
                    <h2 className="text-blue-200 font-medium text-lg sm:text-xl lg:text-2xl">
                        Historical trends and machine learning projections
                    </h2>
                </div>

                {/* Time Range Selector */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 sm:p-6 mb-6 lg:mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <label htmlFor="timeRange" className="text-blue-200 font-medium text-sm sm:text-base">Time Range:</label>
                        <select
                            id="timeRange"
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="1y">Last Year</option>
                            <option value="3y">Last 3 Years</option>
                            <option value="5y">Last 5 Years</option>
                            <option value="all">All Time</option>
                        </select>
                    </div>
                </div>

                {/* Prediction Chart */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8 hover:border-blue-400 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h2 className="text-xl font-bold text-blue-400">Wellbeing Score Projection</h2>
                        <span className="text-sm text-yellow-400 mt-2 sm:mt-0">
              * ML-Predicted Values
            </span>
                    </div>
                    {loading ? (
                        <div className="animate-pulse h-64 sm:h-96"></div>
                    ) : (
                        <div className="h-64 sm:h-96">
                            <Line data={predictionData} options={chartOptions} />
                        </div>
                    )}
                </div>

                {/* Comparison Chart */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8 hover:border-blue-400 transition-all">
                    <h2 className="text-xl font-bold text-blue-400 mb-4">Factor Trends vs Community</h2>
                    {loading ? (
                        <div className="animate-pulse h-64 sm:h-96"></div>
                    ) : (
                        <div className="h-64 sm:h-96">
                            <Bar data={comparisonData} options={chartOptions} />
                        </div>
                    )}
                </div>

                {/* ML Insights */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8 hover:border-blue-400 transition-all">
                    <h2 className="text-xl font-bold text-blue-400 mb-4">
            <span className="inline-flex items-center">
              Machine Learning Insights
              <span className="ml-2 px-2 py-1 text-xs bg-blue-900 text-blue-200 rounded-full">Beta</span>
            </span>
                    </h2>
                    {loading ? (
                        <div className="animate-pulse space-y-4">
                            <div className="h-24 bg-gray-800 rounded"></div>
                            <div className="h-24 bg-gray-800 rounded"></div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
                                <h3 className="font-bold text-lg text-white mb-3">Key Trend Patterns</h3>
                                <p className="text-gray-300 mb-4">
                                    Our analysis shows your wellbeing score is improving at a rate of 2.5% per year,
                                    faster than the community average of 1.8%. Your strongest growth areas are Social
                                    Connections and Physical Health.
                                </p>
                                <div className="flex items-center text-sm text-blue-300">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Based on analysis of 12 wellbeing factors
                                </div>
                            </div>

                            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-yellow-500">
                                <h3 className="font-bold text-lg text-white mb-3">Prediction Confidence</h3>
                                <p className="text-gray-300 mb-4">
                                    Our model predicts with 82% confidence that your wellbeing will continue to improve
                                    over the next two years. The biggest opportunities for improvement are in Financial
                                    Security and Mental Wellbeing.
                                </p>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>Low</span>
                                    <span>High</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Additional Resources */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-blue-400 mb-8 text-center">
                        Additional Resources
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Wellbeing Score */}
                        <Link
                            to="/wellbeing-score"
                            className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-400 transition-all text-center flex flex-col items-center"
                        >
                            <div className="text-blue-400 text-3xl mb-4">📊</div>
                            <h3 className="font-semibold text-lg mb-2 text-white">Your Wellbeing Score</h3>
                            <p className="text-gray-400 text-center mb-6 px-4">View your current wellbeing assessment</p>
                            <div className="w-full max-w-[200px] bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600">
                                View Score
                            </div>
                        </Link>

                        {/* Community Dashboard */}
                        <Link
                            to="/dashboard"
                            className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-400 transition-all text-center flex flex-col items-center"
                        >
                            <div className="text-blue-400 text-3xl mb-4">🏙️</div>
                            <h3 className="font-semibold text-lg mb-2 text-white">Community Dashboard</h3>
                            <p className="text-gray-400 text-center mb-6 px-4">Compare with overall community metrics</p>
                            <div className="w-full max-w-[200px] bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600">
                                View Dashboard
                            </div>
                        </Link>

                        {/* Methodology */}
                        <Link
                            to="/methodology"
                            className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-400 transition-all text-center flex flex-col items-center"
                        >
                            <div className="text-blue-400 text-3xl mb-4">🔍</div>
                            <h3 className="font-semibold text-lg mb-2 text-white">Methodology</h3>
                            <p className="text-gray-400 text-center mb-6 px-4">Learn how we calculate and predict trends</p>
                            <div className="w-full max-w-[200px] bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600">
                                Learn More
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendAnalysis;