import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NoProgramComponent: React.FC = () => {
  const router = useRouter();

  const handleCreateProgram = () => {
    console.log("Button clicked"); // クリックイベントの確認用ログ
    router.push("/category/personalize");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full">
      <Image
        src="/images/ProgramStartImage.webp"
        alt="Picture of the author"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 px-4 text-center">
        <h1 className="text-3xl font-bold text-white mt-8">
          VOLUME UP YOUR BODY GOALS
        </h1>
        <button
          className="mt-8 px-6 py-3 bg-yellow-400 text-black text-lg font-bold rounded-full"
          onClick={handleCreateProgram}
        >
          START BUILDING YOUR BODY
        </button>
      </div>
    </div>
  );
};

export default NoProgramComponent;
