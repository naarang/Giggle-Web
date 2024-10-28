import { UserType } from '@/constants/user';
import { create } from 'zustand';

type UserTypeStore = {
  account_type: UserType;
  updateAccountType: (cnt: UserType) => void;
};

export const useUserTypeStore = create<UserTypeStore>()((set) => ({
  account_type: UserType.USER,
  updateAccountType: (account_type) =>
    set(() => ({ account_type: account_type })),
}));

type UserNameStore = {
  name: string;
  updateName: (name: string) => void;
};

export const useUserNameStore = create<UserNameStore>()((set) => ({
  name: '',
  updateName: (name) => set(() => ({ name: name })),
}));
