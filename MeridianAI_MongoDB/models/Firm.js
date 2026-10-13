const mongoose = require("mongoose");

const firmSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sector: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    investmentStage: { type: String, default: "Growth", trim: true },
    investmentRange: { type: String, default: "Not specified", trim: true },
    website: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Firm", firmSchema);
