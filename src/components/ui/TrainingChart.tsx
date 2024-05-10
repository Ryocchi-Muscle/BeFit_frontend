import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";
import useTrainingData from "@/hooks/TrainingData";

// Chart.js とそのプラグインを登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const options = {
  responsive: true,
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: "x",
      },
      zoom: {
        wheel: {
          enabled: true, // マウスホイールでのズームを有効化
        },
        pinch: {
          enabled: true, // ピンチでのズームを有効化 (タッチデバイス用)
        },
        mode: (chart: any) => {
          return "x";
        }, // 'x' 軸方向にズーム
      },
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "week",
        min: '2024-01-01',
        max: '2025-12-31',
      },
    },
  },
};

const WeeklySummaryChart = () => {
  const { data, isLoading, isError } = useTrainingData();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const chartData = {
    labels: data?.map((record) => record.date) || [],
    datasets: [
      {
        label: "Total Weight by Body Part",
        data: data?.map((record) => record.total_weight) || [],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      },
    ],
  };
  return <Bar options={options as any} data={chartData} />;
};

export default WeeklySummaryChart;
