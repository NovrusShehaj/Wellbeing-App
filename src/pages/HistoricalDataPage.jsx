import React from 'react';
import { Link } from 'react-router-dom';

const HistoricalDataPage = () => {
    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <div className="text-center mb-12">
                    <h1 className="text-blue-400 font-bold text-4xl md:text-5xl mb-4">
                        Historical Wellbeing Trends
                    </h1>
                    <h2 className="text-blue-200 font-medium text-xl md:text-2xl">
                        Explore Hartford's wellbeing data over time
                    </h2>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-10">
                    <h3 className="text-xl text-blue-400 mb-4">Yearly Comparison</h3>
                    <div className="h-96 bg-gray-800 rounded-lg flex items-center justify-center">
                        <p className="text-gray-400">Historical data visualization will appear here</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-xl text-blue-400 mb-4">Key Metrics Over Time</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li>• Health indicators 2010-2023</li>
                            <li>• Education progress</li>
                            <li>• Economic changes</li>
                            <li>• Environmental factors</li>
                        </ul>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-xl text-blue-400 mb-4">Neighborhood Comparisons</h3>
                        <p className="text-gray-300">
                            Compare how different areas of Hartford have changed over the past decade.
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

export default HistoricalDataPage;