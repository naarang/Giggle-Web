import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SplashIcon from '@/assets/icons/Splash.svg?react';
import { getAccessToken, getRefreshToken } from '@/utils/auth';
import { useGetUserType, useReIssueToken } from '@/hooks/api/useAuth';
import { useUserStore } from '@/store/user';

const Splash = () => {
  const navigate = useNavigate();
  // 계정 타입(유학생, 고용주), 유저 이름 업데이트 함수
  const { updateAccountType, updateName } = useUserStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleApiCall();
    }, 3000); // 3초 대기

    return () => clearTimeout(timeoutId);
  }, []);

  const { data: UserTypeResponse } = useGetUserType();
  const { mutate: reIssueToken } = useReIssueToken();

  // 유저 타입 판단 함수
  const handleGetUserType = () => {
    if (UserTypeResponse && UserTypeResponse.success) {
      const { account_type, name } = UserTypeResponse.data;
      updateAccountType(account_type);
      updateName(name);
      navigate('/');
    }
  };

  // 비로그인 상태 설정 함수
  const setGuest = () => {
    updateAccountType(undefined);
    updateName('');
  };

  // API 호출 핸들러
  const handleApiCall = async () => {
    const access = getAccessToken();
    const refresh = getRefreshToken();

    try {
      // 1. access, refresh 모두 없는 경우
      if (!access && !refresh) {
        setGuest();
        navigate('/'); // 비로그인 상태로 메인 이동
        return;
      }

      // 2. access, refresh 모두 있는 경우
      if (access && refresh) {
        // 2-1. user type 응답 성공
        if (UserTypeResponse) {
          handleGetUserType(); // 유저 타입을 처리하는 함수 호출

          // 2-2. access 토큰이 만료되었을 경우(401)
          if (UserTypeResponse.error?.code == 401) {
            setGuest();
            // 2-2-1. API 호출 JWT 재발급
            reIssueToken(); // 토큰 재발급을 기다림
          }
        } else {
          // UserTypeResponse가 정의되지 않은 경우
          setGuest();
          return;
        }
      }
    } catch (error) {
      setGuest();
      navigate('/'); // 비로그인 상태로 메인 이동
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#FEF387] flex justify-center items-center">
      <SplashIcon />
    </div>
  );
};

export default Splash;
