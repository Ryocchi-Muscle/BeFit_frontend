import React from "react";
import Link from "next/link";
import Footer from "@/app/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function TrainingTutorialPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <h1> トレーニング解説</h1>
        <div className="mt-4">
          <Button asChild>
            <Link href="/basics" className="text-blue-500 hover:underline">
              筋トレする上で大切なこと
            </Link>
          </Button>
          <Button asChild>
            <Link
              href="training/training_position"
              className="text-blue-500 hover:underline block mt-2"
            >
              ぽいち
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
