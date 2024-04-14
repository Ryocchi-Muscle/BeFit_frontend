export interface TrainingDayProps {
  setTrainingDay: (date: Date | null) => void;
  totalDays: number;
  startDate: Date;
}

export interface TrainingSetProps {
  key: number;
  number: number;
}

export interface AddTrainigMenuProps {
  setTrainingMenus: (menus: any[]) => void;
}

interface TrainingRecordProps {
  // ここに必要なPropsがあれば定義
}
