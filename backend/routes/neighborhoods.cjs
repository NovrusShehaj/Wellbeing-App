const express = require("express");
const router = express.Router();
const Neighborhood = require("../models/Neighborhood.cjs");

// Get all neighborhoods
router.get("/", async (req, res) => {
  try {
    const neighborhoods = await Neighborhood.find();
    res.json(neighborhoods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific neighborhood by ID
router.get("/:id", async (req, res) => {
  try {
    const neighborhood = await Neighborhood.findById(req.params.id);
    if (!neighborhood) {
      return res.status(404).json({ message: "Neighborhood not found" });
    }
    res.json(neighborhood);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Import GeoJSON data (run this once to seed your database)
router.post("/import", async (req, res) => {
  try {
    // This would be called once with your GeoJSON data
    const data = require("../data/Neighborhood_Districts.geojson");
    const result = await Neighborhood.insertMany(data.features);
    res.json({ message: "Data imported successfully", count: result.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
