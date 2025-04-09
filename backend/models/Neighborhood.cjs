const mongoose = require("mongoose");

const neighborhoodSchema = new mongoose.Schema(
  {
    type: String,
    properties: {
      OBJECTID: Number,
      HPD_NH_ID: Number,
      ID: Number,
      NAME: String,
      GlobalID: String,
      Inspector: String,
      Captian: String, // Note: Typo in original data ("Captian" instead of "Captain")
      ShapeSTArea: Number,
      ShapeSTLength: Number,
    },
    geometry: {
      type: {
        type: String,
        enum: ["Polygon", "MultiPolygon"],
        required: true,
      },
      coordinates: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    },
  },
  { collection: "neighborhoods" },
); // Explicit collection name

// Create index for better query performance
neighborhoodSchema.index({ "properties.NAME": 1 });
neighborhoodSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model("Neighborhood", neighborhoodSchema);
