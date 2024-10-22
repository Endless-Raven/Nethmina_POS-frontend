import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesStaticsChartAdmin = ({ chartData }) => {
    const [labels, setLabels] = useState([]);
    const [sales, setSales] = useState([]);
  
    useEffect(() => {
      // Map the dates and sales from the salesData prop
      setLabels(chartData.map((item) => item.date));
      setSales(chartData.map((item) => item.sale));
    }, [chartData]);

    const data = {
        labels,
        datasets: [
          {
            label: "Sales",
            data: sales,
            fill: false, // Disable area under the line
            borderColor: "#36A2EB", // Line color
            backgroundColor: "#36A2EB", // Point background color
            tension: 0.1, // Curve tension for a smoother line
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false, // Turn off the display of the legend
          },
          title: {
            display: false,
            text: "Last Month Sales", // Chart title
          },
        },
        scales: {
          x: {
            title: {
              display: false,
              text: "Date", // X-axis label
            },
          },
          y: {
            title: {
              display: false,
              text: "Sales ($)", // Y-axis label
            },
            beginAtZero: false, // Start y-axis from 0
          },
        },
      };

  return (
    <Line data={data} options={options} />
  );
};

export default SalesStaticsChartAdmin;
