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
                            This project provides a centralized platform for accessing important housing, employment and general wellbeing resources in Hartford, CT. 
                            By consolidating local services and visualizing neighborhood-level data, we aim to promote wellbeing across the community.
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
                                Target End User</p>
                            <p className="grid-subtext text-white text-lg">
                            Residents of Hartford, CT, including low-to-middle income families, renters seeking housing resources, 
                            and individuals facing unemployment or economic hardship.
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
                                We are focused on providing solutions to increase well being of the community in terms
                                of Housing insecurity, financial stress, and unemployment.
                            </p>
                            <br/>
                            <p className="grid-subtext text-white text-lg">
                                We want to help low-middle class parties in the Hartford be able to have access to
                                affordable housing solutions, job opportunities, and an increased financial stability.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-2 xl:col-start-2 xl:row-span-3 mb-5 flex justify-center items-center">
                    <div className="grid-container flex flex-col justify-center items-center">
                        <img src="assets/plan.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext font-bold text-neutral-400 text-xl hover:text-white transition-colors">Our
                                Plan</p>
                            <p className="grid-subtext text-white text-lg">
                                We plan on developing a web app that can provide users access to resources and
                                information that can help them improve their wellbeing.
                            </p>
                            <br/>
                            <p className="grid-subtext text-white text-lg">
                                We are planning on incorporating data from various sources to provide a comprehensive
                                view of the wellbeing of the
                                community.
                            </p>
                            <br/>
                            <p className="grid-subtext text-white text-lg">
                                Currently some datasets we are looking at include data relating to salary, ability to
                                buy a house such as the following:
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