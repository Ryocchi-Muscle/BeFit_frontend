// import React, { useEffect, useState } from "react";

// type WeekSelectorProps = {
//   onWeekSelected: (week: string) => void;
//   initialDate: string;
// };

// const WeekSelector = ({ onWeekSelected, initialDate }: WeekSelectorProps) => {
//   const [selectedWeek, setSelectedWeek] = useState(initialDate);

//   const weeks = Array.from({ length: 5 }, (_, i) => {
//     const baseDate = new Date();
//     const start = new Date(
//       baseDate.setDate(baseDate.getDate() - baseDate.getDay() - 28 + i * 7)
//     );
//     const end = new Date(start.getTime());
//     end.setDate(start.getDate() + 6);
//     return `${start.toISOString().split("T")[0]} ~ ${
//       end.toISOString().split("T")[0]
//     }`;
//   }).reverse();

//   useEffect(() => {
//     if (selectedWeek) {
//       onWeekSelected(selectedWeek.split("~")[0].trim());
//     }
//   }, [selectedWeek, onWeekSelected]);

//   return (
//     <select
//       onChange={(e) => setSelectedWeek(e.target.value)}
//       value={selectedWeek}
//     >
//       {weeks.map((week) => (
//         <option key={week} value={week}>
//           {week}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default WeekSelector;
