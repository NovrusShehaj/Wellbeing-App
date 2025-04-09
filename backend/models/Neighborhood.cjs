const mongoose = require("mongoose");
const { Schema } = mongoose;

const NeighborhoodSchema = new Schema({
  type: String,
  properties: {
    OBJECTID: Number,
    HPD_NH_ID: Number,
    ID: Number,
    MAPNUM: String,
    NAME: String,
    GlobalID: String,
    ShapeSTArea: Number,
    ShapeSTLength: Number,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Polygon"],
      required: true,
    },
    coordinates: {
      type: [[[Number]]],
      required: true,
    },
  },
});

module.exports = mongoose.model("Neighborhood", NeighborhoodSchema);
