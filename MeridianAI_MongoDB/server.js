require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const firmRoutes = require("./routes/firmRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Meridian AI API is running" });
});

app.use("/api/firms", firmRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing. Create a .env file using .env.example.");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Meridian AI running at http://localhost:${PORT}`));
  } catch (error) {
    console.error("Could not start server:", error.message);
    process.exit(1);
  }
}

startServer();
