const mongoose = require("mongoose");
const TaxGrid = require("../models/TaxGrid.cjs");
const fs = require("fs");
const path = require("path");

// Use the existing connection
const db = mongoose.connection;

// Read and parse the GeoJSON file
const geojsonPath = path.join(__dirname, "../data/Tax_Map_Grid.geojson");
const rawData = fs.readFileSync(geojsonPath, "utf8");
const data = JSON.parse(rawData);

// Wait for connection to be established
db.once("open", async () => {
  try {
    // Clear existing data (optional)
    // await TaxGrid.deleteMany({});
    // console.log("Cleared existing tax grid data");

    // Transform features
    const features = data.features.map((feature) => ({
      type: feature.type,
      properties: {
        OBJECTID: feature.properties.OBJECTID,
        GRID_ID: feature.properties.GRID_ID,
        // Add other properties as needed
      },
      geometry: {
        type: feature.geometry.type,
        coordinates: feature.geometry.coordinates,
      },
    }));

    const result = await TaxGrid.insertMany(features);
    console.log(`Successfully imported ${result.length} tax grid features`);
    process.exit(0);
  } catch (err) {
    console.error("Error importing tax grid data:", err);
    process.exit(1);
  }
});

// Handle connection errors
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});
