export interface ApiResponse<T>{
  data: T;
  error?: string;
}

export interface TrainingDayData {
  dayNumber: number; // 1から90の間の日
}
