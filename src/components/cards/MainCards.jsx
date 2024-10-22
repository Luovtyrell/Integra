import  { useState, useEffect } from "react";
import axios from "axios";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";
import MenuCard from "./MenuCards"; // Assuming MenuCard is in the same directory

const MainCards = ({ plujaRef, tempRef, vegetacioRef, indiceRef }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Scroll function
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Use import.meta.env in Vite to access environment variables
  const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    const fetchWeather = (lat, lon) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((err) => {
          setError("Failed to fetch weather data.");
        });
    };

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

  // Function to get relevant weather icon
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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-yellow-300 to-yellow-400 px-4 pt-8">
      {/* Home Title */}
      <header className="mb-4">
        <h1 className="text-gray-800 text-3xl font-semibold text-center">
          Integra
        </h1>
        <p className="text-gray-800 text-base mt-1">
          Concienciando sobre la Sequía
        </p>
      </header>

      {/* Weather Card */}
      <div className="text-center max-w-md w-full p-4 bg-transparent rounded-xl shadow-lg text-gray-800 border-2 border-black mb-8">
        {error ? (
          <p>{error}</p>
        ) : weatherData ? (
          <>
            <div className="flex justify-center mb-2 -mt-3">
              {getWeatherIcon(weatherData.weather[0].description)}
            </div>

            {/* Displaying City Name */}
            <h2 className="text-lg font-semibold mb-1 -mt-3">
              {weatherData.name}
            </h2>

            {/* Displaying the weather description */}
            <p className="text-md capitalize mb-3">
              {weatherData.weather[0].description}
            </p>

            {/* Displaying the temperature */}
            <p className="text-4xl font-bold mb-2">{weatherData.main.temp}°C</p>

            {/* Displaying humidity */}
            <p className="text-sm">Humidity: {weatherData.main.humidity}%</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Menu Cards Section (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-4 max-w-lg w-full">
        <MenuCard
          title="Rain Page"
          description="Lluvias para los próximos 7 días"
          scrollTo={() => scrollToSection(plujaRef)}
        />
        <MenuCard
          title="Temperature Page"
          description="Condiciones actuales"
          scrollTo={() => scrollToSection(tempRef)}
        />
        <MenuCard
          title="Pronóstico 3"
          description="Alertas meteorológicas"
          scrollTo={() => scrollToSection(vegetacioRef)}
        />
        <MenuCard
          title="Pronóstico 4"
          description="Evolución del clima"
          scrollTo={() => scrollToSection(indiceRef)}
        />
      </div>
    </div>
  );
};

export default MainCards;
