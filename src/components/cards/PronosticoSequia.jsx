import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const PronosticoSequia = () => {
  const [droughtData, setDroughtData] = useState(null); // Store the GeoJSON drought data
  const [riskAnalysis, setRiskAnalysis] = useState(""); // Store AI risk analysis response
  const [displayedText, setDisplayedText] = useState(""); // Typing effect for the AI response
  const [loading, setLoading] = useState(false); // Show loading state during API request
  const [error, setError] = useState(null); // Handle errors
  const [isModalOpen, setIsModalOpen] = useState(false); // Control the modal for displaying the analysis

  const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;

  // Fetch drought data from the updated GeoJSON file
  useEffect(() => {
    const fetchDroughtData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "/gradual_drought_zones_barcelona.geojson" // Path to the updated GeoJSON file
        );
        setDroughtData(response.data);
      } catch (err) {
        setError("Error fetching drought data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDroughtData();
  }, []);

  // Function to set color based on drought severity levels
  const getColorByDroughtLevel = (severity) => {
    return severity === "Extreme"
      ? "#FF0000" // Extreme (Red)
      : severity === "Severe"
      ? "#FF9900" // Severe (Orange)
      : severity === "Moderate"
      ? "#FFFF00" // Moderate (Yellow)
      : "#00FF00"; // Mild or no drought (Green)
  };

  // Display the GeoJSON features on the map
  const onEachFeature = (feature, layer) => {
    const severity = feature.properties.drought_severity; // Assuming severity is in properties
    layer.setStyle({
      fillColor: getColorByDroughtLevel(severity),
      weight: 1,
      color: "#000",
      fillOpacity: 0.4, // Make the polygons more transparent
    });

    layer.bindPopup(`Drought Severity: ${severity}`);
  };

  // Generate prompt for AI risk analysis based on drought data
  const generateRiskPrompt = (data) => {
    const droughtSummary = data.features
      .map((feature, index) => {
        return `In area ${index + 1}, the drought severity is ${
          feature.properties.drought_severity
        }.`;
      })
      .join("\n");

    return `
      Analyze the following drought data for Barcelona and provide a concise 5-line risk assessment:
      ${droughtSummary}
    `;
  };

  // Handle drought risk analysis with AI
  const handleRiskAnalysis = async () => {
    setLoading(true);
    const prompt = generateRiskPrompt(droughtData);

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
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      if (data.text) {
        setRiskAnalysis(data.text.trim());
        setIsModalOpen(true); // Open modal for risk analysis
      } else {
        setRiskAnalysis("No response from the AI API.");
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

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setDisplayedText(""); // Clear displayed text for next time
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full mt-8">
      {/* Conditionally hide the map when modal is open */}
      {!isModalOpen && droughtData && (
        <MapContainer
          center={[41.3851, 2.1734]} // Coordinates of Barcelona
          zoom={12} // Adjust zoom level as needed
          style={{ height: "600px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={droughtData} onEachFeature={onEachFeature} />
        </MapContainer>
      )}

      {/* Risk Analysis Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleRiskAnalysis}
          className="btn bg-red-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Drought Risk"}
        </button>
      </div>

      {/* Modal for Risk Analysis */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={closeModal}
            >
              ✖
            </button>
            <h3 className="text-lg font-bold mb-4">Drought Risk Analysis</h3>
            <p className="text-gray-800">{displayedText}</p>{" "}
            {/* Typing effect text */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PronosticoSequia;
