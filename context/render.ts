import { create } from "zustand";

interface State {
  render: number;
  increase: () => void;
}

export const useStore = create<State>()((set) => ({
  render: 0,
  increase: () => set((state) => ({ render: state.render + 1 })),
}));
