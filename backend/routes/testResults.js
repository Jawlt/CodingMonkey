// In backend/routes/testResults.js
const express = require('express');
const router = express.Router();
const TestResult = require('../Models/testResult');

router.post('/test-results', async (req, res) => {
  console.log('Received request body:', req.body); // Debug log

  try {
    const { wpm, cpm, accuracy, error, watchHistory, fullString, score } = req.body;
    
    // Validate the data
    if (!wpm || !cpm || !accuracy || error === undefined) {
      console.log('Missing required fields'); // Debug log
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newResult = new TestResult({
      wpm,
      cpm,
      accuracy,
      error,
      watchHistory,
      fullString,
      score
    });

    console.log('Attempting to save:', newResult); // Debug log

    const savedResult = await newResult.save();
    console.log('Successfully saved:', savedResult); // Debug log
    
    res.status(201).json(savedResult);
  } catch (error) {
    console.error('Error saving test result:', error); // Debug log
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
