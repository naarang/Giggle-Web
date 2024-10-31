import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SplashIcon from '@/assets/icons/Splash.svg?react';
import { getAccessToken, getRefreshToken } from '@/utils/auth';
import { useGetUserType, useReIssueToken } from '@/hooks/api/useAuth';
import { useUserStore } from '@/store/user';

const Splash = () => {
  const navigate = useNavigate();
  const { updateAccountType, updateName } = useUserStore();
  const { data: userTypeResponse } = useGetUserType();
  const { mutate: reIssueToken } = useReIssueToken();

  useEffect(() => {
    const handleApiCall = async () => {
      const access = getAccessToken();
      const refresh = getRefreshToken();

      try {
        // 1. access, refresh 모두 없는 경우
        if (!access && !refresh) {
          setGuest();
          return;
        }

        // 2. access, refresh 모두 있는 경우
        if (access && refresh) {
          // 2-1. user type 응답 성공
          if (userTypeResponse?.success) {
            const { account_type, name } = userTypeResponse.data;
            updateAccountType(account_type);
            updateName(name);
          }
          // 2-2. access 토큰이 만료되었을 경우(401)
          else if (userTypeResponse?.error?.code === 401) {
            // 2-2-1. API 호출 - JWT 재발급
            reIssueToken();
          }
          // 2-3. user type 응답 실패
          else {
            setGuest();
          }
        }
      } catch (error) {
        alert('로그인 오류입니다 다시 시도해주세요');
        setGuest();
      } finally {
        // 스플래시 화면 2초간 유지
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate('/');
      }
    };

    handleApiCall();
  }, [userTypeResponse]);

  // 비로그인 상태 설정 함수
  const setGuest = () => {
    updateAccountType(undefined);
    updateName('');
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#FEF387] flex justify-center items-center">
      <SplashIcon />
    </div>
  );
};

export default Splash;
