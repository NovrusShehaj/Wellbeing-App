import React from "react";
import { Link } from "react-router-dom";
import "../styles/Resources.css";

const Resources = () => {
  const resourceCategories = [
    {
      title: "Mental Health",
      icon: "🧠",
      resources: [
        {
          name: "Behavioral Health Services",
          description: "24/7 crisis support and counseling",
          link: "https://www.hartfordbehavioralhealth.com/",
        },
        {
          name: "Mental Health Facilities",
          description: "Centralized hub of Hartford mental health services",
          link: "https://www.mentalhealthclinics.org/clinics/connecticut/hartford-county.html?msclkid=d91963c9faa91b2378140433555804ee&utm_source=bing&utm_medium=cpc&utm_campaign=Mental%20Health%20Clinics&utm_term=mental%20health%20services%20Hartford%20County%20CT&utm_content=Mental%20Clinics%20-%20Hartford%20County,%20CT",
        },
      ],
    },
    {
      title: "Medical Care",
      icon: "🏥",
      resources: [
        {
          name: "Hartford Health & Human Services Department",
          description: "Provides health services to promote community wellbeing",
          link: "https://www.hartfordct.gov/Government/Departments/HHS",
        },
        {
          name: "Community Health Services",
          description: "Sliding scale medical services",
          link: "https://chshartford.org/",
        },
      ],
    },
    {
      title: "Financial Support",
      icon: "💰",
      resources: [
        {
          name: "Community Renewal Team",
          description: "14 Week Financial Literacy Course",
          link: "https://www.crtct.org/programs/basic-needs/financial-literacy/",
        },
        {
          name: "Hartford Healthcare",
          description: "Financial assistance for medical expenses",
          link: "https://hartfordhealthcare.org/patients-visitors/patients/billing-insurance/financial-assistance/patient-financial-assistance",
        },
      ],
    },
    {
      title: "Community Programs",
      icon: "👨‍👩‍👧‍👦",
      resources: [
        {
          name: "Hartford Community Programs",
          description: "Opportunities can be found in the Community Programs tab",
          link: "https://www.hartfordct.gov/Government/Departments/Mayor-Arulampalam/Community-Engagement",
        },
        {
          name: "Hartford Communities That Care",
          description: "Helps promote a safe, drug-free environment for youth and families",
          link: "https://www.hartfordctc.org/index.php",
        },
      ],
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen text-center">
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

        {/* Resource Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 items-stretch">
          {resourceCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-blue-400 transition-all h-full flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-4 text-center">{category.icon}</div>
                <h2 className="text-xl font-bold text-blue-400 mb-6 text-center">
                  {category.title}
                </h2>
              </div>
              <ul className="flex-grow flex flex-col gap-4">
                {category.resources.map((resource, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-800 p-4 rounded-lg flex flex-col justify-start h-[150px]"
                  >
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ boxShadow: 'none', outline: 'none' }}
                      className="block h-full text-center no-underline hover:no-underline hover:text-blue-300"
                    >
                      <h3 className="font-medium">{resource.name}</h3>
                      <p className="scrollbar text-sm text-gray-400 text-center max-h-[60px] overflow-hidden hover:overflow-y-auto">
                        {resource.description}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-blue-400 mb-6">
            Need More Help?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Emergency Contacts */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
              <h3 className="font-bold text-lg mb-4 flex items-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Emergency Contacts
              </h3>
              <ul className="space-y-3 text-gray-300 text-left">
                <li className="flex justify-between items-start w-full">
                  <span className="w-2/3">The Village for Families & Children</span>
                  <a
                    href="tel:8602364511"
                    className="text-blue-400 no-underline whitespace-nowrap"
                  >
                    (860) 236-4511
                  </a>
                </li>
                <li className="flex justify-between items-start w-full">
                  <span className="w-2/3">Hartford Police Department</span>
                  <a
                    href="tel:8607574000"
                    className="text-blue-400 no-underline whitespace-nowrap"
                  >
                    (860) 757-4000
                  </a>
                </li>
                <li className="flex justify-between items-start w-full">
                  <span className="w-2/3">Hartford Fire Department</span>
                  <a
                    href="tel:8607574500"
                    className="text-blue-400 no-underline whitespace-nowrap"
                  >
                    (860) 757-4500
                  </a>
                </li>
              </ul>
            </div>

            {/* City Services */}
            <div className="bg-gray-800 p-5 rounded-lg">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                City Services
              </h3>
              <ul className="space-y-6 text-left text-gray-300">
                <li className="flex justify-between items-start w-full">
                  <span className="w-2/3">Hartford 311</span>
                  <a href="tel:311" className="text-blue-400 no-underline whitespace-nowrap">Dial 311</a>
                </li>
                <li className="flex justify-between items-start w-full">
                  <span className="w-2/3">Hands On Hartford Pantry</span>
                  <a href="tel:8607283201" className="text-blue-400 no-underline whitespace-nowrap">(860) 728-3201</a>
                </li>
                <li className="flex justify-between items-start w-full">
                  <span className="w-2/3">Mercy Housing and Shelter</span>
                  <a href="tel:8608082048" className="text-blue-400 no-underline whitespace-nowrap">(860) 808-2048</a>
                </li>
              </ul>
            </div>

            {/* Online Resources */}
            <div className="bg-gray-800 p-5 rounded-lg">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Online Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://handsonhartford.org/" className="text-blue-400 no-underline hover:no-underline text-center">
                    Hands On Hartford Pantry
                  </a>
                </li>
                <li>
                  <a href="https://mercyhousingct.org/" className="text-blue-400 no-underline hover:no-underline text-center">
                    Mercy Housing and Shelter
                  </a>
                </li>
                <li>
                  <a href="https://www.211ct.org/" className="text-blue-400 no-underline hover:no-underline text-center">
                    211 Connecticut
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center">
          <Link
            to="/dashboard"
            className="inline-block bg-blue-800 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors border border-blue-600 no-underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Resources;

