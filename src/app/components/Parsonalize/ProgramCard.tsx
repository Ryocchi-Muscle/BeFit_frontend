import Image from "next/image";
import React from "react";

const ProgramCard: React.FC<{
  title: string;
  image: string;
  details?: string[];
}> = ({ title, image, details }) => {
  return (
    <div
      className="border border-gray-300 rounded-lg p-6 mx-2 text-center shadow-lg bg-white"
      style={{ width: "330px" }}
    >
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      {details && (
        <ul className="list-none p-0 m-0">
          {details.map((detail, index) => (
            <li
              key={index}
              className="border-t py-2 text-left first:border-t-0 "
            >
              {detail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProgramCard;
