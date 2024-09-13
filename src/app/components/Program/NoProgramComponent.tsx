import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const NoProgramComponent: React.FC = () => {
  const router = useRouter();

  const handleCreateProgram = () => {
    console.log("Button clicked");
    router.push("/category/personalize");
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/ProgramStartImage.webp')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 px-4 text-center">
        <h1 className="text-4xl font-bold text-white pb-14">
          自分だけのプログラムを作成しよう
        </h1>
        <Button
          className="mt-8 px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-bold rounded-lg border-2 border-blue-700 shadow-xl hover:shadow-none hover:bg-gradient-to-l hover:from-blue-700 hover:to-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={handleCreateProgram}
        >
          作成する
        </Button>
      </div>
    </div>
  );
};

export default NoProgramComponent;
