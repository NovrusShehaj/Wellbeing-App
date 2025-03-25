// src/pages/Resources.jsx
import React, { useState }  from "react";
import HousingTable from "../components/HousingTable.jsx";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/Housing.css";

const Resources = () => {
  const hartfordPosition = [41.7658, -72.6734]; // Coordinates for Hartford, Connecticut
  const [filter, setFilter] = useState("all");
    
  const resources = [
    { type: "Food", position: [41.7999228,-72.6963562], name: " Joan C. Dauber Food Pantry", address:"675 Tower Avenue, Hartford, CT" },
    // https://www.findhelp.org/food/food-pantry--hartford-ct?__cf_chl_tk=uBL4Fey0lC9xt6v2ne0d1M4DyXD0ob.1kOgvgypCJlI-1742926060-1.0.1.1-F5ubmwm1U42NGgY802lxl7WCveP7LOWuJdjRm_vLS_U
  ];

  const filteredResources = filter === "all" ? resources : resources.filter(resource => resource.type === filter);

  return (
    <div>
    <h1>Local Resources Map</h1>
      <div className="filters">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("food")}>Food</button>
          <button onClick={() => setFilter("employment")}>Employment</button>
      </div>
      <div className="map-container">
          <MapContainer center={hartfordPosition} zoom={13} style={{height: "500px", width: "500px", zIndex:"3", position:"relative"}}>
              <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredResources.map((resource, index) => (
                  <Marker key={index} position={resource.position}>
                      <Popup>{resource.name} <br></br>
                      {resource.address}
                      {/* potentially add hyperlinks for google maps or housing listings */}
                      </Popup>
                  </Marker>
              ))}
          </MapContainer>
      </div>
      {/* headline 2 has additional padding due to issue overlapping with map */}
      <h1 style={{marginTop:"110px"}}>Resource Information</h1>
      <h2>(01). <a href="https://www.trinityhealthofne.org/location/the-joan-c-dauber-food-pantry" target="_blank" rel="noopener noreferrer"> Joan C. Dauber Food Pantry</a></h2>
      <p><i>Address: 675 Tower Avenue, Hartford</i> <br></br>
      <i>Phone: <a href="tel:860-714-2845" target="_blank" rel="noopener noreferrer">860-714-2845</a></i> <br></br>
        The Joan C. Dauber Food Pantry is a program of Trinity Health of New England.
        The pantry provides food to individuals and families in need. The pantry is open to all
        residents of Greater Hartford, regardless of religious affiliation.
        At the time of writing, the pantry's hours of operation are as follows:<br></br>
        <br></br>
        Sunday: Closed<br></br>
        Monday: 9:00 am - 2:00 pm<br></br>
        Tuesday: Closed<br></br>
        Wednesday: 9:00 am - 12:00 pm, 3:00 pm - 5:00 pm<br></br>
        Thursday: 9:00 am - 12:00 pm<br></br>
        Friday: Closed<br></br>
        Saturday: Closed<br></br>
        <br></br>
        <i>Please visit the pantry's <a href="https://www.trinityhealthofne.org/location/the-joan-c-dauber-food-pantry" target="_blank" rel="noopener noreferrer">website</a> or call for the most up-to-date information.</i>
        </p>
    </div>
  );
};

export default Resources;