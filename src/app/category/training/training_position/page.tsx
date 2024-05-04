"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import TrainingPartsSelector from '@/app/components/TrainingTutorial/TrainingPartsSelector';

export default function Home() {
  const [showSelector, setShowSelector] = useState(false);

  return (
    <div className="container mx-auto px-4">
      <Button
        onClick={() => setShowSelector(!showSelector)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        筋トレの部位別解説を選択
      </Button>
      {showSelector && <TrainingPartsSelector />}
    </div>
  );
}
