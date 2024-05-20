import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

const ProgramCard: React.FC<{
  title: string;
  image: string;
  details?: string[];
}> = ({ title, image, details }) => {
  const router = useRouter();

  const handleRecord = () => {
    // 記録ページに遷移し、プログラムデータを渡す
    router.push({
      pathname: "category/calender/page.tsx",
      query: { title, details: JSON.stringify(details) },
    });
  };
  return (
    <div className="border border-gray-300 rounded-lg p-6 m-4 text-center shadow-lg max-w-lg">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      {details && (
        <ul className="list-disc list-inside">
          {details.map((detail, index) => (
            <li key={index} className="border-t py-2 text-left">
              {detail}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleRecord}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        記録する
      </button>
    </div>
  );
};

export default ProgramCard;
