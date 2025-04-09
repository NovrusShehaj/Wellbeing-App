const mongoose = require("mongoose");
const Neighborhood = require("../models/Neighborhood.cjs");
const connectDB = require("../config/db.cjs");
const fs = require("fs");
const path = require("path");

// Read and parse the GeoJSON file
const geojsonPath = path.join(
  __dirname,
  "../data/Livable_Sustainable_Neighborhood_Districts.geojson",
);
const rawData = fs.readFileSync(geojsonPath, "utf8");
const data = JSON.parse(rawData);

connectDB().then(async () => {
  try {
    // Clear existing data (optional - you might want to keep both datasets)
    // await Neighborhood.deleteMany({});
    // console.log("Cleared existing neighborhood data");

    // Transform features to match our schema
    const features = data.features.map((feature) => ({
      type: feature.type,
      properties: {
        OBJECTID: feature.properties.OBJECTID,
        HPD_NH_ID: feature.properties.HPD_NH_ID,
        ID: feature.properties.ID,
        NAME: feature.properties.NAME,
        GlobalID: feature.properties.GlobalID,
        Inspector: feature.properties.Inspector,
        Captian: feature.properties.Captian, // Note the typo
        ShapeSTArea: feature.properties.ShapeSTArea,
        ShapeSTLength: feature.properties.ShapeSTLength,
      },
      geometry: {
        type: feature.geometry.type,
        coordinates: feature.geometry.coordinates,
      },
    }));

    // Insert new data
    const result = await Neighborhood.insertMany(features);
    console.log(
      `Successfully imported ${result.length} sustainable neighborhoods`,
    );

    process.exit(0);
  } catch (err) {
    console.error("Error importing data:", err);
    process.exit(1);
  }
});
