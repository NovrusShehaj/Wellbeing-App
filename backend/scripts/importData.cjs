const mongoose = require("mongoose");
const Neighborhood = require("../models/Neighborhood.cjs");
const connectDB = require("../config/db.cjs");
const fs = require("fs");
const path = require("path");

// Read and parse the GeoJSON file
const geojsonPath = path.join(
  __dirname,
  "../data/Neighborhood_Districts.geojson",
);
const rawData = fs.readFileSync(geojsonPath, "utf8");
const data = JSON.parse(rawData);

connectDB().then(async () => {
  try {
    // Clear existing data
    await Neighborhood.deleteMany({});
    console.log("Cleared existing neighborhood data");

    // Insert new data
    const result = await Neighborhood.insertMany(data.features);
    console.log(`Successfully imported ${result.length} neighborhoods`);

    process.exit(0);
  } catch (err) {
    console.error("Error importing data:", err);
    process.exit(1);
  }
});
