import { startOfWeek, parseISO, format } from "date-fns";

interface TrainingRecord {
  id: number;
  date: string;
  total_weight: number;
}

export interface WeeklySummary {
  weekStart: string;
  totalWeight: number;
  count: number;
}

const aggregateWeeklyData = (data: TrainingRecord[]): WeeklySummary[] => {
  const weeklyData: Record<string, WeeklySummary> = {};
  data.forEach((record) => {
    const date = parseISO(record.date);
    const weekStart = startOfWeek(date, { weekStartsOn: 0 });
    const formattedWeekStart = format(weekStart, "yyyy-MM-dd");

    if (!weeklyData[formattedWeekStart]) {
      weeklyData[formattedWeekStart] = {
        weekStart: formattedWeekStart,
        totalWeight: 0,
        count: 0,
      };
    }
    weeklyData[formattedWeekStart].totalWeight += record.total_weight;
    weeklyData[formattedWeekStart].count += 1;
  });
  return Object.values(weeklyData).sort((a, b) =>
    a.weekStart.localeCompare(b.weekStart)
  );
};

export default aggregateWeeklyData;
