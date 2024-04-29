export interface TrainingSet {
  setId: number;
  weight: number;
  reps: number;
  completed: boolean;
}

export interface MenuData {
  menuId: number;
  menuName: string;
  sets: TrainingSet[]; // セット情報を追加
}
