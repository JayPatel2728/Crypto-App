export const chartOptions = {
  plugins: {
    legend: {
      display: false,
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
};
