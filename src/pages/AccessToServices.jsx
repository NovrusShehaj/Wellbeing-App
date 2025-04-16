// src/pages/AccessToServices.jsx
import React, { useState } from "react";
import "../styles/AccessToServices.css";
import "../styles/Link.css";
import { Link } from 'react-router-dom';

const AccessToServices = () => {
    const [activeTab, setActiveTab] = useState("all");

    // Sample data - in a real app, this would come from an API or database
    const services = {
        housing: [
            {
                id: 1,
                name: "Hartford Housing Authority",
                description: "Public housing and rental assistance programs, applications for Housing Choice Voucher (Section 8) housing and public housing",
                phone: "(860) 723-8493",
                website: "https://www.hartfordhousing.org",
                type: "government"
            },
            {
                id: 2,
                name: "Journey Home",
                description: "Homelessness prevention and housing support",
                phone: "(860) 706-1505",
                website: "https://www.journeyhomect.org",
                type: "non-profit"
            },
            {
                id: 3,
                name: "Hartford Community Land Trust",
                description: "Affordable homeownership opportunities",
                phone: "(860) 461-0320",
                website: "https://www.hartfordclt.org",
                type: "non-profit"
            }
        ],
        employment: [
            {
                id: 4,
                name: "CT Department of Labor - Hartford Office",
                description: "Job search assistance and training programs",
                phone: "(860) 263-6000",
                website: "https://www.ctdol.state.ct.us",
                type: "government"
            },
            {
                id: 5,
                name: "Career Resources Inc.",
                description: "Workforce development and career coaching",
                phone: "(203) 610-8500",
                website: "https://www.careerresources.org",
                type: "non-profit"
            },
            {
                id: 6,
                name: "Hartford Job Corps",
                description: "Free education and vocational training for young adults",
                phone: "(860) 722-7000",
                website: "https://hartford.jobcorps.gov",
                type: "government"
            }
        ]
    };

    const filteredServices = activeTab === "all"
        ? [...services.housing, ...services.employment]
        : activeTab === "housing"
            ? services.housing
            : services.employment;

    return (
        <div className="services-container bg-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-blue-400 font-bold text-5xl md:text-6xl mb-4 text-center">
                        Hartford Community Services
                    </h1>
                    <h2 className="text-blue-200 font-medium text-2xl md:text-3xl text-center">
                        Connecting residents to housing and employment resources
                    </h2>
                </div>

                {/* Filter Tabs */}
                <div className="filters mb-10 flex items-center object-center">
                    <button
                        className={`mr-4 py-2 px-6 border-2 border-white text-white cursor-pointer text-lg rounded-md flex items-center justify-center h-10 ${activeTab === "all" ? "bg-blue-800 border-blue-400" : "bg-black hover:text-blue-200"}`}
                        onClick={() => setActiveTab("all")}
                    >
                        All Services
                    </button>
                    <button
                        className={`mr-4 py-2 px-6 border-2 border-white text-white cursor-pointer text-lg rounded-md flex items-center justify-center h-10 ${activeTab === "housing" ? "bg-blue-800 border-blue-400" : "bg-black hover:text-blue-200"}`}
                        onClick={() => setActiveTab("housing")}
                    >
                        Housing
                    </button>
                    <button
                        className={`py-2 px-6 border-2 border-white text-white cursor-pointer text-lg rounded-md flex items-center justify-center h-10 ${activeTab === "employment" ? "bg-blue-800 border-blue-400" : "bg-black hover:text-blue-200"}`}
                        onClick={() => setActiveTab("employment")}
                    >
                        Employment
                    </button>
                </div>

                {/* Services Grid */}
                <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredServices.map((service) => (
                        <div key={service.id}
                             className="service-card bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-400 transition-all">
                            <div className="service-header mb-4">
                                <h3 className="text-xl font-bold text-blue-400">{service.name}</h3>
                                <span
                                    className={`service-type ${service.type === "government" ? "bg-blue-900 text-blue-200" : "bg-purple-900 text-purple-200"} text-xs font-semibold px-3 py-1 rounded-full mt-2 inline-block`}>
                  {service.type === "government" ? "Government" : "Non-Profit"}
                </span>
                            </div>
                            <p className="text-gray-300 mb-4">{service.description}</p>
                            <div className="service-details text-sm text-gray-400 mb-4">
                                <p><strong className="text-gray-200">Phone:</strong> {service.phone}</p>
                            </div>
                            <a
                                href={service.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-2 bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600"
                            >
                                Visit Website
                            </a>
                        </div>
                    ))}
                </div>

                {/* Additional Resources */}
        <div className="additional-resources bg-gray-900 border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-8 text-center">
            Additional Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="resource-card flex flex-col justify-between h-[300px] text-center p-4 border border-gray-700 rounded-lg hover:border-blue-400 transition-all">
              <div>
                <div className="text-blue-400 text-3xl mb-3">📅</div>
                <h3 className="font-semibold text-lg mb-2 text-white">Upcoming Events</h3>
                <p className="text-gray-400 text-base">Job fairs, housing workshops, and community meetings</p>
              </div>
              <Link
                to="/calendar"
                className="mt-6 bg-blue-800 hover:bg-blue-700 text-white py-1 px-5 rounded-md transition-colors border border-blue-600 inline-block hover:scale-105 transform transition-transform no-underline"
              >
                View Calendar
              </Link>
            </div>

            <div className="resource-card flex flex-col justify-between h-[300px] text-center p-4 border border-gray-700 rounded-lg hover:border-blue-400 transition-all">
              <div>
                <div className="text-blue-400 text-3xl mb-3">📝</div>
                <h3 className="font-semibold text-lg mb-2 text-white">Application Assistance</h3>
                <p className="text-gray-400 text-base">Help with housing and job applications</p>
              </div>
              <Link
                to="/application-assistance"
                className="mt-6 bg-blue-800 hover:bg-blue-700 text-white py-1 px-5 rounded-md transition-colors border border-blue-600 inline-block hover:scale-105 transform transition-transform no-underline"
              >
                Learn More
              </Link>
            </div>

            <div className="resource-card flex flex-col justify-between h-[300px] text-center p-4 border border-gray-700 rounded-lg hover:border-blue-400 transition-all">
              <div>
                <div className="text-blue-400 text-3xl mb-3">🤝</div>
                <h3 className="font-semibold text-lg mb-2 text-white">Volunteer Opportunities</h3>
                <p className="text-gray-400 text-base">Give back to your Hartford community</p>
              </div>
              <Link
                to="/get-involved"
                className="mt-6 bg-blue-800 hover:bg-blue-700 text-white py-1 px-5 rounded-md transition-colors border border-blue-600 inline-block hover:scale-105 transform transition-transform no-underline"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessToServices;