// import Image from "next/image";
import Image from "next/image";
import React from "react";


const ProgramCard: React.FC<{
  title: string;
  image: string;
  details?: string[];
}> = ({ title, image, details }) => (
  <div className="border border-gray-300 rounded-lg p-4 m-4 text-center max-w-lg">
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    {/* <Image
      src={image}
      alt={title}
      width={400}
      height={300}
      className="rounded-lg"
    /> */}
    {details && (
      <table className="w-full mt-4 border-collapse">
        <tbody>
          {details.map((detail, index) => (
            <tr key={index} className="border-t">
              <td className="p-2 text-left">{detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default ProgramCard;
