import { create } from "zustand";

interface State {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

const useDarkModeStore = create<State>((set) => ({
  isDarkMode: false,
  setIsDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
}));

export default useDarkModeStore;
