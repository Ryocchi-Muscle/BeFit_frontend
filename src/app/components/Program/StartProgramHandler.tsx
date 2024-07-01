"use client";
import React, { useState, useEffect, useCallback } from "react";
import ProgramTrainingMenuDialog from "./ProgramTrainingMenuDialog";
import StartProgramDialog from "./StartProgramDialog";
import { MenuData } from "../../../../types/types";

interface ProgramDetail {
  menu: string;
  set_info: string;
  daily_program_id: number;
}

interface StartProgramHandlerProps {
  formData: {
    frequency: string;
    gender: string;
  };
  extendedProgram: any[];
  onSetStartProgram: (handler: (week: number, day: number) => void) => void;
  // onComplete: (dailyProgramId: number) => void;
}

const StartProgramHandler: React.FC<StartProgramHandlerProps> = ({
  formData,
  extendedProgram,
  onSetStartProgram,
}) => {
  const [isStartProgramDialogOpen, setIsStartProgramDialogOpen] =
    useState(false);
  const [isTrainingMenuDialogOpen, setIsTrainingMenuDialogOpen] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProgramDetails, setSelectedProgramDetails] = useState<
    ProgramDetail[]
  >([]);
  const [menuData, setMenuData] = useState<MenuData[]>([]);

  const updateMenuData = (
    programDetails: {
      menu: string;
      set_info: string;
      daily_program_id: number;
    }[]
  ) => {
    const newMenuData = programDetails.map((detail, index) => {
      const setCountMatch = detail.set_info.match(/(\d+)セット/);
      const setCount = setCountMatch ? parseInt(setCountMatch[1], 10) : 1;

      const sets = Array.from({ length: setCount }, (_, i) => ({
        setId: i + 1,
        setContent: detail.set_info,
        weight: "",
        reps: "",
        completed: false,
      }));

      return {
        menuId: index + 1,
        menuName: detail.menu,
        body_part: "",
        sets: sets,
        daily_program_id: detail.daily_program_id,
      };
    });
    setMenuData(newMenuData);
  };

  const handleStartProgramInternal = useCallback(
    (week: number, day: number) => {
      console.log(
        "handleStartProgramInternal called with week:",
        week,
        "day:",
        day
      );
      if (week == null || day == null) {
        console.error("Invalid week or day value");
        return;
      }
      const frequency = parseInt(formData.frequency, 10);
      console.log("week", week);
      console.log("day", day);
      console.log("frequency", frequency);
      const startIndex = (week - 1) * frequency + (day - 1);
      console.log("startIndex", startIndex);
      const selectedProgram = extendedProgram[startIndex];
      console.log("selectedProgram", selectedProgram);

      if (!selectedProgram) {
        console.error("Selected program not found");
        return;
      }

      console.log(
        "selectedProgram.training_menus",
        selectedProgram.training_menus
      );
      if (
        !selectedProgram.training_menus ||
        selectedProgram.training_menus.length === 0
      ) {
        console.error("Training menus not found or empty");
        return;
      }

      const programDetails = selectedProgram.details.map(
        (detail: any, index: number) => {
          if (index >= selectedProgram.training_menus.length) {
            console.error(`Index ${index} out of bounds for training_menus`);
            return { ...detail, daily_program_id: null };
          }
          return {
            ...detail,
            daily_program_id:
              selectedProgram.training_menus[index].daily_program_id,
          };
        }
      );
      console.log("programDetails:", programDetails);
      updateMenuData(programDetails);
      setSelectedProgramDetails(programDetails);
      setIsStartProgramDialogOpen(true);
    },
    [formData.frequency, extendedProgram]
  );

  const handleConfirmStartProgram = () => {
    setIsStartProgramDialogOpen(false);
    setIsTrainingMenuDialogOpen(true);
  };

  const handleCloseStartProgramDialog = () => {
    setIsStartProgramDialogOpen(false);
  };

  const handleCloseTrainingMenuDialog = () => {
    setIsTrainingMenuDialogOpen(false);
  };

  useEffect(() => {
    console.log("Setting start program function");
    onSetStartProgram(() => handleStartProgramInternal);
  }, [
    onSetStartProgram,
    handleStartProgramInternal,
    formData.frequency,
    extendedProgram,
  ]);

  return (
    <>
      <StartProgramDialog
        open={isStartProgramDialogOpen}
        onClose={handleCloseStartProgramDialog}
        onConfirm={handleConfirmStartProgram}
      />
      {selectedProgramDetails.length > 0 && (
        <ProgramTrainingMenuDialog
          open={isTrainingMenuDialogOpen}
          onClose={handleCloseTrainingMenuDialog}
          date={selectedDate}
          gender={formData.gender}
          frequency={formData.frequency}
          program={selectedProgramDetails}
          dailyProgramId={selectedProgramDetails[0].daily_program_id}
        />
      )}
    </>
  );
};

export default StartProgramHandler;
