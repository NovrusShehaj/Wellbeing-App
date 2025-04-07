import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/MapContainer.css";

const hartfordPosition = [41.7658, -72.6734];

const resources = [
    { id: 1, type: "government", position: [41.7627, -72.6739], name: "Hartford City Hall" },
    { id: 2, type: "education", position: [41.7688, -72.6754], name: "School" },
    { id: 3, type: "medical", position: [41.7628, -72.6714], name: "Hospital" }
];

const ResetMapView = ({ resetTrigger }) => {
    const map = useMap();
    React.useEffect(() => {
        if (resetTrigger) {
            map.flyTo(hartfordPosition, 15, { duration: 1.5 });
        }
    }, [resetTrigger, map]);
    return null;
};

const MoveToLocation = ({ position }) => {
    const map = useMap();
    React.useEffect(() => {
        if (position) {
            map.flyTo(position, 18, { duration: 1.5 });
        }
    }, [position, map]);
    return null;
};

const MapPage = () => {
    const [resetTrigger, setResetTrigger] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [filter, setFilter] = useState("all");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleResetClick = () => {
        setResetTrigger(true);
        setTimeout(() => setResetTrigger(false), 1000);
    };

    const handleCardClick = (id) => {
        const selectedResource = resources.find(resource => resource.id === id);
        if (selectedResource) {
            setSelectedPosition(selectedResource.position);
        }
    };

    const elementarymiddlejson = [
        {id: 1, name: "Betances Learning Lab Magnet School", position: [41.75970689310172, -72.67245798833926], address: "42 Charter Oak Ave, Hartford, CT 06106", website: "https://www.betancesowls.org/", type: "Magnet"},

        {id: 2, name: "Betances STEM Magnet School", position: [41.74510520990086, -72.67204516135463], address: "400 Wethersfield Ave, Hartford, CT 06114", website: "https://www.bstemhartford.org/o/betancesstem", type: "Magnet"},

        {id: 3, name: "Breakthrough Magnet School - South", position: [41.74586146506485, -72.7070435256589], address: "290 Brookfield St, Hartford, CT 06106", website: "https://www.breakthroughmagnetschool.org/o/btmss", type: "Magnet"},

        {id: 4, name: "Breakthrough Magnet School - North", position: [41.7861927675441, -72.6970662171737], address: "25 Ridgefield St, Hartford, CT 06112", website: "https://www.hartfordschools.org/o/btmsn", type: "Magnet"},

        {id: 5, name: "Burns Latino Studies Academy", position: [41.761190041908336, -72.69158114971157], address: "195 Putnam St, Hartford, CT 06106", website: "https://www.hartfordschools.org/o/burnslatinostudy", type: "Elementary"},

        {id: 6, name: "Alfred E. Burr Middle School", position: [41.74508101081767, -72.67243019204075], address: "400 Wethersfield Ave, Hartford, CT 06114", website: "https://www.burrhps.org/o/burr", type: "Middle"},

        {id: 7, name: "Capital Prepatory Magnet School", position: [41.77277950118139, -72.67580614971094], address: "1304 Main St, Hartford, CT 06103", website: "https://www.thecapitalprep.org/", type: "Magnet"},

        {id: 8, name: "Dr. James H Naylor/CCSU Leadership Academy", position: [41.73086524056437, -72.67525081902686], address: "639 Franklin Ave, Hartford, CT 06114", website: "https://www.hartfordschools.org/o/naylorschool", type: "Academy"},

        {id: 9, name: "Dr. Joseph S. Renzulli Gifted and Talented Academy", position: [41.77331090995863, -72.70130000183126], address: "85 Woodland St, Hartford, CT 06105", website: "https://www.hartfordschools.org/o/renzulli/", type: "Academy"},

        {id: 10, name: "Dr. Michael D. Fox School", position: [41.74622523496303, -72.68021449019032], address: "470 Maple Ave, Hartford, CT 06114", website: "https://www.hartfordschools.org/o/mdfox", type: "Elementary"},

        {id: 11, name: "Dwight Bellizzi Dual Language Academy", position: [41.73435813408519, -72.68059203251941], address: "215 South St, Hartford, CT 06114", website: "https://www.hartfordschools.org/o/dwightbellizzi", type: "Magnet"},

        {id: 12, name: "E. B. Kennelly School" , position: [41.73541735739312, -72.69467729019092], address: "180 White St, Hartford, CT 06114", website: "https://www.kennellyschool.org/", type: "Middle"},

        {id: 13, name: "Environmental Sciences Magnet School at Mary Hooker", position: [41.74159371135509, -72.70103855950443], address: "440 Broadview Terrace, Hartford, CT 06106", website: "https://www.environmentalsciencesmagnet.org/", type: "Magnet"},

        {id: 14, name: "Expeditionary Learning Academy at Moylan School", position: [41.74640764888024, -72.69920602457724], address: "101 Catherine St, Hartford, CT 06106", website: "https://www.hartfordschools.org/o/elams", type: "Elementary"},

        {id: 15, name: "Fred D. Wish Museum School", position: [41.78277707701602, -72.68712961902425], address: "104 Vine St, Hartford, CT 06112", website: "https://www.hartfordschools.org/o/wishmuseumschool/", type: "Elementary"},

        {id: 16, name: "Global Communications Academy" , position: [41.775175910987635, -72.68240898576798], address: "85 Edwards St, Hartford, CT 06120", website: "https://www.hartfordschools.org/o/global", type: "Academy"},

        {id: 17, name: "Hartford Pre-K Magnet" , position: [41.79191284293324, -72.70202628463686], address: "121 Cornwall St, Hartford, CT 06112", website: "https://www.hartfordschools.org/o/hpkm", type: "Magnet"},

        {id: 18, name: "Kinsella Magnet School of Performing Arts (PreK - 8)" , position: [41.80073154134314, -72.70819646135182], address: "415 Granby St, Hartford, CT 06112", website: "https://www.hartfordschools.org/o/kinsellaprek8", type: "Magnet"},
        
        {id: 19, name: "María C. Colón Sánchez Elementary" , position: [41.759099554600446, -72.68913268833931], address: "176 Babcock St, Hartford, CT 06106", website: "https://www.sanchezschool.org/o/sanchez", type: "Elementary"},

        {id: 20, name: "Martin Luther King Jr. Middle School", position: [41.786196426308265, -72.69714477680202], address: "25 Ridgefield St, Hartford, CT 06112", website: "https://www.hartfordschools.org/o/mlk", type: "Middle"},

        {id: 21, name: "McDonough Middle School" , position: [41.750222466089305, -72.69818600368279], address: "111 Hillside Ave, Hartford, CT 06106", website: "https://www.hartfordschools.org/o/mcdonough/", type: "Middle"},

        {id: 22, name: "Milner Middle School" , position: [41.7979395014897, -72.6698074441585], address: "150 Tower Ave, Hartford, CT 06120", website: "", type: "Middle"},

        {id: 23, name: "Montessori Magnet School at Annie Fisher", position: [41.79218334070588, -72.7077669668248], address: "280 Plainfield St, Hartford, CT 06112", website: "https://www.hartfordschools.org/o/anniefisher", type: "Magnet"},

        {id: 24, name: "Montessori Magnet at Batchelder", position: [41.73258377972185, -72.70779523251946], address: "280 Plainfield St, Hartford, CT 06112", website: "https://www.hartfordschools.org/o/batchelder", type: "Magnet"},

        {id: 25, name: "Noah Webster MicroSociety Magnet School", position: [41.76879477873677, -72.71223236929502], address: "5 Cone St, Hartford, CT 06105", website: "https://www.nwmms.org/o/nwmms", type: "Magnet"},

        {id: 26, name: "Parkville Community School", position: [41.75697116150175, -72.70791856135405], address: "47 New Park Ave, Hartford, CT 06106", website: "https://www.hartfordschools.org/o/parkville", type: "Elementary"},

        {id: 27, name: "S.A.N.D School", position: [41.77937448268038, -72.67605143436751], address: "1750 Main St, Hartford, CT 06120", website: "https://sand.hartfordschools.org/o/sand", type: "Elementary"},

        {id: 28, name: "Sarah J. Rawson Elementary School", position: [41.796452633435344, -72.70131063251623], address: "260 Holcomb St, Hartford, CT 06112", website: "https://www.hartfordschools.org/o/rawson", type: "Elementary"},

        {id: 29, name: "Science, Technology, Engineering and Math (STEM) Magnet School at Annie Fisher", position: [41.79205777586525, -72.70766785950184], address: "280 Plainfield St, Hartford, CT 06112", website: "https://anniefisherstem.hartfordschools.org/o/stemfisher", type: "Magnet"},

        {id: 30, name: "West Middle School", position: [41.77024392028868, -72.69571447484601], address: "44 Niles St, Hartford, CT 06105", website: "https://www.hartfordschools.org/o/west", type: "Middle"},
    ]

    const secondaryjson = [
        {id: 1, name: "Bulkeley High School", position: [41.74006884986331, -72.67222001902643], address: "585 Wethersfield Ave, Hartford, CT 06114", website: "https://bulkeley.hartfordschools.org/o/bulkeleyhigh", type: "High"},

        {id: 2, name: "Capital Prepatory Magnet School", position: [41.77277950118139, -72.67580614971094], address: "1304 Main St, Hartford, CT 06103", website: "https://www.thecapitalprep.org/", type: "Magnet"},

        {id: 3, name: "Classical Magnet School", position: [41.77326315280794, -72.70135935156128], address: "85 Woodland St, Hartford, CT 06105", website: "https://www.classicalmagnet.org/o/classicalmagnet", type: "Magnet"},

        {id: 4, name: "Great Path Academy at Manchester Community College", position: [41.76394277436404, -72.56120169016539], address: "60 Bidwell St, Manchester, CT 06040", website: "https://www.hartfordschools.org/o/gpa", type: "High"},

        {id: 5, name: "Hartford Magnet Trinity College Academy", position: [41.75051277488835, -72.68705883806977], address: "53 Vernon St, Hartford, CT 06106", website: "https://www.hartfordschools.org/o/hmtca", type: "High"},

        {id: 6, name: "Hartford Public High School", position: [41.76483995854785, -72.70078890368207], address: "55 Forest St, Hartford, CT 06105", website: "https://www.hartfordschools.org/o/hphs", type: "High"},

        {id: 7, name: "Kinsella Magnet School of Performing Arts (9-12)", position: [41.80085950918856, -72.70813208833721], address: "415 Granby St, Hartford, CT 06112", website: "https://www.hartfordschools.org/o/kinsella912", type: "Magnet"},

        {id: 8, name: "Pathways Academy of Technology and Design", position: [41.740791858993056, -72.63537224177102], address: "2 Pent Rd, East Hartford, CT 06118", website: "https://www.hartfordschools.org/o/pathways", type: "Academy"},

        {id: 9, name: "Sport and Medical Sciences Academy", position: [41.75280715100274, -72.6607336208761], address: "280 Huyshope Ave, Hartford, CT 06106", website: "https://www.hartfordschools.org/o/smsa", type: "Academy"},

        {id: 10, name: "Thomas Snell Weaver High School", position: [41.80152895900805, -72.7073049158584], address: "415 Granby St, Hartford, CT 06112", website: "https://www.hartfordschools.org/o/weaver", type: "High"},

        {id: 11, name: "University High School of Science and Engineering", position: [41.79632582530961, -72.70955587669512], address: "351 Mark Twain Dr, Hartford, CT 06112", website: "https://www.uhsse.org/o/universityhigh", type: "High"},

    ]

    const hospital_json = [
        {id: 1, name: "Hartford Hospital", position: [41.75608336529734, -72.68043823752289], address: "80 Seymour St, Hartford, CT 06106", website: "https://hartfordhospital.org/", phone: "+18605455000"},
        {id: 2, name: "Connecticut Children's Medical Center", position: [41.76570982711526, -72.68333870449491], address:" 282 Washington St, Hartford, CT 06106", website: "+18605459000"}
    ]

    const allSchools = [...elementarymiddlejson, ...secondaryjson];
    const allHospitals = [...hospital_json];
    const markersToShow = filter
                            ? filter === "education"
                            ? allSchools
                            : filter === "medical"
                            ? allHospitals
                            : resources.filter(r => r.type === filter)
                        : [...resources, ...allSchools, ...allHospitals];

    return (
        <div className="map-page">
            <div className="map-container">
                <MapContainer center={hartfordPosition} zoom={13} className="leaflet-map">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                    />
                    <ResetMapView resetTrigger={resetTrigger} />
                    <MoveToLocation position={selectedPosition} />
                    {markersToShow.map((item) => (
                        <Marker key={item.id} position={item.position}>
                            <Popup>{item.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
    
            <div className="location-list">
                <button className="toggle-filter-btn" onClick={() => setIsFilterOpen(true)}>
                    Filter Locations
                </button>
    
                {isFilterOpen && (
                    <div className="filter-panel">
                        <h2>Filter Locations</h2>
                        <div className="filter-buttons">
                            <button onClick={() => { setFilter("government"); setIsFilterOpen(false); }}>Government</button>
                            <button onClick={() => { setFilter("education"); setIsFilterOpen(false); }}>Schools</button>
                            <button onClick={() => { setFilter("medical"); setIsFilterOpen(false); }}>Hospitals</button>
                        </div>
                        <button className="close-filter-btn" onClick={() => setIsFilterOpen(false)}>Close</button>
                    </div>
                )}
    
    <div className="list-container">
    {markersToShow.length === 0 ? (
        <div className="placeholder-message">
            Use the filter to find locations.
        </div>
    ) : (
        <div className="cards-container">
            {filter === "education"
                ? allSchools.map((school) => (
                    <div key={school.id} className="location-card">
                        <h3>{school.name}</h3>
                        <p>{school.address}</p>
                        <a href={school.website} target="_blank" rel="noopener noreferrer" className="highlight-bubble">
                            Visit Website
                        </a>
                    </div>
                ))
                : filter === "medical"
                ? allHospitals.map((hospital) => (
                    <div key={hospital.id} className="location-card">
                        <h3>{hospital.name}</h3>
                        <p>{hospital.address}</p>
                        {hospital.phone && (
                            <p><a href={`tel:${hospital.phone}`}>{hospital.phone}</a></p>
                        )}
                        <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="highlight-bubble">
                            Visit Website
                        </a>
                    </div>
                ))
                : resources.filter(r => r.type === filter).map((resource) => (
                    <div key={resource.id} className="location-card" onClick={() => handleCardClick(resource.id)}>
                        <h3>{resource.name}</h3>
                    </div>
                ))}
        </div>
    )}
</div>
    
                <button onClick={handleResetClick} className="reset-button">Reset Map</button>
            </div>
        </div>
    );
}
export default MapPage;
    