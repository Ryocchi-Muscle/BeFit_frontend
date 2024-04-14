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
  trainingMenus: any[]; 
  setTrainingMenus: React.Dispatch<React.SetStateAction<any[]>>;
  trainingSets: Set[][]; // 2次元配列になっていることに注意
  updateTrainingSets: (menuIndex: number, newSets: Set[]) => void;
}
//Set型を定義
export type Set = {
  weight: string;
  reps: string;
  completed: boolean;
}

interface TrainingRecordProps {
  // ここに必要なPropsがあれば定義
}
