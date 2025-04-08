import React from 'react';
import { Link } from 'react-router-dom';

const MethodologyPage = () => {
    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <div className="text-center mb-12">
                    <h1 className="text-blue-400 font-bold text-4xl md:text-5xl mb-4">
                        Wellbeing Score Methodology
                    </h1>
                    <h2 className="text-blue-200 font-medium text-xl md:text-2xl">
                        How we measure community wellbeing in Hartford
                    </h2>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-10">
                    <h3 className="text-2xl text-blue-400 mb-4">Our Framework</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[
                            { title: "Health", desc: "Access to healthcare, life expectancy, and health behaviors" },
                            { title: "Education", desc: "Graduation rates, test scores, and educational resources" },
                            { title: "Economy", desc: "Employment rates, income levels, and economic stability" }
                        ].map((item, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                <h4 className="text-blue-400 font-semibold mb-2">{item.title}</h4>
                                <p className="text-gray-300">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-2xl text-blue-400 mb-4 mt-8">Data Sources</h3>
                    <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                        <li>Hartford Public Health Department</li>
                        <li>Connecticut State Education Data</li>
                        <li>US Census Bureau</li>
                        <li>Local Community Surveys</li>
                    </ul>
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

export default MethodologyPage;