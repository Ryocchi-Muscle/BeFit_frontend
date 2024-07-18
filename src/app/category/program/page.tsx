"use client";
import Footer from "@/app/components/layout/Footer";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import StepFourComponent from "@/app/components/Program/StepFourComponent";
import NoProgramComponent from "@/app/components/Program/NoProgramComponent";
import { FetchError } from "@/utils/errors";
import useSWR from "swr";
import axios from "axios";
import StartProgramHandler from "@/app/components/Program/StartProgramHandler";
import usePreventScroll from "@/hooks/usePreventScroll";
import CustomDialog from "@/app/components/Program/CustomDialog";
import ProgramTrainingMenuDialog from "@/app/components/Program/ProgramTrainingMenuDialog";
import { fetchWithToken } from "@/utils/auth";

const RecordPage: React.FC = () => {
  const { data: session } = useSession();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [completedPrograms, setCompletedPrograms] = useState<number[]>([]);
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [startProgramFunc, setStartProgramFunc] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDailyProgramId, setCurrentDailyProgramId] = useState<
    number | null
  >(null);
  const [currentProgramDate, setCurrentProgramDate] = useState<Date | null>(
    null
  );
  const [currentProgram, setCurrentProgram] = useState<any>(null);
  usePreventScroll();

  const fetcher = async (url: string) => {
    try {
      const data = await fetchWithToken(
        url,
        async (url: string, token: string) => {
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Fetch response:", response); // フェッチのレスポンスを出力
          if (!response.ok) {
            throw new Error(
              `Network response was not ok: ${response.statusText}`
            );
          }
          return response.json();
        }
      );
      return data;
    } catch (error) {
      console.error("Fetcher error:", error); // フェッチエラーを出力
      throw error;
    }
  };

  const {
    data: programData,
    error,
    mutate,
  } = useSWR(
    session?.accessToken
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v2/personalized_menus`
      : null,
    fetcher
  );

  useEffect(() => {
    if (programData && programData.program) {
      const completedIds = programData.program.daily_programs
        .filter((program: any) => program.completed)
        .map((program: any) => program.id);
      setCompletedPrograms(completedIds);
    }
  }, [programData]);

  const handleSave = async (dailyProgramId: number, programDetails: any) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await axios.patch(
        `${apiUrl}/api/v2/personalized_menus/${dailyProgramId}`,
        { details: programDetails },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      mutate();
    } catch (error) {
      console.error("Failed to save the edited program: ", error);
    }
  };

  const handleDelete = async () => {
    if (!session?.accessToken) {
      console.error("セッションのアクセストークンがありません");
      return;
    }

    if (!programData || !programData.program) {
      console.error("プログラムデータが見つかりません");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${apiUrl}/api/v2/personalized_menus/${programData.program.id}`;
    console.log("API endpoint:", endpoint);

    try {
      const response = await axios.delete(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (response.status === 200) {
        mutate(); // SWRのキャッシュを無効にして再取得する
      } else {
        console.error("エラーが発生しました: ", response.data.message);
      }
    } catch (error) {
      console.error("エラーが発生しました: ", error);
    }
  };

  const handleDeleteButtonClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeleteDialogOpen(false);
    await handleDelete();
  };

  const handleStartProgram = (week: number, day: number) => {
    console.log("handleStartProgram called with week:", week, "day:", day);
    console.log("startProgramFunc", startProgramFunc);
    if (startProgramFunc) {
      startProgramFunc(week, day);
    }
  };

  const openTrainingMenuDialog = (
    dailyProgramId: number,
    week: number,
    day: number
  ) => {
    const program = programData.program.daily_programs.find(
      (p: any) => p.id === dailyProgramId
    );
    if (!program) return;

    setCurrentDailyProgramId(dailyProgramId);
    setCurrentProgramDate(new Date(program.date));
    setCurrentProgram(program);
    setIsDialogOpen(true);
  };

  const closeTrainingMenuDialog = () => {
    setIsDialogOpen(false);
  };

  if (error) {
    if (error instanceof FetchError) {
      return (
        <div className="pt-8">エラーが発生しました: {error.info.message}</div>
      );
    }
    signOut(); // 自動的にユーザーをログアウト
    // return <div className="pt-8">エラーが発生しました</div>;
  }

  return (
    <div
      className={`flex flex-col min-h-screen overflow-hidden ${
        !programData || !programData.program ? "" : "pt-8"
      }`}
    >
      <div className="flex-grow relative">
        <div className="flex justify-center p-0 min-h-screen relative">
          <div className="flex flex-col items-center w-full max-w-3xl relative">
            {programData && programData.program ? (
              <>
                <StepFourComponent
                  dailyPrograms={programData.program.daily_programs}
                  onDelete={handleDeleteButtonClick}
                  duration={programData.program.duration}
                  onStartProgram={handleStartProgram}
                  completedPrograms={completedPrograms}
                  setShowCustomDialog={setShowCustomDialog}
                  setDialogMessage={setDialogMessage}
                  openTrainingMenuDialog={openTrainingMenuDialog}
                />
                <StartProgramHandler
                  formData={{
                    frequency: programData.program.frequency,
                    gender: programData.program.gender,
                  }}
                  extendedProgram={programData.program.daily_programs}
                  onSetStartProgram={setStartProgramFunc}
                />
              </>
            ) : (
              <NoProgramComponent />
            )}
          </div>
          {isDeleteDialogOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg  w-[80%] max-w-m">
                <p>作成した全プログラムを本当に削除しますか？</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={handleConfirmDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    はい
                  </button>
                  <button
                    onClick={handleCloseDeleteDialog}
                    className="px-4 py-2 bg-gray-300 text-black rounded-md"
                  >
                    いいえ
                  </button>
                </div>
              </div>
            </div>
          )}
          {showCustomDialog && (
            <CustomDialog
              message={dialogMessage}
              onClose={() => setShowCustomDialog(false)}
            />
          )}
          {isDialogOpen &&
            currentDailyProgramId &&
            currentProgramDate &&
            currentProgram && (
              <ProgramTrainingMenuDialog
                open={isDialogOpen}
                onClose={closeTrainingMenuDialog}
                date={currentProgramDate}
                program={currentProgram.details}
                dailyProgramId={currentDailyProgramId}
                onSave={handleSave}
                gender={programData.program.gender}
                frequency={programData.program.frequency}
                isCompleted={completedPrograms.includes(currentDailyProgramId)}
              />
            )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecordPage;
