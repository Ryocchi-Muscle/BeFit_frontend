"use client";
import Footer from "@/app/components/layout/Footer";
import React, { useEffect, useState } from "react";
import TrainingChart from "@/components/TrainingChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import StepFourComponent from "@/app/components/Program/StepFourComponent";
import NoProgramComponent from "@/app/components/Program/NoProgramComponent";
import { fetcher } from "@/utils/fetcher";
import { FetchError } from "@/utils/errors";
import useSWR from "swr";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import StartProgramHandler from "@/app/components/Program/StartProgramHandler";
import usePreventScroll from "@/hooks/usePreventScroll";
import Skeleton from "@/components/skeleton";
import CustomDialog from "@/app/components/Program/CustomDialog";
import ProgramTrainingMenuDialog from "@/app/components/Program/ProgramTrainingMenuDialog";

const RecordPage: React.FC = () => {
  const { data: session } = useSession();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [completedPrograms, setCompletedPrograms] = useState<number[]>([]);
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "training";
  // スクロールを防止するカスタムフックを呼び出す
  usePreventScroll();
  const [startProgramFunc, setStartProgramFunc] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDailyProgramId, setCurrentDailyProgramId] = useState<
    number | null
  >(null);
  const [currentProgramDate, setCurrentProgramDate] = useState<Date | null>(
    null
  );
  const [currentProgram, setCurrentProgram] = useState<any>(null);

  const fetchWithToken = (url: string) =>
    fetcher(url, session?.accessToken as string);

  const {
    data: programData,
    error,
    mutate,
  } = useSWR(
    session?.accessToken
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v2/personalized_menus`
      : null,
    fetchWithToken
  );

  useEffect(() => {
    if (programData && programData.program) {
      const completedIds = programData.program.daily_programs
        .filter((program: any) => program.completed)
        .map((program: any) => program.id);
      setCompletedPrograms(completedIds);
    }
  }, [programData]);

  const handleComplete = async (dailyProgramId: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await axios.patch(
        `${apiUrl}/api/v2/personalized_menus/${dailyProgramId}/save_daily_program`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      setCompletedPrograms((prev) => [...prev, dailyProgramId]);
    } catch (error) {
      console.error("Failed to complete the daily program: ", error);
    }
  };

  const handleSave = async (dailyProgramId: number, programDetails: any) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await axios.patch(
        `${apiUrl}/api/v2/personalized_menus/${dailyProgramId}/update`,
        { details: programDetails },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      // 編集後のデータを取得するためにSWRの再検証をトリガー
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
    return <div className="pt-8">エラーが発生しました</div>;
  }
  if (!programData)
    return (
      <div className="pt-8">
        <Skeleton />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen overflow-hidden ">
      <div className="flex-grow relative">
        <Tabs defaultValue={defaultTab} className="w-full ">
          <div className="pt-8 flex justify-center">
            <TabsList className=" fixed justify-center inline-flex p-1 bg-gray-200 rounded-md z-10">
              <TabsTrigger
                value="training"
                className="py-2 px-4 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                トレーニング記録
              </TabsTrigger>
              <TabsTrigger
                value="program"
                className="py-2 px-4 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                プログラム管理
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="pt-4">
            <TabsContent value="training" className="p-4">
              <h1 className="text-3xl font-bold text-blue-950">記録</h1>
              <TrainingChart />
            </TabsContent>
            <TabsContent
              value="program"
              className="flex justify-center p-0 min-h-screen relative"
            >
              <div className="flex flex-col items-center w-full max-w-3xl relative pt-5">
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
                      onComplete={handleComplete}
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
                    onSave={handleSave} // handleSave 関数を定義して渡します
                    gender={programData.program.gender} // programData から gender を渡します
                    frequency={programData.program.frequency} // programData から frequency を渡します
                    isCompleted={completedPrograms.includes(
                      currentDailyProgramId
                    )} // 追加
                  />
                )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default RecordPage;
