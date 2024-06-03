import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface ProgramDetails {
  menu: string;
  set_info: string;
}

interface ProgramCardProps {
  week: number;
  day: number;
  details?: ProgramDetails[];
  onStart: () => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  week,
  day,
  details,
  onStart,
}) => {
  return (
    <div onClick={onStart} className="program-card">
      <div
        className="border border-gray-300 rounded-lg p-6 mx-3 text-center shadow-lg bg-white "
        style={{
          width: "100%",
          maxWidth: "330px",
          height: "400px",
          overflowY: "auto",
        }}
      >
        <h3 className="text-lg font-bold mb-2">{`Week ${week} Day ${day}`}</h3>
        {details && (
          <Table>
            <TableBody>
              {details.map((detail, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold text-black">
                      {detail.menu}
                    </TableCell>
                  </TableRow>
                  {detail.set_info && (
                    <TableRow>
                      <TableCell colSpan={2} className="text-gray-500">
                        {detail.set_info}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}
        <button
          onClick={onStart}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg"
        >
          プログラムをスタートする
        </button>
      </div>
    </div>
  );
};
export default ProgramCard;
