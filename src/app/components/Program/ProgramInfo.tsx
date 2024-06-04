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
        {program.details &&
          program.details.map((detail, index) => (
            <li key={index}>
              {detail.menu}: {detail.set_info}
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
