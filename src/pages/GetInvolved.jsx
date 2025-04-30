import React from 'react';
import { Link } from 'react-router-dom';

const GetInvolved = () => {
    const volunteerOpportunities = [
        {
            id: 1,
            title: "Community Outreach Volunteer",
            organization: "Hartford Cares",
            description: "Help connect residents with local services and resources",
            timeCommitment: "4-8 hours/week",
            skills: ["Communication", "Community knowledge"],
            link: "#"
        },
        {
            id: 2,
            title: "Housing Support Specialist",
            organization: "HomeHartford",
            description: "Assist individuals navigating housing applications",
            timeCommitment: "6-10 hours/week",
            skills: ["Administrative", "Empathy"],
            link: "#"
        },
        {
            id: 3,
            title: "Job Readiness Coach",
            organization: "Career Pathways CT",
            description: "Help residents prepare resumes and practice interviews",
            timeCommitment: "3-6 hours/week",
            skills: ["Coaching", "HR experience"],
            link: "#"
        }
    ];

    const donationOptions = [
        {
            id: 1,
            type: "Financial Contribution",
            description: "Support our programs with a one-time or recurring donation",
            impact: "Every $50 provides job training for 1 resident"
        },
        {
            id: 2,
            type: "Professional Services",
            description: "Donate your professional skills (legal, accounting, etc.)",
            impact: "Help organizations operate more effectively"
        },
        {
            id: 3,
            type: "Supply Drive",
            description: "Organize a collection of essential items for those in need",
            impact: "Provide basic necessities to families transitioning to housing"
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
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">Get Involved in Hartford</h1>
                    <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                        Make a difference in our community through volunteering, donations, or partnerships
                    </p>
                </div>

                {/* Volunteer Opportunities */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-blue-400 mb-8 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Volunteer Opportunities
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {volunteerOpportunities.map(opportunity => (
                            <div key={opportunity.id} className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-400 transition-all">
                                <h3 className="text-xl font-bold text-white mb-2">{opportunity.title}</h3>
                                <p className="text-blue-300 mb-3">{opportunity.organization}</p>
                                <p className="text-gray-300 mb-4">{opportunity.description}</p>

                                <div className="mb-4">
                                    <p className="text-gray-400 text-sm mb-1">Time Commitment:</p>
                                    <p className="text-white">{opportunity.timeCommitment}</p>
                                </div>

                                <div className="mb-6">
                                    <p className="text-gray-400 text-sm mb-1">Helpful Skills:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {opportunity.skills.map((skill, index) => (
                                            <span key={index} className="bg-blue-900 text-blue-200 text-xs px-3 py-1 rounded-full">
                        {skill}
                      </span>
                                        ))}
                                    </div>
                                </div>

                                <a
                                    href={opportunity.link}
                                    className="w-full bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600 text-center block"
                                >
                                    Sign Up
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Donation Options */}
                {/* <section className="mb-20">
                    <h2 className="text-3xl font-bold text-blue-400 mb-8 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Ways to Give
                    </h2>

                    <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                        {donationOptions.map((option, index) => (
                            <div
                                key={option.id}
                                className={`p-6 hover:bg-gray-800 transition-all ${index !== donationOptions.length - 1 ? 'border-b border-gray-700' : ''}`}
                            >
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <div className="flex-1 mb-4 md:mb-0">
                                        <h3 className="text-xl font-bold text-white mb-2">{option.type}</h3>
                                        <p className="text-gray-300">{option.description}</p>
                                    </div>
                                    <div className="md:w-1/3">
                                        <p className="text-blue-300 font-medium">{option.impact}</p>
                                        <button className="mt-3 bg-blue-800 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors border border-blue-600">
                                            Donate Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section> */}

                {/* Community Partners */}
                {/* <section>
                    <h2 className="text-3xl font-bold text-blue-400 mb-8 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Community Partners
                    </h2>

                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">Become a Corporate Partner</h3>
                                <p className="text-gray-300 mb-4">
                                    Join local businesses making an impact through employee volunteering, matching gifts, and sponsorships.
                                </p>
                                <button className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors border border-blue-600">
                                    Learn About Partnership
                                </button>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">Organization Resources</h3>
                                <p className="text-gray-300 mb-4">
                                    Nonprofits can list volunteer needs and access tools for better community engagement.
                                </p>
                                <button className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors border border-blue-600">
                                    Register Your Organization
                                </button>
                            </div>
                        </div>
                    </div>
                </section> */}
            </div>
        </div>
    );
};

export default GetInvolved;