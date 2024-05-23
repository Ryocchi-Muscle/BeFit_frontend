import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const ProgramCard: React.FC<{
  title: string;
  image: string;
  details?: { menu: string; set_info: string; other: string }[];
}> = ({ title, details }) => {
  const parseDetail = (detail: string) => {
    const [menu, setInfo] = detail.split(": ");
    return { menu, setInfo };
  };
  return (
    <div
      className="border border-gray-300 rounded-lg p-6 mx-3 text-center shadow-lg bg-white "
      style={{
        width: "100%",
        maxWidth: "330px",
        height: "400px",
        overflowY: "auto",
      }}
    >
      <h3 className="text-lg font-bold mb-2">{title}</h3>
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
                {detail.other && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-gray-500">
                      {detail.other}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
export default ProgramCard;
