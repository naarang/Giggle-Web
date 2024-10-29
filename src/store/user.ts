import { UserType } from '@/constants/user';
import { create } from 'zustand';

type UserStore = {
  account_type: UserType | undefined; // 계정 유형(유학생, 고용주)
  name: string; // 이름
  updateAccountType: (account_type: UserType | undefined) => void; // 계정 유형 업데이트 함수
  updateName: (name: string) => void; // 이름 업데이트 함수
};

export const useUserStore = create<UserStore>()((set) => ({
  account_type: undefined,
  name: '',
  updateAccountType: (account_type) => set(() => ({ account_type })),
  updateName: (name) => set(() => ({ name })),
}));
