const express = require('express');
const User = require('../models/user.js');
const router = express.Router();

router.get('/weather/:email/:date', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).send('User not found');

    const weatherData = user.weatherData.filter(entry => {
      return new Date(entry.date).toDateString() === new Date(req.params.date).toDateString();
    });

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).send('Error fetching weather data');
  }
});

module.exports = router;
