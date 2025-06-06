// @ts-nocheck
export const handleFileUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  uploadPhoto: any
) => {
  const file = e.target.files?.[0];
  if (file) {
    console.log("Загруженный файл:", file);
    // TODO: обработка файла,
    uploadPhoto(file);
  }
};

export const openFileDialog = (fileInputRef) => {
  fileInputRef.current?.click();
};

export const handleClickBuyCredits = (webApp) => {
  const botUsername = "tes2t_mini_app_bot";
  const command = "buy_credits"; // команда, которую вы хотите передать
  const link = `https://t.me/${botUsername}?start=${command}`;

  webApp.openLink(link);
};
