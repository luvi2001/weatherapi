import express from "express";
import mongoose from "mongoose";
import cron from "node-cron";
import nodemailer from "nodemailer";
import User from "./models/user.js";
import * as weatherController from "./controllers/weatherController.mjs";
import userRoutes from "./routes/userRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/", userRoutes);
app.use("/", weatherRoutes);

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("Error connecting to database:", err));

// 🚀 Remove `app.listen(PORT)`, use serverless
export default app;
export const handler = serverless(app);

// ✅ CRON job workaround for Vercel (Run it locally or in a separate server)
if (process.env.CRON_ENABLED === "true") {
  cron.schedule("0 */3 * * *", async () => {
    try {
      console.log("Running scheduled task...");
      const users = await User.find();

      for (const user of users) {
        console.log("Processing user:", user.email);

        const weatherData = await weatherController.fetchWeatherData(user.location);
        if (!weatherData) continue;

        user.weatherData.push(weatherData);
        await user.save();

        const weatherText = await weatherController.generateWeatherText(weatherData, user.location);

        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        let mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Hourly Weather Report",
          text: weatherText || `Current Weather: ${weatherData.description}, ${weatherData.temperature}°C`,
        };

        console.log("Attempting to send email to:", user.email);

        try {
          const info = await transporter.sendMail(mailOptions);
          console.log("Email sent successfully:", info.response);
        } catch (error) {
          console.error("Error sending email:", error.message, error);
        }
      }
    } catch (err) {
      console.error("Error during scheduled task:", err.message, err);
    }
  });
}
