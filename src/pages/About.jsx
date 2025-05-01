import React, { useState } from 'react';
import Globe from 'react-globe.gl';
import Button from '../components/Button.jsx';

const About = () => {
    const [copiedEmail, setCopiedEmail] = useState(null);

    const handleCopy = (email) => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(email);

        setTimeout(() => {
            setCopiedEmail(null);
        }, 2000);
    };

    const teamMembers = [
        { name: "Adarsh Rao Makarla", email: "adarsh_rao.makarla@uconn.edu", image: "assets/sdp_adarsh.jpg" },
        { name: "Benjamin Acorda", email: "benjamin.acorda@uconn.edu", image: "assets/sdp_ben.jpg" },
        { name: "Novrus Shehaj", email: "novrus.shehaj@uconn.edu", image: "assets/sdp_nov.jpg" },
        { name: "Pierson Faulk", email: "pierson.faulk@uconn.edu", image: "assets/sdp_pierson.jpg" },
        { name: "Zachary Figuenick", email: "zachary.figuenick@uconn.edu", image: "assets/sdp_zack.jpg" },
    ];

    return (
        <section className="c-space my-36" id="about">
            <div>
                <h1 className="text-blue-600 font-bold text-5xl mt-10 flex justify-center items-center">Team 47</h1>
                <h1 className="text-blue-300 font-bold text-3xl mt-10 flex justify-center items-center">University of Connecticut, Storrs</h1>
            </div>
            <div
                className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full mx-10 mt-10 flex justify-center items-center">
                {teamMembers.map((member, index) => (
                    <div key={index} className="col-span-1 xl:row-span-3 flex justify-center items-center">
                        <div className="grid-container flex flex-col justify-center items-center">
                            <img src={member.image} alt={`grid-${index + 1}`}
                                 className="w-full sm:h-[276px] h-fit object-contain"/>
                            <div>
                                <strong
                                    className="grid-headtext text-indigo-100 font-bold text-xl hover:text-white transition-colors flex justify-center items-center">
                                    {member.name}
                                </strong>
                                <br/>
                                <div className="copy-container" onClick={() => handleCopy(member.email)}>
                                    <img src={copiedEmail === member.email ? 'assets/tick.svg' : 'assets/copy.svg'}
                                         alt="copy"/>
                                    <p className="grid-subtext text-neutral-400 text-xl hover:text-white transition-colors cursor-pointer">
                                        {member.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default About;