import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  pk: string;
  email: string;
  first_name: string;
  last_name: string;
};

type State = {
  user: User | null;
  token: string | null;
};

type Action = {
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  reset: () => void;
};

const initialState = {
  user: null,
  token: null,
};

export const useAuthStore = create<State & Action>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setUser: (user: User) => set({ user }),
      setToken: (token: string) => set({ token }),
      reset: () => set({ ...initialState }),
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
