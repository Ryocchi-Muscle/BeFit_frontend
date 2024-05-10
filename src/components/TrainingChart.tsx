import React from "react";
import { Bar } from "react-chartjs-2";
import useTrainingData from "@/hooks/TrainingData";
import "chart.js/auto";

const TrainingChart = () => {
  const { data, isLoading, isError } = useTrainingData();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  console.log("data", data);
  const chartData = {
    labels: data?.map((record) => record.date) || [],
    datasets: [
      {
        label: "Total Weight by Day",
        data: data?.map((record) => record.total_weight) || [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  console.log("chartData", chartData);
  return <Bar data={chartData} />;
};

export default TrainingChart;
