// @ts-nocheck
import axios from "axios";
import { ButtonsFace } from "../EditorPage/photoTools";

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

export const sendUserGenerations = async (
  {
    count_generations,
    count_video_generations,
    filter_name,
    mode,
    level,
    usage_count_generations,
    usage_count_video_generations,
  },
  userId = 7541099300
) => {
  const payload = {
    count_generations,
    count_video_generations,
    filter_name,
    mode,
    level,
    usage_count_generations,
    usage_count_video_generations,
  };

  try {
    const response = await axios.post(
      `https://usergen.pinpayn.fun/user/${userId}`,
      payload,
      {
        headers: {
          Authorization: "dsfljslfnlkJ^&r68r7UIFiyf^URuyFKJFKJyc",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Данные успешно отправлены:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Ошибка при отправке данных:",
      error.response?.data || error.message
    );
  }
};

export const getNameByKey = (key) => {
  const item = ButtonsFace.find((el) => el.key === key);
  return item ? item.name : null;
};
