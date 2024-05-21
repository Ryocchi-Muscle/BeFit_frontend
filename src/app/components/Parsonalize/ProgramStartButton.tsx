'use client';
import React, { useState } from "react";
import { StartProgramDaialog } from "./StartProgramDaialog";

const ProgramStartButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    // トレーニングメニュー入力モーダルを表示する処理を追加
    // 例: showTrainingMenuModal(new Date());
  };

  return (
    <div>
      <button onClick={handleOpenModal}>プログラムをスタートする</button>
      <StartProgramDaialog
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default ProgramStartButton;
