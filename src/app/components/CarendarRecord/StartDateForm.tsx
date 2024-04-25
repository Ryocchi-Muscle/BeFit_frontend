"use client";
import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useTrainingSession } from "../../hooks/useTrainingSession";
import Button from "@mui/material/Button";
import { Box, Modal } from "@mui/material";

interface StartDateFormProps {
  userId: number;
}

const StartDateForm: React.FC<StartDateFormProps> = ({ userId }) => {
  const { mutate } = useTrainingSession(userId);
  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

   const handleOpen = () => setModalOpen(true);
   const handleClose = () => setModalOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/training_sessions/${userId}`, {
        start_date: startDate,
      });
      mutate({ ...response.data }, false); // false to not re-fetch
      handleClose(); // モーダルを閉じる
    } catch (error) {
      console.error("Failed to submit start date:", error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>トレーニング開始日を設定</Button>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <form onSubmit={handleSubmit}>
            <label htmlFor="start-date">トレーニング開始日</label>
            <input
              name = "date"
              type="date"
              id="start-date"
              value={startDate ? startDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
            ←トレーニング開始日を設定
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default StartDateForm;
