import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi"; // Weather icons from react-icons

const PronosticoLluvia = () => {
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null); // Ref for the scrolling container

  const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        setForecastData(response.data.list); // The forecast data in 3-hour intervals
      } catch (err) {
        setError("Error fetching weather data.");
      }
    };

    // Get the user's location to fetch weather data
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (err) => {
            setError("Unable to retrieve your location.");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, [API_KEY]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollSpeed = 1; // Adjust scroll speed here

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;
        // When reaching the end, reset to the beginning
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    };

    const scrollInterval = setInterval(scroll, 30); // Adjust interval timing here

    // Cleanup on component unmount
    return () => clearInterval(scrollInterval);
  }, []);

  // Function to map weather conditions to icons
  const getWeatherIcon = (weather) => {
    const description = weather.main.toLowerCase();

    switch (description) {
      case "clear":
        return <WiDaySunny className="text-yellow-400 text-4xl" />;
      case "clouds":
        return <WiCloud className="text-gray-400 text-4xl" />;
      case "rain":
      case "drizzle":
        return <WiRain className="text-blue-400 text-4xl" />;
      case "snow":
        return <WiSnow className="text-blue-200 text-4xl" />;
      case "thunderstorm":
        return <WiThunderstorm className="text-yellow-600 text-4xl" />;
      case "fog":
      case "mist":
        return <WiFog className="text-gray-300 text-4xl" />;
      default:
        return <WiCloud className="text-gray-400 text-4xl" />;
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full mt-8">
      <h2 className="text-lg mb-4">
        Precipitación y clima para las próximas horas:
      </h2>

      <div
        className="flex overflow-x-auto space-x-6 pb-4"
        ref={scrollRef} // Ref to enable scrolling
      >
        {forecastData.length > 0 ? (
          forecastData.slice(0, 8).map((forecast, index) => (
            <div
              key={index}
              className="min-w-[120px] bg-yellow-300 p-4 rounded-lg shadow-md text-center"
            >
              {/* Displaying the time */}
              <p className="font-semibold mb-2">
                {new Date(forecast.dt * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              {/* Displaying weather icon */}
              <div className="flex justify-center mb-2">
                {getWeatherIcon(forecast.weather[0])}
              </div>

              {/* Displaying temperature */}
              <p className="text-lg font-bold">
                {Math.round(forecast.main.temp)}°C
              </p>

              {/* Displaying precipitation probability */}
              <p className="text-sm">
                {Math.round(forecast.pop * 100)}% lluvia
              </p>
            </div>
          ))
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
};

export default PronosticoLluvia;
