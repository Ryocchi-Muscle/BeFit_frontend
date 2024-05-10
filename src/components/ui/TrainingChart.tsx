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
import { parseISO, startOfWeek, format } from 'date-fns';

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
      limits: {
        x: { min: "2024-01-01", max: "2024-03-31" }, // 3ヶ月間の制限
        minRange: 7 * 24 * 60 * 60 * 1000, // 最小ズーム範囲を1週間に設定
      },
      pan: {
        enabled: true,
        mode: "x",
        rangeMin: {
          x: new Date("2024-01-01").getTime(), // パンの最小限界
        },
        rangeMax: {
          x: new Date("2024-03-31").getTime(), // パンの最大限界
        },
      },
      zoom: {
        wheel: {
          enabled: true, // マウスホイールでのズームを有効化
        },
        pinch: {
          enabled: true, // ピンチでのズームを有効化 (タッチデバイス用)
        },
        mode: "x", // 'x' 軸方向にズーム
      },
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "week",
        min: "2024-01-01",
        max: "2025-12-31",
      },
    },
  },
};

const WeeklySummaryChart = () => {
  const { data, isLoading, isError } = useTrainingData();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const chartData = {
    labels: data?.map((record) => {
      const date = parseISO(record.date);
      const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
      return format(startOfWeekDate, "yyyy-MM-dd");
    }),
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
