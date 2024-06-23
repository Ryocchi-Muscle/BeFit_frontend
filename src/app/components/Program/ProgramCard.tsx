import React, { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DailyProgram } from "types/types";
import { isProgramAlreadyCompletedForDate } from "@/app/utils/utils";
import { useSession } from "next-auth/react";
import CustomDialog from "@/app/components/Program/CustomDialog";

interface ProgramCardProps {
  week: number;
  dailyProgram: DailyProgram;
  onStart: () => void;
  isCompleted: boolean;
  setShowCustomDialog: (show: boolean) => void;
  setDialogMessage: (message: string) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  week,
  dailyProgram,
  onStart,
  isCompleted,
  setShowCustomDialog,
  setDialogMessage,
}) => {
  const { data: session } = useSession();
  const completedStyle = isCompleted
    ? "bg-blue-500 text-white"
    : "bg-white text-black";

  const handleStartClick = async () => {
    const date = new Date().toISOString().split("T")[0]; // 現在の日付を取得
    const isCompleted = await isProgramAlreadyCompletedForDate(
      date,
      dailyProgram.id,
      session?.accessToken as string
    );
    console.log("isCompleted: ", isCompleted);

    if (isCompleted) {
      setDialogMessage(
        "プログラムは１日１つしかできません。\n次のトレーニングのために体力を温存しましょう！"
      );
      setShowCustomDialog(true);
      return;
    }
    onStart();
  };
  return (
    <div className={`program-card ${completedStyle} flex justify-center`}>
      <div
        className="border border-gray-300 rounded-lg p-6 mx-3 text-center shadow-lg bg-white "
        style={{
          width: "100%",
          maxWidth: "330px",
          height: "400px",
          overflowY: "auto",
        }}
      >
        {isCompleted && (
          <>
            <div className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg">
              プログラム完了済み
            </div>
          </>
        )}
        {dailyProgram && dailyProgram.details && (
          <>
            <h3 className="font-poppins font-bold text-xl">{`Week ${week}  Day ${dailyProgram.day}`}</h3>
            <Table>
              <TableBody>
                {dailyProgram.details.map((detail, index) => (
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
          </>
        )}
        {!isCompleted && (
          <>
            <button
              onClick={handleStartClick}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg"
            >
              プログラムをスタートする
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgramCard;
