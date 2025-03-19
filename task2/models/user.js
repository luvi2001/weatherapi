const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  weatherData: [
    {
      description: String,
      temperature: Number,
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Userw', userSchema);
