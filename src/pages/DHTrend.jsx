import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DHTrend = () => {
    const trendData = {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: 'Downtown',
                data: [72, 74, 70, 75, 76, 78],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.3
            },
            {
                label: 'Frog Hollow',
                data: [65, 64, 60, 61, 63, 62],
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.3
            },
            {
                label: 'City Average',
                data: [62, 63, 60, 62, 64, 65],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderDash: [5, 5],
                tension: 0.3
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#E5E7EB'
                }
            },
            tooltip: {
                backgroundColor: '#1F2937',
                titleColor: '#60A5FA',
                bodyColor: '#E5E7EB',
                borderColor: '#374151'
            }
        },
        scales: {
            x: {
                grid: {
                    color: '#374151'
                },
                ticks: {
                    color: '#9CA3AF'
                }
            },
            y: {
                grid: {
                    color: '#374151'
                },
                ticks: {
                    color: '#9CA3AF'
                },
                min: 0,
                max: 100
            }
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <div className="text-center mb-12">
                    <h1 className="text-blue-400 font-bold text-5xl md:text-6xl mb-4">
                        Trend Analysis
                    </h1>
                    <h2 className="text-blue-200 font-medium text-2xl md:text-3xl">
                        See how disparities have changed over time
                    </h2>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-blue-400">Wellbeing Score Trends (2018-2023)</h3>
                        <select className="bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2">
                            <option>Overall Wellbeing</option>
                            <option>Health</option>
                            <option>Education</option>
                            <option>Economic</option>
                        </select>
                    </div>
                    <div className="h-96">
                        <Line data={trendData} options={options} />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-blue-400 mb-4">Key Findings</h3>
                        <ul className="text-gray-400 space-y-3">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">↑</span>
                                Downtown has seen consistent improvement since 2020
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">↓</span>
                                Frog Hollow recovery stalled after pandemic dip
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-500 mr-2">→</span>
                                Citywide average slowly converging with national trends
                            </li>
                        </ul>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-blue-400 mb-4">Download Data</h3>
                        <p className="text-gray-400 mb-4">Access the complete dataset for your own analysis</p>
                        <div className="space-y-3">
                            <button className="w-full bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600 text-left flex justify-between items-center">
                                <span>Full Trend Data (CSV)</span>
                                <span>📥</span>
                            </button>
                            <button className="w-full bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600 text-left flex justify-between items-center">
                                <span>Methodology Documentation</span>
                                <span>📄</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DHTrend;