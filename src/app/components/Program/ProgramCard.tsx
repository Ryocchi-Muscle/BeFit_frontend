import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DailyProgram } from "types/types";
import { isProgramAlreadyCompletedForDate } from "@/app/utils/utils";
import { useSession } from "next-auth/react";

interface ProgramCardProps {
  week: number;
  dailyProgram: DailyProgram;
  onStart: () => void;
  isCompleted: boolean;
  setShowCustomDialog: (show: boolean) => void;
  setDialogMessage: (message: string) => void;
  openTrainingMenuDialog: (
    dailyProgramId: number,
    week: number,
    day: number
  ) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  week,
  dailyProgram,
  onStart,
  isCompleted,
  setShowCustomDialog,
  setDialogMessage,
  openTrainingMenuDialog,
}) => {
  const { data: session } = useSession();
  const completedStyle = isCompleted
    ? "relative bg-white text-black"
    : "bg-white text-black";
  // const today = new Date().toISOString().split("T")[0]; //後で使うかもしれない
  // const programDate = dailyProgram.date;

  const handleStartClick = async () => {
    const date = new Date().toISOString().split("T")[0];

    const isCompleted = await isProgramAlreadyCompletedForDate(
      date,
      dailyProgram.id,
      session?.accessToken as string
    );
    console.log("isCompleted: ", isCompleted);

    if (isCompleted) {
      setDialogMessage(
        "プログラムは１日１つしかできません。\n次のトレーニングのために体力を温存しましょう!"
      );
      setShowCustomDialog(true);
      return;
    }
    onStart();
  };

  const handleEditClick = () => {
    openTrainingMenuDialog(dailyProgram.id, week, dailyProgram.day);
  };

  if (isCompleted) {
    return (
      <div
        className="program-card relative flex flex-col items-center bg-white text-black"
        style={{ height: "500px" }}
      >
        <div
          className="border border-gray-300 rounded-lg p-6 mx-3 text-center shadow-lg bg-white relative flex flex-col items-center justify-center"
          style={{
            width: "100%",
            maxWidth: "330px",
            height: "400px",
            overflowY: "auto",
          }}
        >
          <h3 className="font-poppins font-bold text-xl">The Program done!</h3>
          <p className="mb-10">このトレーニングは完了しました！</p>
          <div className="mt-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-purple-500 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <button
            onClick={handleEditClick}
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg"
          >
            記録を編集する
          </button>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`program-card ${completedStyle} flex flex-col items-center relative`}
      style={{ height: "500px" }}
    >
      <div
        className="border border-gray-300 rounded-lg p-6 mx-3 text-center shadow-lg bg-white relative"
        style={{
          width: "100%",
          maxWidth: "330px",
          height: "400px",
          overflowY: "auto",
        }}
      >
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
      </div>
      {!isCompleted && (
        <button
          onClick={handleStartClick}
          className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-lg mb-10 z-10"
        >
          プログラムをスタートする
        </button>
      )}
    </div>
  );
};

export default ProgramCard;
