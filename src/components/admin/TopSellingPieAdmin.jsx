import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TopSellingPieAdmin = ({ pieData }) => {
  const [labels, setLabels] = useState([]);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    setLabels(pieData.map((item) => item.name));
    setDatas(pieData.map((item) => item.percentage));
  }, [pieData]);

  const data = {
    labels,
    datasets: [
      {
        label: "Top Sales Percentage",
        data: datas,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Hide the default legend
      },
    },
  };

  return (
    <div className="flex items-center justify-center ">
      {/* Pie chart on the left */}
      <div className="w-[47%]">
        <Pie data={data} options={options} />
      </div>
      {/* Custom legend on the right */}
      <div className="w-[53%] pl-8">
        <p className="text-xl font-semibold text-blue-700 mb-4">
          Top Selling Items
        </p>
        <ul className="space-y-2">
          {labels.map((label, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span
                className="w-4 h-4"
                style={{
                  backgroundColor: data.datasets[0].backgroundColor[index],
                }}
              ></span>
              <span className="text-sm">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopSellingPieAdmin;
