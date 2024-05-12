"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DayPickerProps } from "react-day-picker";
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
import { useSession } from "next-auth/react";

interface ApiResponse {
  id: number;
  body_part: string | null;
  exercise_name: string;
  training_day_id: number;
  created_at: string;
  updated_at: string;
  training_sets: TrainingSet[];
}

interface TrainingSet {
  id: number;
  set_number: number;
  weight: number;
  reps: number;
  completed: boolean;
  training_menu_id: number;
}

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// UTCからJSTに変換する関数
function toJST(date: Date): Date {
  const JST_OFFSET = 9 * 60 * 60 * 1000; // 9時間をミリ秒に変換
  return new Date(date.getTime() + JST_OFFSET);
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [menuDataByDate, setMenuDataByDate] = useState<{
    [date: string]: MenuData[];
  }>({});
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const { data: session } = useSession();

  // メニューデータを取得する関数
  const fetchMenuData = async (data: Date) => {
    const dateKey = data.toISOString().split("T")[0];
    console.log("dateKey", dateKey);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${apiUrl}/api/v2/training_records/${dateKey}`;
    console.log("endpoint", endpoint);
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
      const data: ApiResponse[] = await response.json();
      console.log("data", data);

      // backからのメニューデータを変換
      const transformedData = data.map((item, menuIndex) => ({
        menuId: menuIndex + 1,
        menuName: item.exercise_name,
        body_part: item.body_part,
        sets: item.training_sets
          .sort((a, b) => a.set_number - b.set_number)
          .map((set, setIndex) => ({
            setId: set.id,
            setNumber: setIndex + 1,
            weight: set.weight,
            reps: set.reps,
            completed: set.completed,
          })),
      }));
      console.log("transformed data", transformedData);
      return transformedData;
    } catch (error) {
      console.error("メニューデータの取得に失敗しました: ", error);
      return null;
    }
  };

  // 日付がクリックされたときに呼び出される関数
  const handleDayClick = async (date: Date) => {
    const jstDate = toJST(date);
    setSelectedDate(jstDate);
    const menuData = await fetchMenuData(jstDate);
    const dateKey = jstDate.toISOString().split("T")[0];
    if (menuData) {
      setMenuDataByDate({
        ...menuDataByDate,
        [dateKey]: menuData.map((menu, index) => ({
          ...menu,
          menuId: index + 1,
          sets: menu.sets.map((set, setIndex) => ({
            ...set,
            setId: setIndex + 1,
          })),
        })),
      });
    } else {
      setMenuDataByDate({
        ...menuDataByDate,
        [dateKey]: [],
      });
    }
    setDialogOpen(true);
  };

  const handleFlashMessage = (message: string) => {
    setFlashMessage(message);
    setTimeout(() => setFlashMessage(null), 5000); // 5秒後にメッセージを消す
  };

  // フォームが送信されたときに呼び出される関数
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("session", session);
    console.log("保存ボタンがクリックされました。");
    if (!selectedDate) {
      console.error("日付が選択されていません。");
      return;
    }
    const datekey = selectedDate.toISOString().split("T")[0]; // 日付をキーにする
    console.log("selectedDate", selectedDate);
    console.log("menuDataByDate[datekey]", menuDataByDate[datekey]);
    const menus = menuDataByDate[datekey]; // 日付に対応するメニューデータを取得
    console.log("menus", menus);

    const body = JSON.stringify({
      menus: menus,
      date: selectedDate.toLocaleDateString(),
    }); // 送信するデータ
    console.log("body:", body);
    // TODO: ここでTrainingMenuListからデータを取得してAPIに送信する
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
      console.log("body:", body);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      handleFlashMessage("メニューの保存に成功しました。");
      setDialogOpen(false); // ダイアログを閉じる
      console.log("メニューの保存に成功しました。");
      setDialogOpen(false);
    } catch (error) {
      console.error("メニューの保存に失敗しました: ", error);
      handleFlashMessage("メニューの保存に失敗しました。");
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
      {flashMessage && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-red-500 text-white text-center p-2"
          role="alert"
        >
          {flashMessage}
        </div>
      )}
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
                <TrainingMenuList
                  menus={
                    menuDataByDate[selectedDate.toISOString().split("T")[0]] ||
                    []
                  }
                  setMenus={(newMenus) => {
                    const dateKey = selectedDate?.toISOString().split("T")[0];
                    if (dateKey) {
                      setMenuDataByDate((prev) => ({
                        ...prev,
                        [dateKey]: newMenus as MenuData[],
                      }));
                    }
                  }}
                />
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
