import { create } from 'zustand';

type CurrentPostIdStore = {
  currentPostId: number | null;
  updateCurrentPostId: (id: number) => void;
};

export const useCurrentPostIdStore = create<CurrentPostIdStore>()((set) => ({
  currentPostId: null,
  updateCurrentPostId: (newId: number) => set(() => ({ currentPostId: newId })),
}));

type CurrentApplicantIdStore = {
  currentApplicantId: number | null;
  updateCurrentApplicantId: (id: number) => void;
};

export const useCurrentApplicantIdStore = create<CurrentApplicantIdStore>()((set) => ({
  currentApplicantId: null,
  updateCurrentApplicantId: (newId: number) => set(() => ({ currentApplicantId: newId })),
}));

type CurrentDocumentIdStore = {
  currentDocumentId: number | null;
  updateCurrentDocumentId: (id: number) => void;
};

export const useCurrentDocumentIdStore = create<CurrentDocumentIdStore>()((set) => ({
  currentDocumentId: null,
  updateCurrentDocumentId: (newId: number) => set(() => ({ currentDocumentId: newId })),
}));
