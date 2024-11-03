import { create } from 'zustand';

type CurrentPostIdStore = {
  currentPostId: number | null;
  updateCurrentPostId: (id: number) => void;
};

export const useCurrentPostIdStore = create<CurrentPostIdStore>()((set) => ({
  currentPostId: null,
  updateCurrentPostId: (newId: number) => set(() => ({ currentPostId: newId })),
}));
