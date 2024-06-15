export interface TrainingSet {
  setId: number;
  weight: number | string;
  reps: number | string;
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

export interface ProgramDetail {
  menu: string;
  set_info: string;
  daily_program_id: number;
}

export interface DailyProgram {
  week: number;
  day: number;
  details: {
    menu: string;
    set_info: string;
  }[];
}

export interface Program {
  id: number;
  title: string;
  details: ProgramDetail[];
  uniqueId: string;
  daily_programs: DailyProgram[];
}
