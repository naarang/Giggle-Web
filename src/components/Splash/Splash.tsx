import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SplashIcon from '@/assets/icons/Splash.svg?react';
import { getAccessToken, getRefreshToken } from '@/utils/auth';
import { useGetUserType, useReIssueToken } from '@/hooks/api/useAuth';
import { useUserStore } from '@/store/user';
import { log } from 'console';

const Splash = () => {
  const navigate = useNavigate();
  // 계정 타입(유학생, 고용주), 유저 이름 업데이트 함수
  const { updateAccountType, updateName } = useUserStore();

  const { data: UserTypeResponse } = useGetUserType();
  const { mutate: reIssueToken } = useReIssueToken();

  useEffect(() => {
    handleApiCall();
    const timeoutId = setTimeout(() => {}, 3000); // 3초 대기

    return () => clearTimeout(timeoutId);
  }, []);

  // 비로그인 상태 설정 함수
  const setGuest = () => {
    updateAccountType(undefined);
    updateName('');
  };

  // API 호출 핸들러
  useEffect(() => {
    if (UserTypeResponse === undefined) return;
    handleApiCall();
  }, [UserTypeResponse]);

  const handleApiCall = async () => {
    const access = getAccessToken();
    const refresh = getRefreshToken();

    try {
      if (!access && !refresh) {
        setGuest();
        navigate('/');
        return;
      }

      if (access && refresh) {
        if (UserTypeResponse?.success) {
          const { account_type, name } = UserTypeResponse.data;
          updateAccountType(account_type);
          updateName(name);
          navigate('/');
        } else if (UserTypeResponse?.error?.code === 401) {
          reIssueToken();
        } else {
          setGuest();
        }
      }
    } catch (error) {
      alert('로그인 오류입니다 다시 시도해주세요');
      setGuest();
      navigate('/');
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#FEF387] flex justify-center items-center">
      <SplashIcon />
    </div>
  );
};

export default Splash;
