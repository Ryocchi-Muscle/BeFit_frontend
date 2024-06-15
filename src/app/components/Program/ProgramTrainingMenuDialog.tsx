"use client";

import React, { useState, useEffect } from "react";
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

interface ProgramTrainingMenuModalProps {
  open: boolean;
  onClose: () => void;
  date: Date;
  gender: string;
  frequency: string;
  program: ProgramDetail[];
}

const ProgramTrainingMenuDialog: React.FC<ProgramTrainingMenuModalProps> = ({
  open,
  onClose,
  date,
  program,
}) => {
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  const { data: session } = useSession();
  const { toast } = useToast();

  // `open`の変更を監視
  useEffect(() => {
    console.log("Dialog open state changed:", open);
  }, [open]);

  useEffect(() => {
    if (open) {
      let menuIdCounter = 1;
      const newMenuData: MenuData[] = program.map((detail) => {
        const { menu, set_info, daily_program_id } = detail;

        // デバッグ用ログ
        console.log("detail in map:", detail);

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
        console.log("sets with setNumber:", sets); // デバッグ用ログ
        const menuData = {
          menuId: menuIdCounter++,
          menuName: menu,
          body_part: "", // 後で設定
          sets: sets,
          daily_program_id: daily_program_id,
        };

        console.log("menuData in map:", menuData);
        // デバッグ用ログ

        return menuData;
      });
      console.log("menuData set in ProgramTrainingMenuDialog:", newMenuData); // デバッグ用ログ
      setMenuData(newMenuData);
    }
  }, [open, program]);

  const handleSave = async () => {
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
          <Button variant="default" onClick={handleSave}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramTrainingMenuDialog;
