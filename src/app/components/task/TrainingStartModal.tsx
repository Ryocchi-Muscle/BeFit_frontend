'use client';
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


interface TrainingStartModalProps {
  open: boolean;
  onClose: () => void;
  onDateSubmit: (date: Date | null) => void;
}

const TrainingStartModal: React.FC<TrainingStartModalProps> = ({
  open,
  onClose,
  onDateSubmit,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    onDateSubmit(selectedDate);
    onClose(); // モーダルを閉じる
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
        }}
      >
        <DatePicker
          label="トレーニング開始日"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params: any) => <TextField {...params} />}
        />
        <Button variant="contained" onClick={handleSubmit}>
          設定
        </Button>
      </Box>
    </Modal>
  );
};

export default TrainingStartModal;
