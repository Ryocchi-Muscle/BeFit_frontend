import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProgramInfoComponent from "./ProgramInfo";
import NoProgramComponent from "./NoProgramComponent";
import { Program } from "types/types";

const ProgramManagement: React.FC = () => {
  const { data: session } = useSession();
  const [programData, setProgramData] = useState<Program | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProgramData = async () => {
    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${apiUrl}/api/v2/programs`;
    console.log("API endpoint:", endpoint);
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      const data = await response.json();
      console.log("Fetched program data:", data);
      if (response.ok && data && data.program && data.program.length > 0) {
        console.log("Setting program data:", data.program[0]);
        setProgramData(data.program[0]);
      } else {
        console.error("プログラムデータが見つかりません");
        setProgramData(null);
      }
    } catch (error) {
      console.error("エラーが発生しました: ", error);
      setProgramData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchProgramData();
    } else {
      console.log("セッションがありません");
    }
  }, [session]);

  const handleDelete = () => {
    setProgramData(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-950">プログラム管理</h1>
      {loading ? (
        <p>読み込み中...</p>
      ) : programData ? (
        <ProgramInfoComponent program={programData} onDelete={handleDelete} />
      ) : (
        <NoProgramComponent />
      )}
    </div>
  );
};

export default ProgramManagement;
