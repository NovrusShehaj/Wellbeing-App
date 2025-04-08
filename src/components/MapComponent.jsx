import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ neighborhoodData }) => {
    const mapRef = useRef();

    useEffect(() => {
        const map = mapRef.current;
        if (map) {
            setTimeout(() => {
                map.invalidateSize();
            }, 0);
        }

        const handleResize = () => {
            if (map) {
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <MapContainer
            ref={mapRef}
            center={[41.7658, -72.6734]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            whenReady={(map) => {
                setTimeout(() => {
                    map.target.invalidateSize();
                }, 0);
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON
                data={neighborhoodData}
                style={(feature) => {
                    const score = feature.properties?.score || 50;
                    return {
                        fillColor: score >= 80 ? "#1E40AF" : // Blue-800
                            score >= 60 ? "#2563EB" : // Blue-600
                                score >= 40 ? "#3B82F6" : // Blue-500
                                    "#1E3A8A", // Blue-900
                        weight: 1,
                        opacity: 1,
                        color: "#E5E7EB", // Gray-200
                        dashArray: "3",
                        fillOpacity: 0.7
                    };
                }}
                onEachFeature={(feature, layer) => {
                    layer.on({
                        click: () => {
                            layer.setStyle({
                                weight: 3,
                                color: "#60A5FA", // Blue-400
                                dashArray: "",
                                fillOpacity: 0.7
                            });
                            layer.bringToFront();
                        },
                        mouseout: () => {
                            const score = feature.properties?.score || 50;
                            layer.setStyle({
                                fillColor: score >= 80 ? "#1E40AF" :
                                    score >= 60 ? "#2563EB" :
                                        score >= 40 ? "#3B82F6" :
                                            "#1E3A8A",
                                weight: 1,
                                color: "#E5E7EB",
                                dashArray: "3",
                                fillOpacity: 0.7
                            });
                        }
                    });
                }}
            />
        </MapContainer>
    );
};

export default MapComponent;