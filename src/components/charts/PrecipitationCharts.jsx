import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import jsonData from "../../Precipitacions_1950_2023_Any_Mes_Precipitacions.json";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PrecipitationChart = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchapi = async () => {
      const response = await fetch("http://10.63.0.111:8080/api/temp/historic");
      const data = await response.json();

      setApiData(data);
    };

    fetchapi();
  }, []);

  const averagePrecipitation = apiData.filter((entry, idx) => {
    if (idx % 6 === 0 || idx === jsonData.length - 1) {
      return entry;
    }
  });

  const data = {
    labels: averagePrecipitation.map((entry) => entry.year),
    datasets: [
      {
        label: "Precipitacions (mm)",
        data: averagePrecipitation.map((entry) => entry.avgYearTemp),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default PrecipitationChart;
