import axios from "axios";

export const fetchWeather = async (lat, lon, apiKey) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data.");
  }
};


