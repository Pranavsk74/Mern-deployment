const express = require("express");
const Firm = require("../models/Firm");

const router = express.Router();

// READ: get all firms, with optional simple search/filter query parameters
router.get("/", async (req, res) => {
  try {
    const { search, sector, location, stage } = req.query;
    const filter = {};
    if (search) {
      const pattern = new RegExp(search, "i");
      filter.$or = [
        { name: pattern }, { sector: pattern }, { location: pattern },
        { investmentStage: pattern }, { description: pattern }
      ];
    }
    if (sector) filter.sector = new RegExp(`^${sector}$`, "i");
    if (location) filter.location = new RegExp(location, "i");
    if (stage) filter.investmentStage = new RegExp(`^${stage}$`, "i");
    const firms = await Firm.find(filter).sort({ createdAt: -1 });
    res.json(firms);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch firms", error: error.message });
  }
});

// READ: get one firm
router.get("/:id", async (req, res) => {
  try {
    const firm = await Firm.findById(req.params.id);
    if (!firm) return res.status(404).json({ message: "Firm not found" });
    res.json(firm);
  } catch (error) {
    res.status(400).json({ message: "Invalid firm ID", error: error.message });
  }
});

// CREATE: add a firm
router.post("/", async (req, res) => {
  try {
    const { name, sector, location } = req.body;
    if (!name || !sector || !location) {
      return res.status(400).json({ message: "Name, sector, and location are required." });
    }
    const firm = await Firm.create(req.body);
    res.status(201).json({ message: "Firm added successfully", firm });
  } catch (error) {
    res.status(400).json({ message: "Could not add firm", error: error.message });
  }
});

// UPDATE: edit a firm
router.put("/:id", async (req, res) => {
  try {
    const firm = await Firm.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!firm) return res.status(404).json({ message: "Firm not found" });
    res.json({ message: "Firm updated successfully", firm });
  } catch (error) {
    res.status(400).json({ message: "Could not update firm", error: error.message });
  }
});

// DELETE: remove a firm
router.delete("/:id", async (req, res) => {
  try {
    const firm = await Firm.findByIdAndDelete(req.params.id);
    if (!firm) return res.status(404).json({ message: "Firm not found" });
    res.json({ message: "Firm deleted successfully", firm });
  } catch (error) {
    res.status(400).json({ message: "Could not delete firm", error: error.message });
  }
});

module.exports = router;
