const express = require("express");
const connectDB = require("./config/db.cjs");
const neighborhoods = require("./routes/neighborhoods.cjs");
const cors = require("cors");
const bodyParser = require("body-parser");
//const taxGridRoutes = require("./routes/taxGrid.cjs");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/neighborhoods", neighborhoods);
//app.use("/api/taxgrids", taxGridRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
