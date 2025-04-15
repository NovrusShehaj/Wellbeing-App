const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI not found in .env file");
    }

    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Exit on failure
  }
}

// Export for use in other files (e.g., server.cjs)
module.exports = connectDB;
