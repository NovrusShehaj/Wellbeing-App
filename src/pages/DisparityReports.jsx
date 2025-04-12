import React from 'react';
import { Link } from 'react-router-dom';

const DisparityReports = () => {
    const reports = [
        {
            id: 1,
            title: "2023 Hartford Wellbeing Disparity Report",
            description: "Comprehensive analysis of neighborhood disparities across all metrics",
            downloadLink: "/reports/2023-disparity-report.pdf",
            date: "October 2023"
        },
        {
            id: 2,
            title: "Health Disparities Whitepaper",
            description: "Detailed examination of health outcome differences between neighborhoods",
            downloadLink: "/reports/health-disparities-2023.pdf",
            date: "July 2023"
        },
        {
            id: 3,
            title: "Economic Opportunity Gap Analysis",
            description: "Comparative study of economic indicators across Hartford",
            downloadLink: "/reports/economic-gap-analysis.pdf",
            date: "May 2023"
        }
    ];

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <div className="text-center mb-12">
                    <h1 className="text-blue-400 font-extrabold text-5xl">
                        Disparity Reports
                    </h1>
                    <h2 className="text-blue-200 font-medium text-lg md:text-xl mt-[50px]">
                        Download detailed reports on neighborhood disparities
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 items-stretch">
                    {reports.map(report => (
                        <div
                        key={report.id}
                        className="flex flex-col justify-between h-[400px] bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-400 transition-all"
                        >
                        <div className="mb-4" style={{ minHeight: '110px' }}>
                            <div className="text-blue-400 text-3xl mb-2">📋</div>
                            <h3 className="text-xl font-bold text-white">{report.title}</h3>
                        </div>

                        <p className="text-gray-400 text-base mb-6">{report.description}</p>

                        <div className="flex justify-between items-center mt-auto">
                            <span className="text-sm text-gray-500">{report.date}</span>
                            <a
                            href={report.downloadLink}
                            className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors border border-blue-600 no-underline"
                            download
                            >
                            Download
                            </a>
                        </div>
                        </div>
                    ))}
                    </div>


                <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 text-center">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">Request Custom Report</h3>
                    <p className="text-gray-400 mb-6 text-center">Need specific disparity data analyzed? Our team can prepare customized reports.</p>
                    <button className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors border border-blue-600">
                        Contact Our Research Team
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DisparityReports;