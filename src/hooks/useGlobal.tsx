// @ts-nocheck
import { create } from "zustand";
import axios from "axios";
import { resolveImageInput } from "../utils/ailabApi";

type GlobalState = {
  isLoading: boolean;
  error: string | null;
  userData: any;
  photos: any[];
  sendData: (initData: any) => void;
  uploadPhoto: (file: File | string) => Promise<void>;
  fetchPhotos: () => Promise<void>;
  deletePhoto: (photoId: number) => Promise<void>;
  updateUserDataGenerations: (
    count_generations: number,
    count_video_generations: number
  ) => Promise<void>;
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

      // const count_generations_test = 10230;
      // const count_video_generations_test = 12;
      // Тестирование данных о пользователе из-за CORS
      // const enrichedUser_test = {
      //   ...user,
      //   count_generations: count_generations_test,
      //   count_video_generations: count_video_generations_test,
      // };
      // set({ userData: enrichedUser_test, isLoading: false });

      // Дополнительные данные пока не работает
      try {
        const extraResponse = await axios.get(
          `https://usergen.pinpayn.fun/user/7541099300`,
          {
            headers: {
              Authorization: "dsfljslfnlkJ^&r68r7UIFiyf^URuyFKJFKJyc",
            },
          }
        );

        const { count_generations = 0, count_video_generations = 0 } =
          extraResponse.data;
        // Для тестов потому что Cors ereror

        const enrichedUser = {
          ...user,
          count_generations,
          count_video_generations,
        };

        set({ userData: enrichedUser, isLoading: false });
        console.log(enrichedUser, "userData");
      } catch (error: any) {
        console.log(error, "setuser");
        set({ userData: user, isLoading: false });
      }
    } catch (error: any) {
      const msg =
        error.response?.data?.detail || error.message || "Ошибка авторизации";

      set({ error: msg, isLoading: false });
    }
  },

  // 🔹 Загрузка одного фото
  uploadPhoto: async (file: File | string) => {
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
      const sortedPhotos = res.data.sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      console.log(sortedPhotos, "sorted res");
      set({ photos: sortedPhotos });
      // set({ photos: res.data });
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
  updateUserDataGenerations: async (
    count_generations: number,
    count_video_generations: number
  ) => {
    set((state) => ({
      userData: {
        ...state.userData, // сохраняем остальные поля
        count_generations,
        count_video_generations,
      },
    }));
  },
}));

export default useGlobal;
