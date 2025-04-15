// src/pages/Housing.jsx
import React, { useState } from "react";
import HousingTable from "../components/HousingTable.jsx";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/Housing.css";

const Housing = () => {
  const hartfordPosition = [41.7658, -72.6734]; // Coordinates for Hartford, Connecticut
  const [filter, setFilter] = useState("all");

  const resources = [
    {
      type: "family",
      position: [41.7904774, -72.6817872],
      name: "Jackie Schaeffer Apartments",
      address: "711 Garden Street, Hartford",
    },
    {
      type: "family",
      position: [41.755018, -72.674402],
      name: "Wethersfield Commons",
      address: "32-34 & 36-38 Wethersfield Avenue, Hartford",
    },
    {
      type: "family",
      position: [41.7861232, -72.6780693],
      name: "Generations Campus",
      address: "35 Clark Street, Hartford",
    },
    {
      type: "senior",
      position: [41.801717, -72.6948399],
      name: "Coventry Place (Senior)",
      address: "160 Coventry Street, Bloomfield",
    },
    {
      type: "senior",
      position: [41.7861209, -72.6780274],
      name: "St. Michael's (Senior)",
      address: "35 Clark Street, Hartford",
    },
    {
      type: "resource",
      position: [41.7811648, -72.6724596],
      name: "Community Renewal Team (Resources)",
      address: "555 Windsor Street, Hartford",
    },
  ];

  const filteredResources =
    filter === "all"
      ? resources
      : resources.filter((resource) => resource.type === filter);

  return (
    <div>
      {/* <HousingTable /> */}
      <h1>Housing & Resources Map</h1>
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("family")}>Family</button>
        <button onClick={() => setFilter("senior")}>Senior</button>
        <button onClick={() => setFilter("resource")}>Resources</button>
      </div>
      <div className="map-container">
        <MapContainer
          center={hartfordPosition}
          zoom={13}
          style={{
            height: "500px",
            width: "500px",
            zIndex: "3",
            position: "relative",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredResources.map((resource, index) => (
            <Marker key={index} position={resource.position}>
              <Popup>{resource.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {/* headline 2 has additional padding due to issue overlapping with map */}
      <h1 style={{ marginTop: "110px" }}>Resource Information</h1>
      <h2>
        (01).{" "}
        <a
          href="https://www.crtct.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Community Renewal Team
        </a>
      </h2>
      <p>
        <i>Address: 555 Windsor Street, Hartford</i> <br></br>
        Community Renewal Team (CRT) is a nonprofit organization dedicated to
        helping individuals and families in Hartford and Middlesex Counties
        achieve healthy and economically stable futures. They have partnered
        with local officials, providers, and the community to address challenges
        like hunger, homelessness, and unemployment by providing access to
        education, affordable housing, and mental health services. <br></br>
        {/* line breaks in code are formatted this way to allow spaces between link/non-link text */}
        CRT provides options for{" "}
        <a
          href="https://www.crtct.org/programs/housing-shelters/affordable-housing/"
          target="_blank"
          rel="noopener noreferrer"
        >
          affordable family housing
        </a>{" "}
        and{" "}
        <a
          href="https://www.crtct.org/programs/seniors/senior-affordable-housing/"
          target="_blank"
          rel="noopener noreferrer"
        >
          affordable senior housing
        </a>{" "}
        in Hartford county.
      </p>
      {/* <h2>(02). </h2>
      <p>Test text</p> */}
    </div>
  );
};

export default Housing;
