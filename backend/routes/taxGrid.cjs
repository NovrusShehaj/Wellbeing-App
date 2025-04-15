const express = require("express");
const router = express.Router();
const TaxGrid = require("../models/TaxGrid.cjs");

// Get all tax grids
router.get("/", async (req, res) => {
  try {
    const taxGrids = await TaxGrid.find();
    res.json(taxGrids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Import GeoJSON data for tax grids
router.post("/import", async (req, res) => {
  try {
    const fs = require("fs");
    const path = require("path");
    const geojsonPath = path.join(__dirname, "../data/Tax_Map_Grid.geojson");
    const rawData = fs.readFileSync(geojsonPath, "utf8");
    const data = JSON.parse(rawData);

    const features = data.features.map((feature) => ({
      type: feature.type,
      properties: {
        OBJECTID: feature.properties.OBJECTID,
        GRID_ID: feature.properties.GRID_ID,
        // Map other properties as needed
      },
      geometry: {
        type: feature.geometry.type,
        coordinates: feature.geometry.coordinates,
      },
    }));

    const result = await TaxGrid.insertMany(features);
    res.json({
      message: "Tax grid data imported successfully",
      count: result.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
