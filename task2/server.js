const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const User = require('./models/user');
const weatherController = require('./controllers/weatherController');
const userRoutes = require('./routes/userRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', userRoutes);
app.use('/', weatherRoutes);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('Error connecting to database:', err));



cron.schedule('*/5 * * * *', async () => {
  try {
    console.log('Running scheduled task...');
    
    const users = await User.find();
    if (!users.length) {
      console.log("No users found.");
      return;
    }

    for (const user of users) {
      console.log("Processing user:", user.email);
      
      const weatherData = await weatherController.fetchWeatherData(user.location);
      if (!weatherData) {
        console.log("No weather data found for", user.location);
        continue;
      }

      user.weatherData.push(weatherData);
      await user.save();
      
      console.log(`Updated weather data for ${user.email}`);

      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Hourly Weather Report',
        text: `Current Weather: ${weatherData.description}, ${weatherData.temperature}°C`
      };

      console.log("Attempting to send email to:", user.email);

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
      } catch (error) {
        console.error('Error sending email:', error.message, error);
      }
    }
  } catch (err) {
    console.error('Error during scheduled task:', err.message, err);
  }
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
});

// Exporting the app for testing or further use
module.exports = app;
