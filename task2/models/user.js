import mongoose from 'mongoose';

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

export default mongoose.model('Userw', userSchema);
