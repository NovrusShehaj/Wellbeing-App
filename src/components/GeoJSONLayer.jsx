// GeoJSONLayer.jsx
import { GeoJSON } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

const parkingIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2909/2909770.png",
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
  className: "map-marker-blue",
});

const GeoJSONLayer = ({ geojsonData, onFeatureClick }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (geojsonData) {
      setData(geojsonData);
    }
  }, [geojsonData]);

  if (!data) return null;

  const pointToLayer = (feature, latlng) => {
    return L.marker(latlng, {
      icon: parkingIcon,
      riseOnHover: true,
    });
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const popupContent = `
        <div class="p-2 min-w-[200px] bg-gray-900 text-white">
          <h4 class="font-bold text-blue-400">Parking Lot</h4>
          ${Object.entries(feature.properties)
            .map(
              ([key, value]) =>
                `<p class="text-sm"><span class="text-gray-400">${key}:</span> ${value || "N/A"}</p>`,
            )
            .join("")}
        </div>
      `;
      layer.bindPopup(popupContent);

      layer.on({
        click: () => onFeatureClick(feature),
      });
    }
  };

  return (
    <GeoJSON
      data={data}
      pointToLayer={pointToLayer}
      onEachFeature={onEachFeature}
    />
  );
};

export default GeoJSONLayer;
