import Image from "next/image";
import React from "react";

const ProgramCard: React.FC<{
  title: string;
  image: string;
  details?: string[];
}> = ({ title, image, details }) => {
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
    </div>
  );
};

export default ProgramCard;
