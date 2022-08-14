import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";

function HistoryChart({ chartData }) {
  const chartRef = useRef();
  const { day, week, year, data } = chartData;
  const [timeFormat, setTimeFormat] = useState("24h");

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  useEffect(() => {
    if (chartRef && chartRef.current && data) {
      const chartInstance = new Chart(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${data.name} price`,
              data: determineTimeFormat(),
              backgroundColor: "rgba(39, 193, 245, 0.8)",
              borderColor: "rgba(39, 193, 245, 0.8)",
              pointRadius: 0.1,
              fill: "start",
            },
          ]
        },
        options: {
          plugins: {
            legend: {
                display: false
            },
          },
          lineHeightAnnotation: {
            always: true,
            hover: false,
            lineWeight: 1.5,
          },
          animation: {
            duration: 2000,
          },
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: {
              type: "time",
              
            },
          },
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  });

  return (
    <div>
      <div className="chart-buttons">
        <button onClick={() => setTimeFormat("24h")} className="btn btn24">
          1D
        </button>
        <button onClick={() => setTimeFormat("7d")} className="btn btn7">
          7D
        </button>
        <button onClick={() => setTimeFormat("1y")} className="btn btn1">
          1Y
        </button>
      </div>
      <div className="chart-container">
        <canvas
          ref={chartRef}
          className="chart"
          width={250}
          height={250}
        ></canvas>
      </div>
    </div>
  );
}

export default HistoryChart;
