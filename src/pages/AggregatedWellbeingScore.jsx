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
import { Line } from 'react-chartjs-2';

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

const WellbeingScore = () => {
    const [score] = useState(72);
    const [loading, setLoading] = useState(true);

    // Chart data configuration
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Wellbeing Score',
            data: [65, 70, 72, 68, 75, 72],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.3,
            borderWidth: 2,
            pointBackgroundColor: '#3B82F6',
            pointBorderColor: '#ffffff',
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    };

    // Chart options configuration
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#ffffff',
                    font: {
                        size: 14
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#ffffff'
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#ffffff'
                },
                min: 50,
                max: 100
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-blue-400 text-3xl font-bold mb-4">Wellbeing Score</h1>

                <div className="bg-gray-800 p-6 rounded-lg mb-6 h-96">
                    <Line data={chartData} options={chartOptions} />
                </div>

                <Link
                    to="/dashboard"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-block"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default WellbeingScore;