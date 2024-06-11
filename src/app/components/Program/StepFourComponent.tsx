import React from "react";
import { DailyProgram } from "types/types";
import ProgramCard from "./ProgramCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { FaRegTrashAlt } from "react-icons/fa";

interface StepFourComponentProps {
  dailyPrograms: DailyProgram[];
  onDelete: () => void;
  duration: number;
  setStep: (step: number) => void;
}

const StepFourComponent: React.FC<StepFourComponentProps> = ({
  dailyPrograms,
  onDelete,
  duration,
  setStep,
}) => {
  const generateProgramCards = (week: number) => {
    const weekPrograms = dailyPrograms.filter((dp) => dp.week === week);
    return weekPrograms.map((dailyProgram, index) => (
      <SwiperSlide key={index}>
        <ProgramCard dailyProgram={dailyProgram} onStart={() => {}} />
      </SwiperSlide>
    ));
  };

  return (
    <div className="fixed flex flex-col items-center justify-center pt-0 overflow-y-auto pb-20 w-full">
      <Tabs defaultValue="week1" className="w-full">
        <div className="relative">
          <div className="flex items-center">
            <TabsList className="flex overflow-x-auto whitespace-nowrap space-x-4 px-4 pl-4">
              <SimpleBar className="w-full" autoHide={false}>
                {Array.from({ length: duration }, (_, i) => (
                  <TabsTrigger
                    key={i}
                    value={`week${i + 1}`}
                    className="flex-shrink-0 min-w-[80px] px-4 py-2"
                  >
                    {`Week ${i + 1}`}
                  </TabsTrigger>
                ))}
              </SimpleBar>
            </TabsList>
            <button
              className="ml-2 flex items-center justify-center w-8 h-8 bg-white border border-gray-300 rounded-full shadow-lg z-10"
              onClick={onDelete}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        </div>

        {Array.from({ length: duration }, (_, i) => (
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
    </div>
  );
};

export default StepFourComponent;
