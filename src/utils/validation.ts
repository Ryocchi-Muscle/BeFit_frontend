export const validateTrainingMenuTitle = (tripTitle: string) => {
  if (!/\S/.test(tripTitle)) {
    return "トレーニングメニューを入力してください";
  }

  return "";
};
