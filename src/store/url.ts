import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CurrentPostIdStore = {
  currentPostId: number | null;
  updateCurrentPostId: (id: number) => void;
};

export const useCurrentPostIdStore = create(
  persist<CurrentPostIdStore>(
    (set) => ({
      currentPostId: null,
      updateCurrentPostId: (newId: number) =>
        set(() => ({ currentPostId: newId })),
    }),
    {
      name: 'currentPostIdStore',
    },
  ),
);

type CurrentApplicantIdStore = {
  currentApplicantId: number | null;
  updateCurrentApplicantId: (id: number) => void;
};

export const useCurrentApplicantIdStore = create<CurrentApplicantIdStore>()(
  (set) => ({
    currentApplicantId: null,
    updateCurrentApplicantId: (newId: number) =>
      set(() => ({ currentApplicantId: newId })),
  }),
);

type CurrentDocumentIdStore = {
  currentDocumentId: number | null;
  updateCurrentDocumentId: (id: number) => void;
};

export const useCurrentDocumentIdStore = create<CurrentDocumentIdStore>()(
  (set) => ({
    currentDocumentId: null,
    updateCurrentDocumentId: (newId: number) =>
      set(() => ({ currentDocumentId: newId })),
  }),
);

type CurrentPostIdStoreEmployee = {
  currentPostId: number | null;
  updateCurrentPostId: (id: number) => void;
};

export const useCurrentPostIdEmployeeStore =
  create<CurrentPostIdStoreEmployee>()((set) => ({
    currentPostId: null,
    updateCurrentPostId: (newId: number) =>
      set(() => ({ currentPostId: newId })),
  }));
