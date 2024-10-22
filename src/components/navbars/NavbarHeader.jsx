import { useState, useEffect } from "react";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";
import { fetchWeather } from "../../services/weatherService";
import { Link } from "react-router-dom";

function NavbarHeader() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const data = await fetchWeather(latitude, longitude, API_KEY);
              setWeatherData(data);
            } catch (err) {
              setError(err.message);
            }
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

  const getWeatherIcon = (description) => {
    switch (description) {
      case "clear sky":
        return <WiDaySunny className="text-yellow-400 text-6xl" />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return <WiCloud className="text-black text-6xl" />;
      case "rain":
      case "shower rain":
        return <WiRain className="text-black text-6xl" />;
      case "snow":
        return <WiSnow className="text-black text-6xl" />;
      default:
        return <WiCloud className="text-black text-6xl" />;
    }
  };

  return (
    <div className="navbar bg-yellow-400 flex justify-between items-center">
      <Link to="/" className="btn btn-ghost text-xl">Integra</Link>
      {error ? (
        <span className="text-red-500">{error}</span>
      ) : weatherData ? (
        <div className="flex items-center">
          {getWeatherIcon(weatherData.weather[0].description)}
          <span className="ml-2">{Math.round(weatherData.main.temp)}°C</span>
        </div>
      ) : (
        <span>Cargando...</span>
      )}
    </div>
  );
}

export default NavbarHeader;
