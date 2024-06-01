import React from "react";
import { useSession } from "next-auth/react";

type Program = {
  id: string;
  name: string;
  progress: string;
  description: string;
};

const ProgramInfoComponent: React.FC<{
  program: Program;
  onDelete: () => void;
}> = ({ program, onDelete }) => {
  const { data: session } = useSession();
   console.log("session in ProgramInfoComponent:", session);

  const handleDeleteProgram = async () => {
    if (!session?.accessToken) {
      console.error("Access token is missing"); 
      return;
    }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${apiUrl}/api/v2/programs/${program.id}`;
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      if (response.ok) {
        alert("プランが削除されました。");
        onDelete(); // プラン削除後の処理を呼び出し
      } else {
        console.error("プランの削除に失敗しました");
      }
    } catch (error) {
      console.error("エラーが発生しました: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-xl font-semibold mb-4">現在のプログラム</h2>
      <div className="p-4 bg-gray-100 rounded-md shadow-md w-full">
        <p>プログラム名: {program.name}</p>
        <p>進行状況: {program.progress}</p>
        <p>概要: {program.description}</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={handleDeleteProgram}
        >
          プログラムを削除する
        </button>
      </div>
    </div>
  );
};

export default ProgramInfoComponent;
