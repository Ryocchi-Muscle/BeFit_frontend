import React from "react";
import { useRouter } from "next/navigation";

const NoProgramComponent: React.FC = () => {
  const router = useRouter();

  const handleCreateProgram = () => {
    router.push("/category/parsonalize");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-xl font-semibold mb-4">
        プログラムが作成されていません
      </h2>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleCreateProgram}
      >
        プログラムを作成する
      </button>
    </div>
  );
};

export default NoProgramComponent;
