"use client";
import React, { useState } from "react";
import Link from "next/link";
import Footer from "@/app/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const trainingMenus = [
  { name: "スクワット", gender: "male", url: "/training/men/squat" },
  { name: "ベンチプレス", gender: "male", url: "/training/men/bench-press" },
  { name: "デッドリフト", gender: "male", url: "/training/men/deadlift" },
  {
    name: "ヒップスラスト",
    gender: "female",
    url: "/training/women/hip-thrust",
  },
  {
    name: "ラットプルダウン",
    gender: "female",
    url: "/training/women/lat-pulldown",
  },
  { name: "レッグプレス", gender: "female", url: "/training/women/leg-press" },
];

export default function TrainingTutorialPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMenus = trainingMenus.filter((menu) =>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">男性メニュー解説</h2>
            {filteredMenus
              .filter((menu) => menu.gender === "male")
              .map((menu) => (
                <Card key={menu.name} className="mb-4">
                  <CardHeader>
                    <CardTitle>{menu.name}</CardTitle>
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
          <div>
            <h2 className="text-2xl font-bold mb-4">女性メニュー解説</h2>
            {filteredMenus
              .filter((menu) => menu.gender === "female")
              .map((menu) => (
                <Card key={menu.name} className="mb-4">
                  <CardHeader>
                    <CardTitle>{menu.name}</CardTitle>
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
