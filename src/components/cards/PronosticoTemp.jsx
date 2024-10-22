import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { WiDaySunny, WiCloud, WiSnow, WiThermometer } from "react-icons/wi"; // Icons for weather

const PronosticoTemp = () => {
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [riskAnalysis, setRiskAnalysis] = useState(""); // Store Cohere's response
  const [displayedText, setDisplayedText] = useState(""); // Typing effect text
  const [loading, setLoading] = useState(false); // Show loading state during API request
  const [isModalOpen, setIsModalOpen] = useState(false); // Control the modal popup
  const scrollRef = useRef(null);

  const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        setForecastData(response.data.list); // Forecast data in 3-hour intervals
      } catch (err) {
        setError("Error fetching weather data.");
      }
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
  }, [WEATHER_API_KEY]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollSpeed = 1;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    };

    const scrollInterval = setInterval(scroll, 30);
    return () => clearInterval(scrollInterval);
  }, []);

  // Function to map weather conditions to icons (focus on temperature)
  const getWeatherIcon = (forecast) => {
    const temp = forecast.main.temp;

    if (temp < 0) {
      return <WiSnow className="text-blue-400 text-4xl" />;
    } else if (temp >= 30) {
      return <WiThermometer className="text-red-400 text-4xl" />;
    } else if (temp >= 20 && temp < 30) {
      return <WiDaySunny className="text-yellow-400 text-4xl" />;
    } else {
      return <WiCloud className="text-gray-400 text-4xl" />;
    }
  };

  // Handle risk analysis with Cohere using fetch
  const handleRiskAnalysis = async () => {
    setLoading(true);
    const prompt = generateRiskPrompt(forecastData);

    try {
      const response = await fetch("https://api.cohere.ai/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command-xlarge-nightly",
          prompt,
          max_tokens: 100,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      if (data.text) {
        setRiskAnalysis(data.text.trim());
        setIsModalOpen(true);
      } else {
        setRiskAnalysis("No response from the Cohere API.");
      }
    } catch (err) {
      setRiskAnalysis("Error generating risk analysis.");
    } finally {
      setLoading(false);
    }
  };

  // Typing effect for the risk analysis text
  useEffect(() => {
    if (isModalOpen && riskAnalysis) {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        setDisplayedText((prevText) => prevText + riskAnalysis[currentIndex]);
        currentIndex += 1;
        if (currentIndex >= riskAnalysis.length) {
          clearInterval(intervalId);
        }
      }, 50); // Adjust typing speed

      return () => clearInterval(intervalId);
    }
  }, [isModalOpen, riskAnalysis]);

  // Generate prompt for Cohere based on forecast data
  const generateRiskPrompt = (data) => {
    const weatherDetails = data.slice(0, 8).map((forecast) => {
      return `At ${new Date(forecast.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}, temperature will be ${Math.round(forecast.main.temp)}°C.`;
    });

    return `
      Analyze the following temperature forecast data and provide a concise 5-line risk assessment:

      ${weatherDetails.join("\n")}

      What should the user be worried about in terms of temperature, or should they not worry?
    `;
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setDisplayedText(""); // Clear the displayed text when closing modal
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full mt-8">
      <div
        className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide"
        ref={scrollRef}
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
                {getWeatherIcon(forecast)}
              </div>
              {/* Displaying temperature */}
              <p className="text-lg font-bold">
                {Math.round(forecast.main.temp)}°C
              </p>
            </div>
          ))
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>

      {/* Risk Analysis Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleRiskAnalysis}
          className="btn bg-red-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Temperature Risk"}
        </button>
      </div>

      {/* Modal for Risk Analysis */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center animate-fade-in">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative animate-modal-popup">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={closeModal}
            >
              ✖
            </button>
            <h3 className="text-lg font-bold mb-4">
              Temperature Risk Analysis
            </h3>
            <p className="text-gray-800">{displayedText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PronosticoTemp;
