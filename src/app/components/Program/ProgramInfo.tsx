import React from "react";
import { Program } from "types/types";

interface ProgramInfoComponentProps {
  program: Program;
  onDelete: () => void;
}

const ProgramInfoComponent: React.FC<ProgramInfoComponentProps> = ({
  program,
  onDelete,
}) => {
  return (
    <div className="program-info">
      <h2 className="text-xl font-semibold mb-4">プログラム情報</h2>
      <p>{program.title}</p>
      <ul>
        {program.daily_programs &&
          program.daily_programs.map((dailyProgram, index) => (
            <li key={index}>
              <h3 className="font-bold">
                Week {dailyProgram.week}, Day {dailyProgram.day}
              </h3>
              <ul>
                {dailyProgram.details.map((detail, detailIndex) => (
                  <li key={detailIndex}>
                    {detail.menu}: {detail.set_info}
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
      <button
        onClick={onDelete}
        className="px-4 py-2 bg-red-500 text-white rounded-md"
      >
        プログラムを削除する
      </button>
    </div>
  );
};

export default ProgramInfoComponent;
