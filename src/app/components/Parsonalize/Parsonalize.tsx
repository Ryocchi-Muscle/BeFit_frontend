"use client";

import React, { useRef, useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import ProgramCard from "./ProgramCard";
import { useSession } from "next-auth/react";
import ProgramTrainingMenuDialog from "./ProgramTrainingMenuDialog";
import StartProgramDialog from "./StartProgramDialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type CarouselApi } from "@/components/ui/carousel";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";
import { MenuData } from "types/types";

interface Program {
  title: string;
  image: string;
  details: { menu: string; set_info: string; other: string }[];
  uniqueId: string;
}

interface ProgramDetail {
  menu: string;
  set_info: string;
  other: string;
}

const PersonalizePage: React.FC = () => {
  const { data: session } = useSession();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    gender: "",
    frequency: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);
  const [program, setProgram] = useState<Program[]>([]);
  const [extendedProgram, setExtendedProgram] = useState<Program[]>([]);
  const [isStartProgramDialogOpen, setIsStartProgramDialogOpen] =
    useState(false);
  const [isTrainingMenuDialogOpen, setIsTrainingMenuDialogOpen] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProgramDetails, setSelectedProgramDetails] = useState<ProgramDetail[]>([]);

  const [menuData, setMenuData] = useState<MenuData[]>([]);

  const handleSelect = (key: string, value: string | number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
    console.log("value", value);
    console.log("formData", { ...formData, [key]: value });
  };

  //APIを呼び出してプランを作成する
  const handlePlanCreation = async () => {
    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${apiUrl}/api/v2/personalized_menus`;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          gender: formData.gender,
          frequency: formData.frequency,
          duration: formData.duration,
        }),
      });
      console.log("response", response);
      if (!response.ok) {
        throw new Error("APIエラーが発生しました");
      }
      const data = await response.json();
      console.log("data", data);
      console.log("data.program", data.program);
      if (data && data.program) {
        setProgram(
          data.program.filter((item: Program) => item.details.length > 0)
        );
      } else {
        setProgram([]); // データが存在しない場合は空の配列を設定
      }
    } catch (error) {
      console.error("エラーが発生しました: ", error);
    } finally {
      setLoading(false);
      setStep(4);
    }
  };

  const handleConfirmStartProgram = () => {
    setIsStartProgramDialogOpen(false);
    setIsTrainingMenuDialogOpen(true);
  };

  const handleCloseStartProgramDialog = () => {
    setIsStartProgramDialogOpen(false);
  };

  const handleCloseTrainingMenuDialog = () => {
    setIsTrainingMenuDialogOpen(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
  };
  // useEffect フックを追加
  useEffect(() => {
    if (program.length > 0) {
      const frequency = parseInt(formData.frequency, 10); // トレーニング頻度を数値として取得
      const duration = parseInt(formData.duration, 10); // プログラム期間を数値として取得
      const totalProgramsNeeded = frequency * duration; // 必要なプログラムの総数

      // 必要なプログラムデータの数を満たすためにプログラムデータを補完
      const extendedProgramArray = Array.from(
        { length: totalProgramsNeeded },
        (_, i) => {
          const programIndex = i % program.length;
          return {
            ...program[programIndex],
            uniqueId: `${programIndex}-${i}`, // 各プログラムに一意のIDを追加
          };
        }
      );

      setExtendedProgram(extendedProgramArray); // ここで状態に設定
    }
  }, [program, formData.frequency, formData.duration]);

  const updateMenuData = (
    programDetails: { menu: string; set_info: string; other: string }[]
  ) => {
    const newMenuData = programDetails.map((detail, index) => {
      //set_info からセット数を抽出
      const setCountMatch = detail.set_info.match(/(\d+)セット/);
      console.log("setCountMatch", setCountMatch);
      const setCount = setCountMatch ? parseInt(setCountMatch[1], 10) : 1;
      console.log("setCount", setCount);

      const sets = Array.from({ length: setCount }, (_, i) => ({
        setId: i + 1,
        setContent: detail.set_info,
        weight: "",
        reps: "",
        completed: false,
      }));

      return {
        menuId: index + 1,
        menuName: detail.menu,
        body_part: "", // 後で設定
        sets: sets,
      };
    });
    setMenuData(newMenuData);
  };

  //特定の週と日のプログラムデータを設定し、記録用のダイアログを開く。
  const handleStartProgram = (week: number, day: number) => {
    // 特定のプログラムデータを設定
    const frequency = parseInt(formData.frequency, 10);
    const startIndex = (week - 1) * frequency + (day - 1);
    const programDetails = extendedProgram[startIndex].details;
    updateMenuData(programDetails);
    setSelectedProgramDetails(programDetails);
    setIsStartProgramDialogOpen(true);
  };

  // 週ごとのプログラムカードを生成する
  const generateProgramCards = (week: number) => {
    const programCards = [];
    const frequency = parseInt(formData.frequency, 10); // トレーニング頻度を数値として取得
    const startIndex = (week - 1) * frequency; // 現在の週の開始インデックス
    const endIndex = startIndex + frequency; // 現在の週の終了インデックス
    const duration = parseInt(formData.duration, 10); // プログラム期間を数値として取得
    const totalProgramsNeeded = frequency * duration; // 必要なプログラムの総数

    console.log("totalProgramsNeeded:", totalProgramsNeeded);
    console.log("program.length:", program.length);

    if (program.length === 0) {
      console.error("Program array is empty");
      return []; // 何も表示しない
    }

    // 必要なプログラムデータの数を満たすためにプログラムデータを補完
    const extendedProgramArray = Array.from(
      { length: totalProgramsNeeded },
      (_, i) => {
        const programIndex = i % program.length;
        return {
          ...program[programIndex],
          uniqueId: `${programIndex}-${i}`, // 各プログラムに一意のIDを追加
        };
      }
    );

    console.log("extendedProgram.length:", extendedProgram.length);
    console.log("extendedProgram:", extendedProgram);

    // ユニーク性の確認
    const uniqueIds = new Set(extendedProgramArray.map((p) => p.uniqueId));
    if (uniqueIds.size !== extendedProgramArray.length) {
      console.error("プログラムデータに重複があります");
    } else {
      console.log("プログラムデータはユニークです");
    }

    console.log("startIndex:", startIndex);
    console.log("endIndex:", endIndex);

    for (let day = startIndex; day < endIndex; day++) {
      console.log("day:", day);
      console.log("extendedProgram.length:", extendedProgramArray.length);

      // program 配列の day 番目の要素を直接使用
      const programDetails = extendedProgramArray[day]?.details || [];
      console.log("programDetails:", programDetails);

      programCards.push(
        <SwiperSlide key={`W${week}D${day - startIndex + 1}`}>
          <ProgramCard
            week={week}
            day={day - startIndex + 1}
            details={programDetails}
            onStart={() => handleStartProgram(week, day - startIndex + 1)}
          />
        </SwiperSlide>
      );
    }

    return programCards;
  };

  return (
    <div className="flex flex-col items-center p-0 min-h-screen overflow-y-auto">
      {loading && <LoadingScreen />}
      {!loading && (
        <>
          {step < 4 && (
            <div className="flex flex-col items-center justify-start min-h-[calc(100vh-70px)] pt-18">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center w-4/5 max-w-lg mt-0 space-y-6">
                <div>
                  <h2 className="text-blue-500 text-xl mb-2">性別</h2>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelect("gender", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="性別" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="male">男</SelectItem>
                        <SelectItem value="female">女</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h2 className="text-blue-500 text-xl mb-2">
                    トレーニング頻度（週）
                  </h2>
                  <Select
                    value={formData.frequency}
                    onValueChange={(value) => handleSelect("frequency", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="トレーニング頻度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">週1</SelectItem>
                        <SelectItem value="2">週2</SelectItem>
                        <SelectItem value="3">週3</SelectItem>
                        <SelectItem value="4">週4</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h2 className="text-blue-500 text-xl mb-2">プログラム期間</h2>

                  <Select
                    value={formData.duration.toString()}
                    onValueChange={(value) =>
                      handleSelect("duration", parseInt(value))
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="プログラム期間">
                        {formData.duration
                          ? `${formData.duration} 週間`
                          : "プログラム期間"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent style={{ top: "auto", bottom: "100%" }}>
                      <SelectGroup>
                        {Array.from({ length: 9 }, (_, i) => i + 4).map(
                          (week) => (
                            <SelectItem key={week} value={week.toString()}>
                              {week} 週間
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <button
                  className="mt-5 py-3 px-5 bg-blue-500 text-white border-none rounded-lg cursor-pointer"
                  onClick={handlePlanCreation}
                >
                  プラン作成
                </button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="fixed flex flex-col items-center justify-center pt-0 overflow-y-auto pb-20 w-full">
              <Tabs defaultValue="week1" className="w-full">
                <TabsList className="flex overflow-x-auto whitespace-nowrap space-x-4 px-4 pl-4">
                  <SimpleBar className="w-full" autoHide={false}>
                    {Array.from(
                      {
                        length: formData.duration
                          ? parseInt(formData.duration)
                          : 0,
                      },
                      (_, i) => (
                        <TabsTrigger
                          key={i}
                          value={`week${i + 1}`}
                          className="flex-shrink-0 min-w-[80px] px-4 py-2"
                        >
                          {`Week ${i + 1}`}
                        </TabsTrigger>
                      )
                    )}
                  </SimpleBar>
                </TabsList>
                <div className="relative">
                  <button
                    className="absolute top-4 left-4 flex items-center justify-center w-8 h-8 bg-white border border-gray-300 rounded-full shadow-lg z-10"
                    onClick={() => setStep(0)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 14.707a1 1 0 01-1.414 0L6.293 9.707a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L8.414 9l4.293 4.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {Array.from(
                  {
                    length: formData.duration ? parseInt(formData.duration) : 0,
                  },
                  (_, i) => (
                    <TabsContent key={i} value={`week${i + 1}`}>
                      <Swiper
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView="auto"
                        coverflowEffect={{
                          rotate: 50,
                          stretch: 0,
                          depth: 100,
                          modifier: 1,
                          slideShadows: true,
                        }}
                        pagination={{ clickable: true }}
                        navigation
                        modules={[EffectCoverflow, Pagination, Navigation]}
                      >
                        {generateProgramCards(i + 1)}
                      </Swiper>
                    </TabsContent>
                  )
                )}
              </Tabs>
            </div>
          )}

          <StartProgramDialog
            open={isStartProgramDialogOpen}
            onClose={handleCloseStartProgramDialog}
            onConfirm={handleConfirmStartProgram}
          />
          <ProgramTrainingMenuDialog
            open={isTrainingMenuDialogOpen}
            onClose={handleCloseTrainingMenuDialog}
            date={selectedDate}
            gender={formData.gender}
            frequency={formData.frequency}
            program={selectedProgramDetails}
          />
        </>
      )}
    </div>
  );
};

export default PersonalizePage;
