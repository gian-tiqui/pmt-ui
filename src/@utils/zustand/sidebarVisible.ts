import { create } from "zustand";

interface State {
  sidebarVisible: boolean;
  setSidebarVisible: (sidebarVisible: boolean) => void;
}

const useSidebarVisibleStore = create<State>((set) => ({
  sidebarVisible: true,
  setSidebarVisible: (sidebarVisible: boolean) => set({ sidebarVisible }),
}));

export default useSidebarVisibleStore;
