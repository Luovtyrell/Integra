import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

const PronosticoVeg = () => {
  const [vegetationData, setVegetationData] = useState(null); // Store the GeoJSON NDVI data
  const [riskAnalysis, setRiskAnalysis] = useState(""); // Store the AI's risk analysis response
  const [displayedText, setDisplayedText] = useState(""); // Typing effect text
  const [loading, setLoading] = useState(false); // Show loading state during API request
  const [error, setError] = useState(null); // Handle errors
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal for displaying the analysis

  const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;

  useEffect(() => {
    // Fetch vegetation data (NDVI GeoJSON) from the root of the public folder
    const fetchVegetationData = async () => {
      try {
        const response = await axios.get(
          "/2017_vegetacio_with_coordinates.geojson"
        );
        setVegetationData(response.data);
      } catch (err) {
        setError("Error fetching vegetation data.");
      }
    };

    fetchVegetationData();
  }, []);

  // Function to set color based on NDVI value (higher = healthier vegetation)
  const getColorByNDVI = (percNDVINo) => {
    return percNDVINo > 0.5
      ? "#008000" // Healthy (green)
      : percNDVINo > 0
      ? "#FFFF00" // Moderate (yellow)
      : "#FF0000"; // Stressed (red)
  };

  // Use pointToLayer to customize markers (for point geometries)
  const pointToLayer = (feature, latlng) => {
    const percNDVINo = feature.properties.PercNDVINo;
    return L.circleMarker(latlng, {
      radius: 8,
      fillColor: getColorByNDVI(percNDVINo),
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.7,
    });
  };

  // Handle vegetation risk analysis with Cohere AI
  const handleRiskAnalysis = async () => {
    setLoading(true);
    const prompt = generateRiskPrompt(vegetationData);

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
          max_tokens: 200,
          temperature: 0.8,
        }),
      });

      const data = await response.json();
      if (data.text) {
        setRiskAnalysis(data.text.trim());
        setIsModalOpen(true); // Open modal
      } else {
        setRiskAnalysis("No response from the Cohere API.");
      }
    } catch (err) {
      setRiskAnalysis("Error generating risk analysis.");
    } finally {
      setLoading(false);
    }
  };

  // Generate prompt for Cohere based on vegetation data (NDVI values)
  const generateRiskPrompt = (data) => {
    const vegetationSummary = data.features
      .map((feature, index) => {
        const percNDVINo = feature.properties.PercNDVINo;
        const neighborhood = `Area ${index + 1}`; // This can be replaced with actual neighborhood names if available
        return `In ${neighborhood}, the NDVI value is ${percNDVINo}, indicating that the vegetation is ${
          percNDVINo > 0.5
            ? "healthy"
            : percNDVINo > 0
            ? "moderate"
            : "stressed"
        }.`;
      })
      .join("\n");

    return `
      Analyze the following NDVI data for Barcelona and provide a descriptive risk assessment, mentioning the health of vegetation in specific areas:
      ${vegetationSummary}
    `;
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
    setRiskAnalysis("");
    setDisplayedText(""); // Clear displayed text for next time
  };

  // Display the GeoJSON features on the map
  const onEachFeature = (feature, layer) => {
    const percNDVINo = feature.properties.PercNDVINo;

    // Only apply setStyle if the feature is not a point
    if (feature.geometry.type !== "Point") {
      layer.setStyle({
        fillColor: getColorByNDVI(percNDVINo),
        weight: 1,
        color: "#000",
        fillOpacity: 0.7,
      });
    }

    layer.bindPopup(`NDVI: ${percNDVINo}`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full mt-8">
      {/* Conditionally render the map only if the modal is not open */}
      {!isModalOpen && vegetationData && (
        <MapContainer
          center={[41.3851, 2.1734]} // Coordinates of Barcelona
          zoom={14} // Start more zoomed in
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON
            data={vegetationData}
            onEachFeature={onEachFeature}
            pointToLayer={pointToLayer} // Add pointToLayer to handle point geometries
          />
        </MapContainer>
      )}

      {/* Risk Analysis Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleRiskAnalysis}
          className="btn bg-red-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Vegetation Risk"}
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
            <h3 className="text-lg font-bold mb-4">Vegetation Risk Analysis</h3>
            <p className="text-gray-800">{displayedText}</p>{" "}
            {/* Typing effect text */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PronosticoVeg;
