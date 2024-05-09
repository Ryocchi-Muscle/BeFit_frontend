export interface TrainingSet {
  setId: number;
  weight: number;
  reps: number;
  completed: boolean;
}

export interface MenuData {
  menuId: number;
  menuName: string;
  body_part: string | null;
  sets: TrainingSet[]; // セット情報を追加
}

export interface BodyPart {
  id: number;
  name: string;
}
