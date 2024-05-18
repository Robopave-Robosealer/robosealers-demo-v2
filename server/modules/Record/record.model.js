const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  robot: { type: mongoose.Types.ObjectId, ref: "robots" },
  month: { type: String, required: true },
  batteryHoursPercentage: { type: Number, required: true },
  distances: { type: Number, required: true },
  accuracyPercentage: { type: Number, required: true },
  count: { type: Number, required: true }
});

const recordModel = mongoose.model('records', recordSchema);

module.exports = recordModel;