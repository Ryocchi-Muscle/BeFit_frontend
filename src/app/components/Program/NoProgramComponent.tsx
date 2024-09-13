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
          className="mt-8 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-lg font-bold rounded-full border-2 border-black shadow-2xl hover:shadow-none hover:bg-gradient-to-l hover:from-orange-500 hover:to-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={handleCreateProgram}
        >
          作成する
        </Button>
      </div>
    </div>
  );
};

export default NoProgramComponent;
