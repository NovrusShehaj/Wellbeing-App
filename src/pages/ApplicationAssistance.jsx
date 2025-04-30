import React from 'react';
import { Link } from 'react-router-dom';

const ApplicationAssistance = () => {
    const assistancePrograms = [
        {
            id: 1,
            title: "Housing Application Support",
            organization: "Hartford Housing Hub",
            description: "Get one-on-one help completing housing applications and understanding requirements",
            services: [
                "Section 8 applications",
                "Public housing forms",
                "Affordable housing lotteries",
                "Document preparation"
            ],
            contact: "(860) 555-1234",
            hours: "Mon-Fri 9am-5pm"
        },
        {
            id: 2,
            title: "Job Application Workshop",
            organization: "CareerReady CT",
            description: "Weekly workshops to help with job applications, resumes, and interview preparation",
            services: [
                "Resume building",
                "Online application help",
                "Interview coaching",
                "Career counseling"
            ],
            contact: "(860) 555-5678",
            hours: "Tues/Thurs 10am-2pm, Sat 9am-12pm"
        },
        {
            id: 3,
            title: "Benefits Navigator",
            organization: "Hartford Social Services",
            description: "Assistance with SNAP, Medicaid, and other benefit applications",
            services: [
                "Eligibility screening",
                "Application completion",
                "Document submission",
                "Appeal assistance"
            ],
            contact: "(860) 555-9012",
            hours: "Mon-Wed-Fri 8am-4pm"
        }
    ];

    const resources = [
        {
            id: 1,
            title: "Housing Application Checklist",
            type: "PDF Guide",
            description: "Step-by-step guide to completing housing applications",
            download: "#"
        },
        {
            id: 2,
            title: "Job Application Video Tutorials",
            type: "Video Series",
            description: "How to fill out common job application fields",
            watch: "#"
        },
        {
            id: 3,
            title: "Document Preparation Guide",
            type: "Interactive Tool",
            description: "What documents you'll need for different applications",
            access: "#"
        }
    ];

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Back Button */}
                <Link
                    to="/access-to-services"
                    className="text-blue-400 hover:text-blue-300 mb-8 inline-flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Services
                </Link>

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="text-blue-400 text-5xl mb-4">📝</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">Application Assistance</h1>
                    <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                        Get help with housing, employment, and benefit applications in Hartford
                    </p>
                </div>

                {/* Assistance Programs */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-blue-400 mb-8 border-b border-gray-700 pb-4">
                        Local Assistance Programs
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {assistancePrograms.map(program => (
                            <div key={program.id} className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-400 transition-all">
                                <h3 className="text-xl font-bold text-white mb-2">{program.title}</h3>
                                <p className="text-blue-300 mb-4">{program.organization}</p>
                                <p className="text-gray-300 mb-6">{program.description}</p>

                                <div className="mb-6">
                                    <h4 className="text-white font-semibold mb-2">Services Offered:</h4>
                                    <ul className="space-y-2">
                                        {program.services.map((service, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-300">{service}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span className="text-white">{program.contact}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-white">{program.hours}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Self-Help Resources */}
                {/* <section className="mb-20">
                    <h2 className="text-3xl font-bold text-blue-400 mb-8 border-b border-gray-700 pb-4">
                        Self-Help Resources
                    </h2>

                    <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                        {resources.map((resource, index) => (
                            <div
                                key={resource.id}
                                className={`p-6 hover:bg-gray-800 transition-all ${index !== resources.length - 1 ? 'border-b border-gray-700' : ''}`}
                            >
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <div className="flex-1 mb-4 md:mb-0">
                                        <div className="flex items-center">
                                            {resource.type === "PDF Guide" && (
                                                <svg className="h-6 w-6 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                            {resource.type === "Video Series" && (
                                                <svg className="h-6 w-6 text-purple-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                            {resource.type === "Interactive Tool" && (
                                                <svg className="h-6 w-6 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{resource.title}</h3>
                                                <p className="text-gray-400 text-sm">{resource.type}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 mt-2">{resource.description}</p>
                                    </div>
                                    <div>
                                        <a
                                            href={resource.download || resource.watch || resource.access}
                                            className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors border border-blue-600 inline-block"
                                        >
                                            {resource.type === "PDF Guide" && "Download"}
                                            {resource.type === "Video Series" && "Watch Now"}
                                            {resource.type === "Interactive Tool" && "Access Tool"}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section> */}

                {/* FAQ Section */}
                <section>
                    <h2 className="text-3xl font-bold text-blue-400 mb-8 border-b border-gray-700 pb-4">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-2">What documents do I need for housing applications?</h3>
                            <p className="text-gray-300">
                                Typically you'll need: Photo ID, Social Security cards for all household members, proof of income (pay stubs, tax returns), and rental history. Our document preparation guide can help you gather everything.
                            </p>
                        </div>

                        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-2">Is there a cost for application assistance?</h3>
                            <p className="text-gray-300">
                                No, all application assistance services listed here are provided free of charge to Hartford residents.
                            </p>
                        </div>

                        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-2">Can I get help with online applications?</h3>
                            <p className="text-gray-300">
                                Yes, most programs offer computer access and staff assistance for completing online applications. The Job Application Workshop specifically focuses on digital applications.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ApplicationAssistance;