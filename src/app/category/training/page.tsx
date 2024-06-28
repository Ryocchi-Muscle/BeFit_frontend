"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/app/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const maleTrainingMenus = [
  {
    name: "スクワット",
    position: "脚",
    gender: "male",
    url: "/training/men/squat",
  },
  {
    name: "ベンチプレス",
    position: "胸",
    gender: "male",
    url: "/training/men/bench-press",
  },
  {
    name: "デッドリフト",
    position: "背中",
    gender: "male",
    url: "/training/men/deadlift",
  },
  {
    name: "ブルガリアンスクワット",
    position: "脚",
    gender: "male",
    url: "/training/men/bulgarian-squat",
  },
  {
    name: "アブローラー",
    position: "腹",
    gender: "male",
    url: "/training/men/ab-roller",
  },
  {
    name: "懸垂",
    position: "背中",
    gender: "male",
    url: "/training/men/pull-up",
  },
  {
    name: "サイドレイズ",
    position: "肩",
    gender: "male",
    url: "/training/men/side-raise",
  },
  {
    name: "ダンベルカール",
    position: "腕",
    gender: "male",
    url: "/training/men/dumbbell-curl",
  },
  {
    name: "ライイングトライセプスEX",
    position: "腕",
    gender: "male",
    url: "/training/men/lying-triceps-extension",
  },
  {
    name: "インクラインダンベルカール",
    position: "腕",
    gender: "male",
    url: "/training/men/incline-dumbbell-curl",
  },
  {
    name: "ショルダープレス",
    position: "肩",
    gender: "male",
    url: "/training/men/shoulder-press",
  },
];

const femaleTrainingMenus = [
  {
    name: "ヒップスラスト",
    position: "尻",
    gender: "female",
    url: "/training/women/hip-thrust",
  },
  {
    name: "ラットプルダウン",
    position: "背中",
    gender: "female",
    url: "/training/women/lat-pulldown",
  },
  {
    name: "レッグプレス",
    position: "脚",
    gender: "female",
    url: "/training/women/leg-press",
  },
  {
    name: "ルーマニアンデッドリフト",
    position: "ハムストリングス",
    gender: "female",
    url: "/training/women/romanian-deadlift",
  },
  {
    name: "シーテッドロウ",
    position: "背中",
    gender: "female",
    url: "/training/women/seated-row",
  },
  {
    name: "インナーサイ",
    position: "ハムストリングス",
    gender: "female",
    url: "/training/women/inner-thigh",
  },
  {
    name: "アウターサイ",
    position: "尻",
    gender: "female",
    url: "/training/women/outer-thigh",
  },
  {
    name: "バックエクステンション",
    position: "ハムストリングス",
    gender: "female",
    url: "/training/women/back-extension",
  },
  {
    name: "ケーブルヒップキックバック",
    position: "尻",
    gender: "female",
    url: "/training/women/cable-hip-kickback",
  },
  {
    name: "腹筋マシン",
    position: "腹",
    gender: "female",
    url: "/training/women/ab-machine",
  },
  {
    name: "スクワット",
    position: "脚＆尻",
    gender: "female",
    url: "/training/women/squat",
  },
  {
    name: "ブルガリアンスクワット",
    position: "脚＆尻",
    gender: "female",
    url: "/training/women/bulgarian-squat",
  },
  {
    name: "レッグカール",
    position: "ハムストリングス",
    gender: "female",
    url: "/training/women/leg-curl",
  },
  {
    name: "アブローラー",
    position: "腹",
    gender: "female",
    url: "/training/women/ab-roller",
  },
];

export default function TrainingTutorialPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("male");

  useEffect(() => {
    // ページがロードされたときにローカルストレージからタブの状態を読み込む
    const savedTab = localStorage.getItem("selectedTab");
    if (savedTab) {
      console.log("Loading tab from localStorage:", savedTab);
      setSelectedTab(savedTab);
    }
  }, []);

  useEffect(() => {
    // タブの状態が変更されたときにローカルストレージに保存する
    console.log("Saving tab to localStorage:", selectedTab);
    localStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

  const filteredMaleMenus = maleTrainingMenus.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFemaleMenus = femaleTrainingMenus.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          トレーニング解説
        </h1>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="メニューを検索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2"
          />
        </div>
        <div className="mb-10">
          <Button asChild>
            <Link
              href="/basics"
              className="text-white bg-blue-500 hover:bg-blue-700 p-3 rounded-lg block text-center"
            >
              筋トレする上で大切なこと
            </Link>
          </Button>
        </div>
        <Separator className="mb-10" />
        <Tabs
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value)}
        >
          <TabsList>
            <TabsTrigger value="male">男性メニュー解説</TabsTrigger>
            <TabsTrigger value="female">女性メニュー解説</TabsTrigger>
          </TabsList>
          <TabsContent value="male">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaleMenus
                .filter((menu) => menu.gender === "male")
                .map((menu) => (
                  <Card key={menu.name} className="mb-4">
                    <CardHeader>
                      <CardTitle>
                        {menu.name}
                        {menu.position && (
                          <>
                            <br />
                            部位：{menu.position}
                          </>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link
                          href={menu.url}
                          className="text-blue-500 hover:underline block"
                        >
                          詳細を見る
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="female">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFemaleMenus
                .filter((menu) => menu.gender === "female")
                .map((menu) => (
                  <Card key={menu.name} className="mb-4">
                    <CardHeader>
                      <CardTitle>
                        {menu.name}
                        {menu.position && (
                          <>
                            <br />
                            部位：{menu.position}
                          </>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link
                          href={menu.url}
                          className="text-blue-500 hover:underline block"
                        >
                          詳細を見る
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
