import { create } from 'zustand';

// 회원가입시, 이메일 인증 횟수 제한 확인을 위한 전역상태 관리
type EmailTryCountStore = {
  try_cnt: number;
  updateTryCnt: (cnt: number) => void;
};

export const useEmailTryCountStore = create<EmailTryCountStore>()((set) => ({
  try_cnt: 0,
  updateTryCnt: (try_cnt) => set(() => ({ try_cnt: try_cnt })),
}));

// 회원가입 후 자동 로그인을 위한 전역상태 관리
type userInfoforSigninStore = {
  id: string;
  password: string;
  updateId: (id: string) => void;
  updatePassword: (password: string) => void;
};

export const useUserInfoforSigninStore = create<userInfoforSigninStore>()(
  (set) => ({
    id: '',
    password: '',
    updateId: (id) => set(() => ({ id: id })),
    updatePassword: (password) => set(() => ({ password: password })),
  }),
);
