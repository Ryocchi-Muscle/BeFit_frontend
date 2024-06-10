import React from "react";
import { Program, DailyProgram } from "types/types";
import ProgramCard from "./ProgramCard";

interface ProgramInfoComponentProps {
  program: Program;
  onDelete: () => void;
}

const ProgramInfoComponent: React.FC<ProgramInfoComponentProps> = ({
  program,
  onDelete,
}) => {
  if (!program) {
    return <div>プログラムデータが見つかりません。</div>;
  }
  console.log("ProgramInfoComponent program:", program);
  console.log("ProgramInfoComponent daily_programs:", program.daily_programs);

  return (
    <div className="program-info">
      <h2 className="text-xl font-semibold mb-4">プログラム情報</h2>
      <div className="flex flex-wrap">
        {program.daily_programs && program.daily_programs.length > 0 ? (
          program.daily_programs.map(
            (dailyProgram: DailyProgram, index: number) => (
              <ProgramCard
                key={index}
                dailyProgram={dailyProgram}
                onStart={() => {}}
              />
            )
          )
        ) : (
          <p>プログラムが見つかりません</p>
        )}
      </div>
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
