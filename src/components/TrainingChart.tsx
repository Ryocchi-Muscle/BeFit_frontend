import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import useTrainingData from "@/hooks/TrainingData";
import "chart.js/auto";
import aggregateWeeklyData from "./aggregateWeeklyData";
import { parseISO, addMonths, subMonths, startOfMonth, format } from "date-fns";
import { WeeklySummary } from "./aggregateWeeklyData";


interface Period {
  label: string;
  value: string;
}

const generatePeriods = (): Period[] => {
  let periods: Period[] = [];
  const today = new Date();
  const startPeriod = subMonths(startOfMonth(today), 3);
  const endPeriod = addMonths(startOfMonth(today), 3);

  for (let date = startPeriod; date <= endPeriod; date = addMonths(date, 2)) {
    const label = `${format(date, "yyyy/MM")} - ${format(
      addMonths(date, 1),
      "yyyy/MM"
    )}`;
    const value = format(date, "yyyy-MM-dd");
    periods.push({ label, value });
  }

  return periods;
};

const TrainingChart: React.FC = () => {
  const { data, isLoading, isError } = useTrainingData();
  const [periods, setPeriods] = useState<Period[]>(generatePeriods());
  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    periods[0].value
  );
  const filteredData =
    data?.filter((record) => {
      const recordDate = parseISO(record.date);
      const startDate = parseISO(selectedPeriod);
      const endDate = addMonths(startDate, 2); // 2ヶ月後
      return recordDate >= startDate && recordDate < endDate;
    }) ?? [];

  console.log("data", data);

  const weeklyData: WeeklySummary[] = aggregateWeeklyData(filteredData);

  const chartData = {
    labels: weeklyData?.map((week) => week.weekStart),
    datasets: [
      {
        label: "週ごとのトレーニングボリューム",
        data: weeklyData.map((week) => week.totalWeight),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };
  console.log("chartData", chartData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <>
      <select
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(e.target.value)}
      >
        {periods.map(period => (
          <option key={period.value} value={period.value}>
            {period.label}
          </option>
        ))}
      </select>
      <Bar data={chartData} />
    </>
  );
};

export default TrainingChart;
