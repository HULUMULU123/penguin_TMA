import { create } from "zustand";
import axios from "axios";
import { resolveImageInput } from "../utils/ailabApi";

type GlobalState = {
  isLoading: boolean;
  error: string | null;
  userData: any;
  photos: any[];
  sendData: (initData: any) => void;
  uploadPhoto: (file: File) => Promise<void>;
  fetchPhotos: () => Promise<void>;
  deletePhoto: (photoId: number) => Promise<void>;
};

const useGlobal = create<GlobalState>((set, get) => ({
  isLoading: false,
  error: null,
  userData: null,
  photos: [],

  sendData: async (initData) => {
    set({ isLoading: true, error: null });

    try {
      // Авторизация Telegram
      const response = await axios.post(
        "https://tgbotface.fun/api/telegram/login",
        { initData },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const { token, user } = response.data;
      sessionStorage.setItem("token", token);

      // Дополнительные данные
      const extraResponse = await axios.get(
        `http://212.237.217.54:8008/user/${user.telegram_id}`,
        {
          headers: {
            Authorization: "dsfljslfnlkJ^&r68r7UIFiyf^URuyFKJFKJyc",
          },
        }
      );

      const { count_generations, count_video_generations } = extraResponse.data;

      const enrichedUser = {
        ...user,
        count_generations,
        count_video_generations,
      };

      set({ userData: enrichedUser, isLoading: false });
    } catch (error: any) {
      const msg =
        error.response?.data?.detail || error.message || "Ошибка авторизации";
      set({ error: msg, isLoading: false });
    }
  },

  // 🔹 Загрузка одного фото
  uploadPhoto: async (file: File) => {
    const token = sessionStorage.getItem("token");
    if (!token) return set({ error: "Нет токена авторизации" });
    const processedFile = await resolveImageInput(file);

    const formData = new FormData();
    formData.append("photo", processedFile);

    try {
      await axios.post("https://tgbotface.fun/api/photos", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      // Автообновление списка фото
      await get().fetchPhotos();
    } catch (error: any) {
      const msg =
        error.response?.data?.detail || error.message || "Ошибка загрузки фото";
      set({ error: msg });
    }
  },

  // 🔹 Получение всех фото
  fetchPhotos: async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return set({ error: "Нет токена авторизации" });

    try {
      const res = await axios.get("https://tgbotface.fun/api/photos", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      console.log(res.data, "res");
      set({ photos: res.data });
    } catch (error: any) {
      const msg =
        error.response?.data?.detail ||
        error.message ||
        "Ошибка получения фото";
      set({ error: msg });
    }
  },

  // 🔹 Удаление фото по ID
  deletePhoto: async (photoId: number) => {
    const token = sessionStorage.getItem("token");
    if (!token) return set({ error: "Нет токена авторизации" });

    try {
      await axios.delete(`https://tgbotface.fun/api/photos/${photoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      // Обновляем после удаления
      await get().fetchPhotos();
    } catch (error: any) {
      const msg =
        error.response?.data?.detail || error.message || "Ошибка удаления фото";
      set({ error: msg });
    }
  },
}));

export default useGlobal;
