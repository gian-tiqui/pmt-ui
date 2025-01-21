import { create } from "zustand";

interface State {
  projectId: number | undefined;
  setProjectId: (projectId: number) => void;
}

const useProjectIdStore = create<State>((set) => ({
  projectId: undefined,
  setProjectId: (projectId: number) => set({ projectId }),
}));

export default useProjectIdStore;
