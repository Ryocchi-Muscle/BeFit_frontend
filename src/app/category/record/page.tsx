"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Footer from "@/app/components/layout/Footer";
import TrainingChart from "@/components/TrainingChart";

const RecordPage = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div className="flex-grow relative pt-8">
        <h1 className="text-3xl font-bold text-blue-950">トレーニング記録</h1>
        <TrainingChart />
      </div>
      <Footer />
    </div>
  );
};

export default RecordPage;
