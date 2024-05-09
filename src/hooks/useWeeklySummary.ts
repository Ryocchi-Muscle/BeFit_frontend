import useSWR from "swr";

interface WeeklySummary {
  [key: string]: number;
}

const fetchTrainingData = (url: string) => fetch(url).then((res) => res.json());
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const useWeeklySummary = (startDate: string) => {
  const { data, error } = useSWR<WeeklySummary>(
    `${apiUrl}/api/v2/training_records/weekly_summary?start_date=${startDate}`,
    fetchTrainingData
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useWeeklySummary;
