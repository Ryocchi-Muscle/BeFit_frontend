export interface TrainingDayProps {
  setTrainingDay: (date: Date) => void;
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
}
//Set型を定義
export type Set = {
  weight: string;
  reps: string;
  completed: boolean;
};

export type TrainingMenu = {
  bodyPart: string;
  exerciseName: string;
  sets: Set[];
};

export type TrainingMenus = TrainingMenu[];

interface TrainingRecordProps {
  // ここに必要なPropsがあれば定義
}
