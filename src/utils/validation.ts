export const validateTrainingMenuTitle = (menuName: string) => {
  if (!menuName.trim()) {
    return "メニューを入力してください";
  }

  return "";
};
