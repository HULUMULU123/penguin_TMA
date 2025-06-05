import { create } from "zustand";
import axios from "axios";

type GlobalState = {
  // access: string;
  // refresh: string;
  token: string;
  isLoading: boolean;
  error: string | null;
  userData: any;
  sendData: (initData: any) => void;
};

const useGlobal = create<GlobalState>((set) => ({
  isLoading: false,
  error: null,
  userData: null,
  token: "",
  // access: "",
  // refresh: "",

  sendData: async (initData) => {
    set({ isLoading: true, error: null });

    try {
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
      console.log(response);
      const { token, user } = response.data;
      console.log(token, user);
      set({
        token,
        userData: user,
        isLoading: false,
      });

      sessionStorage.setItem("token", token);
    } catch (error: any) {
      const msg =
        error.response?.data?.detail || error.message || "Ошибка авторизации";
      set({ error: msg, isLoading: false });
    }
  },
}));

export default useGlobal;
