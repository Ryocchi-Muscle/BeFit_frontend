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

const RecordPage: React.FC = () => {
  const { data: session } = useSession();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "training";
  // スクロールを防止するカスタムフックを呼び出す
  usePreventScroll();
  const [startProgramFunc, setStartProgramFunc] = useState<any>(null);

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

  if (error) {
    if (error instanceof FetchError) {
      return <div>エラーが発生しました: {error.info.message}</div>;
    }
    return <div>エラーが発生しました</div>;
  }
  if (!programData) return <div>読み込み中...</div>;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div className="flex-grow relative">
        <Tabs defaultValue={defaultTab} className="w-full">
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
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default RecordPage;
