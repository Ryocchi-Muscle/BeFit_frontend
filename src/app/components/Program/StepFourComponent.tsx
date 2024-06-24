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
  onStartProgram: (week: number, day: number) => void;
  completedPrograms: number[];
  setShowCustomDialog: (show: boolean) => void;
  setDialogMessage: (message: string) => void;
}



const StepFourComponent: React.FC<StepFourComponentProps> = ({
  dailyPrograms,
  onDelete,
  duration,
  onStartProgram,
  completedPrograms,
  setShowCustomDialog,
  setDialogMessage,
}) => {
  const generateProgramCards = (week: number) => {
    console.log(`week: ${week}`);
    const weekPrograms = dailyPrograms.filter((dp) => dp.week === week);
    return weekPrograms.map((dailyProgram, index) => (
      <SwiperSlide key={index} className="flex justify-center">
        <ProgramCard
          dailyProgram={dailyProgram}
          week={week}
          onStart={() => {
            console.log(
              `onStart called with week: ${week}, day: ${dailyProgram.day}`
            );
            onStartProgram(week, dailyProgram.day);
            console.log("onStartProgram called");
          }}
          isCompleted={completedPrograms.includes(dailyProgram.id)}
          setShowCustomDialog={setShowCustomDialog}
          setDialogMessage={setDialogMessage}
        />
      </SwiperSlide>
    ));
  };

  return (
    <div className="fixed flex flex-col items-center justify-center pt-0 overflow-y-auto pb-20 w-full">
      <style>{`
        .custom-swiper-pagination {
          bottom: 180px !important; /* 必要に応じてこの値を調整 */
        }
        .custom-swiper-button-next, .custom-swiper-button-prev {
          top: 45% !important; /* 必要に応じてこの値を調整 */
          transform: translateY(-50%);
        }
      `}</style>
      <Tabs defaultValue="week1" className="w-full">
        <div className="relative">
          <div className="items-center flex justify-center">
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
              className="mx-auto"
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
              pagination={{
                clickable: true,
                el: ".custom-swiper-pagination", // カスタムクラスを使用
              }}
              navigation={{
                nextEl: ".custom-swiper-button-next", // カスタムクラスを使用
                prevEl: ".custom-swiper-button-prev", // カスタムクラスを使用
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
            >
              {generateProgramCards(i + 1)}
            </Swiper>
            <div className="custom-swiper-pagination swiper-pagination"></div>{" "}
            {/* カスタムクラスを追加 */}
            <div className="custom-swiper-button-next swiper-button-next"></div>{" "}
            {/* カスタムクラスを追加 */}
            <div className="custom-swiper-button-prev swiper-button-prev"></div>{" "}
            {/* カスタムクラスを追加 */}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );

};

export default StepFourComponent;
