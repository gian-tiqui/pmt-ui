import { create } from "zustand";

interface State {
  sidebarSignal: boolean;
  setSidebarSignal: (sidebarSignal: boolean) => void;
}

const useSidebarSignalStore = create<State>((set) => ({
  sidebarSignal: false,
  setSidebarSignal: (sidebarSignal: boolean) => set({ sidebarSignal }),
}));

export default useSidebarSignalStore;
