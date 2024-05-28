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

interface Program {
  title: string;
  image: string;
  details: { menu: string; set_info: string; other: string }[];
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
  const [isStartProgramDialogOpen, setIsStartProgramDialogOpen] =
    useState(false);

  const [isTrainingMenuDialogOpen, setIsTrainingMenuDialogOpen] =
    useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSelect = (key: string, value: string | number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
    console.log("value", value);
    console.log("formData", { ...formData, [key]: value });
  };

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
      
      if (!response.ok) {
        throw new Error("APIエラーが発生しました");
      }
      const data = await response.json();
      if (data && data.program) {
        setProgram(
          data.program.map((item: any) => ({
            title: item.title,
            image: item.image,
            details: item.details,
          }))
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

  const handleRecordButtonClick = () => {
    setIsStartProgramDialogOpen(true);
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

  const generateProgramCards = (week: number) => {
    const programCards = [];
    const frequency = parseInt(formData.frequency); // トレーニング頻度を数値として取得
    console.log("frequency", frequency);
    const startIndex = (week - 1) * frequency;
    const endIndex = startIndex + frequency;

    for (let day = startIndex; day < endIndex; day++) {
      const programDetails = program[day] ? program[day].details : [];
      programCards.push(
        <SwiperSlide key={`W${week}D${day}`}>
          <ProgramCard
            title={`Week ${week} Day ${day + 1}`}
            image={program[day]?.image || ""}
            details={programDetails}
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
                        <SelectItem value="5">週5</SelectItem>
                        <SelectItem value="6">週6</SelectItem>
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
                    <SelectContent className="top-auto bottom-full mt-2 max-h-60 overflow-y-auto">
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
                          : 9,
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
                {Array.from({ length: 9 }, (_, i) => (
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
                ))}
              </Tabs>
              <button
                className="fixed bottom-20 py-3 px-5 bg-blue-500 text-white border-none rounded-lg cursor-pointer z-10"
                onClick={handleRecordButtonClick}
              >
                プログラムをスタートする
              </button>
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
            program={program}
          />
        </>
      )}
    </div>
  );
};

export default PersonalizePage;
