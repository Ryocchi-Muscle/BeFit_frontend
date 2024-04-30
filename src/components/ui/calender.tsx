"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import TrainingMenuList from "@/app/components/CarendarRecord/v2/TrainingMenuList";
import { MenuData } from "../../../types/types";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;


function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [menus, setMenus] = useState<MenuData[]>([]);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setDialogOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("保存ボタンがクリックされました。");
    if (!selectedDate) {
      console.error("日付が選択されていません。");
      return;
    }
    const body = JSON.stringify({ menus, date: selectedDate.toLocaleDateString()}); // 送信するデータ
      console.log("body:", body);
    // TODO: ここでTrainingMenuListからデータを取得してAPIに送信する
    const endpoint = "http://localhost:3000/api/v2/training_records";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // その他のヘッダー(認証が必要な場合)
        },
        body: body,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("メニューが保存されました。");
      setDialogOpen(false);
    } catch (error) {
      console.error("メニューの保存に失敗しました: ", error);
    }
  };

  return (
    <>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        onDayClick={handleDayClick}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => (
            <ChevronLeft className="h-4 w-4" {...props} />
          ),
          IconRight: ({ ...props }) => (
            <ChevronRight className="h-4 w-4" {...props} />
          ),
        }}
        {...props}
      />
      {isDialogOpen && selectedDate && (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="flex flex-col max-h-[90vh]">
            <DialogTitle>トレーニングメニュー入力</DialogTitle>
            <DialogDescription>
              {selectedDate.toLocaleDateString()}{" "}
              のトレーニング詳細を入力してください。
            </DialogDescription>
            <div className="flex flex-col flex-grow overflow-y-auto">
              <form id="training-menu-form" onSubmit={handleFormSubmit}>

                <TrainingMenuList menus={menus} setMenus={setMenus} />
              </form>
            </div>
            <DialogFooter>
              <Button type="submit" form="training-menu-form">
                保存
              </Button>
              <DialogClose asChild>
                <Button variant="ghost">キャンセル</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
