// src/pages/Home.jsx
import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "../index.css";
import "../styles/Link.css"
// src/pages/Home.jsx

const Home = () => {
    return (
        <div className="home-container flex justify-center items-center">
            <div
                className="grid xl:grid-cols-1 xl:grid-rows-1 md:grid-cols-1 grid-cols-1 gap-5 w-full h-full mt-10 mx-10 my-auto flex justify-center items-center">
                <div className="xl:col-span-2 xl:col-start-2 xl:row-span-3 mb-10 flex justify-center items-center">
                    <div className="grid-container mx-auto flex flex-col justify-center items-center">
                        <div>
                            <h1 className="text-blue-600 font-bold text-8xl">TOP Wellbeing</h1>
                            <br/>
                            <h1 className="text-blue-200 font-bold text-5xl flex justify-center items-center">UCONN
                                2024/25 Senior Design Project</h1>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-2 xl:col-start-2 xl:row-span-3 mb-5 flex justify-center items-center">
                    <div className="grid-container mx-auto flex flex-col justify-center items-center">
                        <img src="assets/Hartford.png" alt="grid-3"
                             className="w-full sm:h-[266px] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext font-bold text-neutral-400 text-xl hover:text-white transition-colors mx-auto">About
                                Our Project</p>
                            <p className="grid-subtext text-white text-lg">
                            This project aims to improve the livelihood of families in Hartford, CT by providing a centralized platform for accessing important housing, employment and general wellbeing resources. 
                            By consolidating local services and visualizing neighborhood-level data, we aim to promote wellbeing across the community with the most helpful and up to date information for our users.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-2 xl:col-start-2 xl:row-span-3 mb-5 flex justify-center items-center">
                    <div className="grid-container flex flex-col justify-center items-center">
                        <img src="assets/EndUser.png" alt="grid-3"
                             className="w-full sm:h-[266px] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext font-bold text-neutral-400 text-xl hover:text-white transition-colors">Our
                                Intended Demographic</p>
                            <p className="grid-subtext text-white text-lg">
                            Hartford's lower to middle class residents are the driving force behind our project. We cater to renters in need of affordable housing and individuals looking for employment.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-2 xl:col-start-2 xl:row-span-3 mb-5 flex justify-center items-center">
                    <div className="grid-container flex flex-col justify-center items-center">
                        <img src="assets/focus.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext font-bold text-neutral-400 text-xl hover:text-white transition-colors">Our
                                Focus</p>
                            <p className="grid-subtext text-white text-lg">
                                Housing insecurity, financial stress, and unemployment are issues you can find anywhere across the globe.
                            </p>
                            <br/>
                            <p className="grid-subtext text-white text-lg">
                                Our focus us providing housing solutions, job opportunities, and increased financial stability to the citizens of Hartford.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-2 xl:col-start-2 xl:row-span-3 mb-5 flex justify-center items-center">
                    <div className="grid-container flex flex-col justify-center items-center">
                        <img src="assets/plan.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext font-bold text-neutral-400 text-xl hover:text-white transition-colors">Our
                                Resources</p>
                            <p className="grid-subtext text-white text-lg">
                                Our web app provides users access to resources and
                                information geared towards improving their well-being.
                            </p>
                            <br/>
                            <p className="grid-subtext text-white text-lg">
                                We have worked closely with the U.S. Census Bureau to incorporate
                                data from various sources to provide a comprehensive
                                understanding of the Hartford community's economic state.
                            </p>
                            <br/>
                            <p className="grid-subtext text-white text-lg">
                                The datasets we investigate summarize the financial status of Hartford residents.
                                Here are our current resources:
                            </p>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="text-blue-200 text-3xl font-extrabold mt-10 mb-2 flex justify-center items-center">Dataset Links</h1>
            <div className="link-buttons mt-5 mb-10">
                <a href="https://www.bls.gov/oes/tables.htm" target="_blank" rel="noopener noreferrer"
                   className="link-button">Employment Rates</a>
                <a href="https://www.bls.gov/regions/northeast/summary/blssummary_hartford.pdf" target="_blank"
                   rel="noopener noreferrer" className="link-button">Economic Summary</a>
            </div>

        </div>
    );
};

export default Home;