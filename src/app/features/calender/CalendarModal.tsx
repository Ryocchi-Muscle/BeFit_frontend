import React, { useState } from "react";

export const TrainingModal = ({
  isOpen,
  onClose,
  selectedDate,
}: {
  isOpen: boolean;
  onClose: any;
  selectedDate: any;
}) => {
  const [trainingDetails, setTrainingDetails] = useState("");
  const [flashMessage, setFlashMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Training details:", trainingDetails);
    onClose(); // モーダルを閉じる
    setFlashMessage("保存しました");

    setTimeout(() => {
      setFlashMessage("");
    }, 2000);
  };

  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>トレーニングメニュー入力 - {selectedDate.toLocaleDateString()}</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={trainingDetails}
            onChange={(e) => setTrainingDetails(e.target.value)}
            placeholder="トレーニングの詳細を入力してください"
          />
          <button type="submit">保存</button>
        </form>
        {flashMessage && (<div className="alert alert-success" role="alert">{flashMessage}</div>
        )}
      </div>
    </div>
  ) : null;
};
