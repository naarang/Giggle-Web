import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type EmailTryCountStore = {
  try_cnt: number;
  updateTryCnt: (cnt: number) => void;
};

export const useEmailTryCountStore = create(
  persist<EmailTryCountStore>(
    (set) => ({
      try_cnt: 0,
      updateTryCnt: (try_cnt) => set(() => ({ try_cnt: try_cnt })),
    }),
    {
      name: 'emailTryCountStore',
    },
  ),
);
