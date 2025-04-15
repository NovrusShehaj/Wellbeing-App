const mongoose = require("mongoose");

const taxGridSchema = new mongoose.Schema(
  {
    type: String,
    properties: {
      // Add properties from your Tax_Grid_Data.geojson
      OBJECTID: Number,
      GRID_ID: Number,
      // Add other properties as needed
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
  { collection: "taxgrids" }, // Explicit collection name
);

// Create indexes for better query performance
taxGridSchema.index({ "properties.GRID_ID": 1 });
taxGridSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model("TaxGrid", taxGridSchema);
