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

// Get neighborhoods by name
router.get("/name/:name", async (req, res) => {
  try {
    const neighborhoods = await Neighborhood.find({
      "properties.NAME": req.params.name,
    });
    res.json(neighborhoods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get neighborhoods within a geographic area
router.get("/within", async (req, res) => {
  try {
    const { lng, lat, radius } = req.query;
    if (!lng || !lat || !radius) {
      return res.status(400).json({
        message: "Please provide lng, lat, and radius query parameters",
      });
    }

    const neighborhoods = await Neighborhood.find({
      geometry: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(lng), parseFloat(lat)],
            parseFloat(radius) / 6378.1, // Convert km to radians
          ],
        },
      },
    });

    res.json(neighborhoods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Import GeoJSON data for sustainable neighborhoods
router.post("/import-sustainable", async (req, res) => {
  try {
    const fs = require("fs");
    const path = require("path");
    const geojsonPath = path.join(
      __dirname,
      "../data/Livable_Sustainable_Neighborhood_Districts.geojson",
    );
    const rawData = fs.readFileSync(geojsonPath, "utf8");
    const data = JSON.parse(rawData);

    const features = data.features.map((feature) => ({
      type: feature.type,
      properties: {
        OBJECTID: feature.properties.OBJECTID,
        HPD_NH_ID: feature.properties.HPD_NH_ID,
        ID: feature.properties.ID,
        NAME: feature.properties.NAME,
        GlobalID: feature.properties.GlobalID,
        Inspector: feature.properties.Inspector,
        Captian: feature.properties.Captian,
        ShapeSTArea: feature.properties.ShapeSTArea,
        ShapeSTLength: feature.properties.ShapeSTLength,
      },
      geometry: {
        type: feature.geometry.type,
        coordinates: feature.geometry.coordinates,
      },
    }));

    const result = await Neighborhood.insertMany(features);
    res.json({
      message: "Sustainable neighborhoods imported successfully",
      count: result.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
