import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import Configuration  from 'openai';
import OpenAIApi from 'openai';





export const fetchWeatherData = async (location) => {
  const apiKey = '6d5621f3aee9e0c254138faf08e380fd';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const { weather, main } = response.data;
    return {
      description: weather[0].description,
      temperature: main.temp
    };
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return null;
  }
};

export const generateWeatherText = async (weatherData, location) => {
  try {
    // Initialize OpenAI API with the provided API key
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,  
    });
    const openai = new OpenAIApi(configuration);

    // Create a weather report prompt
    const prompt = `Generate a friendly weather report for ${location}. Current conditions: ${weatherData.description}, temperature: ${weatherData.temperature}°C.`;

    // Get response from OpenAI's GPT-3.5 or GPT-4
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo', // Use gpt-3.5-turbo or gpt-4 instead of the deprecated text-davinci-003
      prompt,
      max_tokens: 100
    });

    // Return the generated weather text
    return response.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating weather text:', error.message);
    return null;
  }
};