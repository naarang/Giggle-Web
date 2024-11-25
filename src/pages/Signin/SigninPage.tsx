import SigninInputSection from '@/components/Signin/SigninInputSection';
import { useUserStore } from '@/store/user';
import { deleteAccessToken, deleteRefreshToken } from '@/utils/auth';
import { useEffect } from 'react';
import CloseIcon from '@/assets/icons/CloseIcon.svg?react';
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
  const { updateAccountType, updateName } = useUserStore();
  const navigate = useNavigate();

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
      <CloseIcon
        onClick={() => navigate('/')}
        className="fixed top-6 right-6"
      />
      <div className="text-[#1E1926] text-[1.75rem] font-semibold">Sign In</div>
      <SigninInputSection />
      {/* <SigninSocialButtons /> */}
    </div>
  );
};

export default SigninPage;
