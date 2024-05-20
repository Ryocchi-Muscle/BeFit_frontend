import TrainingMenuList from "@/app/components/CarendarRecord/v2/TrainingMenuList";
import { Calendar } from "@/components/ui/calender";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MenuData } from "types/types";

export default function ProgramTrainingRecord() {
  const { data: session } = useSession();
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [menuData, setMenuData] = useState<MenuData[]>([]);

  useEffect(() => {
    if (router.query.program) {
      const programData = JSON.parse(router.query.program as string);
      setMenuData(programData);
    }
  }, [router.query]);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dateKey = date?.toISOString().split("T")[0]; // 日付をキーにする
    const menus = menuData; // 記録ページで使用するメニューデータ
    const body = JSON.stringify({
      date: date?.toLocaleDateString(),
      menus: menus,
    }); // 送信するデータ
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${apiUrl}/api/v2/training_records`;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: body,
      });

      if (response.ok) {
        alert("メニューが正常に保存されました。");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("メニューの保存に失敗しました: ", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        <h1 className="text-2xl">記録ページ</h1>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          className="rounded-md border"
        />
        <form id="training-menu-form" onSubmit={handleFormSubmit}>
          <TrainingMenuList menus={menuData} setMenus={setMenuData} />
          <button
            type="submit"
            className="mt-5 py-3 px-5 bg-blue-500 text-white border-none rounded-lg cursor-pointer"
          >
            保存
          </button>
        </form>
      </div>
    </div>
  );
}
