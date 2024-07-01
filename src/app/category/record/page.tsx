"use client";
import React from "react";
import Footer from "@/app/components/layout/Footer";
import TrainingChart from "@/components/TrainingChart";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import usePreventScroll from "@/hooks/usePreventScroll";

const RecordPage = () => {
  usePreventScroll();
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-hidden">
      <div className="flex-grow container mx-auto px-4 py-8">
        <Card className="shadow-lg">
          <CardHeader className="bg-white-500 text-blue-900 pt-3 pb-0 px-6 rounded-t-lg">
            <CardTitle className="text-2xl font-semibold">
              トレーニング記録
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white py-6 px-6 rounded-b-lg">
            <TrainingChart />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default RecordPage;
