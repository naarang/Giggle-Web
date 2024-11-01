import SigninInputSection from '@/components/Signin/SigninInputSection';
import SigninSocialButtons from '@/components/Signin/SigninSocialButtons';
import { useUserStore } from '@/store/user';
import { deleteAccessToken, deleteRefreshToken } from '@/utils/auth';
import { useEffect } from 'react';

const SigninPage = () => {
  const { updateAccountType, updateName } = useUserStore();

  useEffect(() => {
    // 토큰 삭제
    deleteAccessToken();
    deleteRefreshToken();
    // 유저 타입 전역 변수 초기화
    updateAccountType(undefined);
    updateName('');
  }, []);

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center px-7">
      <div className="text-[#1E1926] text-[1.75rem] font-semibold">Sign In</div>
      <SigninInputSection />
      {/* <SigninSocialButtons /> */}
    </div>
  );
};

export default SigninPage;
