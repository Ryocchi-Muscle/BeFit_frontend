"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TrainingMenuList from "../CarendarRecord/v2/TrainingMenuList";
import { MenuData } from "types/types";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { ProgramDetail } from "types/types";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import axios from "axios";

interface ProgramTrainingMenuModalProps {
  open: boolean;
  onClose: () => void;
  date: Date;
  gender: string;
  frequency: string;
  program: ProgramDetail[];
  dailyProgramId: number;
}

const ProgramTrainingMenuDialog: React.FC<ProgramTrainingMenuModalProps> = ({
  open,
  onClose,
  date,
  program,
  dailyProgramId,
}) => {
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  const { data: session } = useSession();
  const { toast } = useToast();
  const formattedDate = date.toISOString().split("T")[0];
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = `${apiUrl}/api/v2/training_records/${formattedDate}`;
  const { data: savedMenuData } = useSWR(
    session?.accessToken ? endpoint : null,
    (url) => fetcher(url, session?.accessToken as string)
  );

  const fetchMenuData = useCallback(
    async (date: string) => {
      const endpoint = `${apiUrl}/api/v2/training_records/${date}`;
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched menu data:", data); // 取得したデータを確認するためのログ
        return data;
      } catch (error) {
        console.error("メニューデータの取得に失敗しました: ", error);
        return null;
      }
    },
    [apiUrl, session?.accessToken]
  );

  useEffect(() => {
    const loadMenuData = async () => {
      if (open) {
        const savedMenuData = await fetchMenuData(formattedDate);
        if (
          savedMenuData &&
          Array.isArray(savedMenuData) &&
          savedMenuData.length > 0
        ) {
          console.log("Saved menu data:", savedMenuData); // 取得したメニューのデータを確認するためのログ

          let menuIdCounter = 1;
          const menuData = savedMenuData.map((menu: any) => {
            const sets = menu.training_sets.map((set: any, index: number) => ({
              setId: index + 1, // 再割り当て
              setNumber: set.set_number,
              setContent: `${set.reps}回 ${set.weight}kg`,
              weight: set.weight,
              reps: set.reps,
              completed: set.completed,
            }));

            return {
              menuId: menuIdCounter++, // 再割り当て
              menuName: menu.exercise_name,
              sets: sets,
              daily_program_id: menu.daily_program_id,
            };
          });
          setMenuData(menuData);
        } else {
          let menuIdCounter = 1;
          const newMenuData: MenuData[] = program.map((detail) => {
            const { menu, set_info, daily_program_id } = detail;

            // set_info からセット数を抽出
            const setCountMatch = set_info.match(/(\d+)セット/);
            const setCount = setCountMatch ? parseInt(setCountMatch[1], 10) : 1;

            // sets 配列を生成
            const sets = Array.from({ length: setCount }, (_, i) => ({
              setId: i + 1,
              setNumber: i + 1,
              setContent: set_info,
              weight: "",
              reps: "",
              completed: false,
            }));

            const menuData = {
              menuId: menuIdCounter++,
              menuName: menu,
              sets: sets,
              daily_program_id: daily_program_id,
            };

            return menuData;
          });
          setMenuData(newMenuData);
        }
      }
    };

    loadMenuData();
  }, [open, program, formattedDate, savedMenuData, fetchMenuData]);

  const handleComplete = async () => {
    console.log("menuData before sending to API:", menuData); // デバッグ用ログ
    const body = JSON.stringify({
      menus: menuData,
      date: date.toLocaleDateString(),
    });
    console.log("Data sent to API:", body); // デバッグ用ログ

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
        toast({
          title: "保存成功",
          description: "メニューが正常に保存されました。",
          duration: 3000,
          style: { backgroundColor: "green", color: "white" },
        });
        // 完了処理として date フィールドを更新するエンドポイントを呼び出す
        await axios.patch(
          `${apiUrl}/api/v2/personalized_menus/${dailyProgramId}/save_daily_program`,
          {},
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        const savedMenuData = await fetchMenuData(formattedDate); // 保存後に最新データを取得
        if (
          savedMenuData &&
          Array.isArray(savedMenuData.menus) &&
          savedMenuData.menus.length > 0
        ) {
          setMenuData(savedMenuData.menus);
        }
        onClose(); // ダイアログを閉じる
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("メニューの保存に失敗しました: ", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>トレーニングメニュー入力</DialogTitle>
          <DialogDescription>
            {date.toLocaleDateString()} のトレーニング詳細を入力してください。
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-auto">
          <TrainingMenuList menus={menuData || []} setMenus={setMenuData} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">キャンセル</Button>
          </DialogClose>
          <Button variant="default" onClick={handleComplete}>
            完了
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramTrainingMenuDialog;
