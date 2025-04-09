const mongoose = require("mongoose");

module.exports = async function connectDB() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://Nov:******@wellbeingappdb.f5mnmok.mongodb.net/WellbeingAppDB",
      {
        serverApi: { version: "1", strict: true, deprecationErrors: true },
      },
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};
