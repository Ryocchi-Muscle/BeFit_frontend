import React from 'react';
import { Button } from '@/components/ui/button';

const MuscleGroupSelection: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="space-x-4">
        <Button variant="default">胸</Button>
        <Button variant="default">背中</Button>
        <Button variant="default">肩</Button>
        <Button variant="default">腕</Button>
        <Button variant="default">脚</Button>
        <Button variant="default">腹</Button>
      </div>
    </div>
  );
};

export default MuscleGroupSelection;
