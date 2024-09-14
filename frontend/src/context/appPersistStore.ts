import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// type Site = {
//   id: number;
//   name: string;
//   url: string;
//   description: string;
// };

type State = {
  currentSite: number | null;
};

type Action = {
  setCurrentSite: (siteId: number) => void;
  reset: () => void;
};

const initialState = {
  currentSite: null,
};

export const useAppPersistStore = create<State & Action>()(
  persist(
    (set, get) => ({
      currentSite: null,
      setCurrentSite: (site: number) => {
        set({ currentSite: site });
      },
      reset: () => set({ ...initialState }),
    }),
    {
      name: "appStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
