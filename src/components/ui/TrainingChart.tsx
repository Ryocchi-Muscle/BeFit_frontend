// import React, { useEffect, useState } from "react";
// import { Bar, Doughnut } from "react-chartjs-2";
// import axios from "axios";
// import "chart.js/auto";
// import { useSession } from "next-auth/react";
// import useSWR from "swr";

// interface ChartDataProps {
//   date: string;
// }

// interface ChartData {
//   labels: string[];
//   datasets: {
//     label: string;
//     data: number[];
//     backgroundColor: string;
//     borderColor: string;
//     borderWidth: number;
//   }[];
// }

// const fetcher = (url: string, accessToken: string) =>
//   axios
//     .get(url, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//     .then((res) => res.data);

// const TrainingChart: React.FC<ChartDataProps> = ({ date }) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const { data: session } = useSession();
//   const endpoint = `${apiUrl}/api/v2/training_records/weekly_summary?date=${date}`;
//   console.log("endpoint", endpoint);

//   console.log("session", session);

//   const { data, error } = useSWR(
//     session?.accessToken ? [endpoint, session.accessToken] : null,
//     fetcher,
//     {
//       onSuccess: (data) => {
//         console.log("Data fetched successfully:", data);
//       },
//     }
//   );

//   const chartData = {
//     labels: ["Total Weight"],
//     datasets: data
//       ? [
//           {
//             label: "Weekly Training Volume",
//             data: [data.total_weight],
//             backgroundColor: "rgba(53, 162, 235, 0.5)",
//             borderColor: "rgba(53, 162, 235, 1)",
//             borderWidth: 1,
//           },
//         ]
//       : [],
//   };

//   if (error) return <div>Failed to load data!</div>;
//   if (!data) return <div>Loading...</div>;

//   return <Bar data={chartData} />;
// };

// export default TrainingChart;
