import React from "react";
import Link from "next/link";
import Footer from "@/app/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function TrainingTutorialPage() {
  return (
    <div className="flex flex-col min-h-screen pt-4">
      <div className="flex-grow">
        <h1>トレーニング解説</h1>
        <div className="mt-4">
          <Button asChild>
            <Link href="/basics" className="text-blue-500 hover:underline">
              筋トレする上で大切なこと
            </Link>
          </Button>
          <div className="mt-6">
            <h2 className="text-xl">トレーニングメニュー</h2>
            <div className="mt-2">
              <Button asChild>
                <Link
                  href="/training/men"
                  className="text-blue-500 hover:underline block mt-2"
                >
                  男性用トレーニングメニュー
                </Link>
              </Button>
              <Button asChild>
                <Link
                  href="/training/women"
                  className="text-blue-500 hover:underline block mt-2"
                >
                  女性用トレーニングメニュー
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
