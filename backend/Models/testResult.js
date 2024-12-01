// backend/models/TestResult.js
const mongoose = require('mongoose');

const TestResultSchema = new mongoose.Schema({
  wpm: { type: Number, required: true },
  cpm: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  error: { type: Number, required: true },
  watchHistory: { type: [Object], required: true },
  fullString: { type: String, required: true },
  score: { type: Number, required: true }
});

module.exports = mongoose.model('TestResult', TestResultSchema);