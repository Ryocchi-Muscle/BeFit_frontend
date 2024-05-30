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

interface ProgramTrainingMenuModalProps {
  open: boolean;
  onClose: () => void;
  date: Date;
  gender: string;
  frequency: string;
  program: { menu: string; set_info: string; other: string }[];
}

const ProgramTrainingMenuDialog: React.FC<ProgramTrainingMenuModalProps> = ({
  open,
  onClose,
  date,
  gender,
  frequency,
  program,
}) => {
  const [menuData, setMenuData] = useState<MenuData[]>([]);

  useEffect(() => {
    if (open) {
      let menuIdCounter =
        menuData.length > 0 ? menuData[menuData.length - 1].menuId + 1 : 1;
      setMenuData(
        program.flatMap((detail) => {
          const { menu, set_info } = detail;
          const [menuName, set] = [menu, set_info];
          return {
            menuId: menuIdCounter++,
            menuName,
            body_part: "", // 後で設定
            sets: [
              {
                setId: 1,
                setContent: set,
                weight: 0,
                reps: 0,
                completed: false,
              },
            ],
          };
        })
      );
    }
  }, [open, program]);

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
          <Button variant="default">保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramTrainingMenuDialog;
