import React from "react";
import { Link } from "react-router-dom";

const Resources = () => {
    const resourceCategories = [
        {
            title: "Mental Health",
            icon: "🧠",
            resources: [
                {
                    name: "Hartford Behavioral Health Services",
                    description: "24/7 crisis support and counseling",
                    link: "https://example.com"
                },
                {
                    name: "Mindful Hartford",
                    description: "Free meditation and mindfulness classes",
                    link: "https://example.com"
                }
            ]
        },
        {
            title: "Physical Health",
            icon: "🏥",
            resources: [
                {
                    name: "Community Health Center",
                    description: "Sliding scale medical services",
                    link: "https://example.com"
                },
                {
                    name: "Hartford Fitness Initiative",
                    description: "Free exercise classes in city parks",
                    link: "https://example.com"
                }
            ]
        },
        {
            title: "Financial Support",
            icon: "💰",
            resources: [
                {
                    name: "Hartford Financial Counseling",
                    description: "Free budgeting and debt management",
                    link: "https://example.com"
                },
                {
                    name: "Connecticut Housing Assistance",
                    description: "Rent and mortgage support programs",
                    link: "https://example.com"
                }
            ]
        },
        {
            title: "Community Programs",
            icon: "👨‍👩‍👧‍👦",
            resources: [
                {
                    name: "Neighborhood Connect",
                    description: "Local events and volunteer opportunities",
                    link: "https://example.com"
                },
                {
                    name: "Hartford Youth Services",
                    description: "After-school programs and mentoring",
                    link: "https://example.com"
                }
            ]
        }
    ];

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                {/* Header Section */}
                <div className="text-center mb-10 lg:mb-14">
                    <h1 className="text-blue-400 font-bold text-3xl sm:text-4xl lg:text-5xl mb-3 lg:mb-5">
                        Hartford Community Resources
                    </h1>
                    <p className="text-blue-200 font-medium text-lg sm:text-xl max-w-3xl mx-auto">
                        Curated local services and programs to support your wellbeing journey
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-10 max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search resources..."
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Resource Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {resourceCategories.map((category, index) => (
                        <div key={index} className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-blue-400 transition-all">
                            <div className="text-4xl mb-4">{category.icon}</div>
                            <h2 className="text-xl font-bold text-blue-400 mb-4">{category.title}</h2>
                            <ul className="space-y-3">
                                {category.resources.map((resource, idx) => (
                                    <li key={idx} className="border-b border-gray-700 pb-3 last:border-0 last:pb-0">
                                        <a
                                            href={resource.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block hover:text-blue-300 transition-colors"
                                        >
                                            <h3 className="font-medium">{resource.name}</h3>
                                            <p className="text-sm text-gray-400">{resource.description}</p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Additional Help Section */}
                <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 mb-10">
                    <h2 className="text-2xl font-bold text-blue-400 mb-6">Need More Help?</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-5 rounded-lg">
                            <h3 className="font-bold text-lg mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Emergency Contacts
                            </h3>
                            <ul className="space-y-2">
                                <li>Suicide Prevention: <span className="text-blue-400">988</span></li>
                                <li>Crisis Text Line: <span className="text-blue-400">Text HOME to 741741</span></li>
                                <li>Domestic Violence: <span className="text-blue-400">1-888-774-2900</span></li>
                            </ul>
                        </div>

                        <div className="bg-gray-800 p-5 rounded-lg">
                            <h3 className="font-bold text-lg mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                City Services
                            </h3>
                            <ul className="space-y-2">
                                <li>Hartford 311: <span className="text-blue-400">Dial 311</span></li>
                                <li>Food Assistance: <span className="text-blue-400">860-757-4700</span></li>
                                <li>Homeless Services: <span className="text-blue-400">860-722-6922</span></li>
                            </ul>
                        </div>

                        <div className="bg-gray-800 p-5 rounded-lg">
                            <h3 className="font-bold text-lg mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Online Resources
                            </h3>
                            <ul className="space-y-2">
                                <li><a href="https://example.com" className="text-blue-400 hover:underline">CT.gov Services</a></li>
                                <li><a href="https://example.com" className="text-blue-400 hover:underline">FindHelp.org</a></li>
                                <li><a href="https://example.com" className="text-blue-400 hover:underline">211 Connecticut</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Back to Dashboard */}
                <div className="text-center">
                    <Link
                        to="/dashboard"
                        className="inline-block bg-blue-800 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors border border-blue-600"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Resources;