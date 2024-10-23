import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SplashIcon from '@/assets/icons/Splash.svg?react';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleApiCall();
    }, 3000); // 3초 대기

    return () => clearTimeout(timeoutId);
  }, []);

  const handleApiCall = async () => {
    const access = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');

    // 1-1. access, refresh 모두 없는 경우
    if (!access && !refresh) {
      navigate('/'); // 비로그인 상태일 때 메인 C로 이동
    }
    // 1-2. access, refresh 모두 있는 경우
    /*
    else {
      try {
        const response = await fetch('/api/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        if (response.status === 401) {
          const newAccess = await refreshAccessToken(refresh);
          if (newAccess) {
            localStorage.setItem('access_token', newAccess);
            await handleApiCall(); // 재시도
          }
        } else if (response.ok) {
          const data = await response.json();
          const { type, name } = data;

          // 전역 상태 업데이트 후 페이지 이동
          setGlobalState({ type, name });

          if (type === 'USER') {
            navigate('/'); // 유학생 로그인 상태
          } else if (type === 'OWNER') {
            navigate('/owner'); // 고용주 로그인 상태
          }
        }
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    }
  };

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const response = await fetch('/api/v1/auth/reissue/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (response.ok) {
        const { access } = await response.json();
        return access;
      } else {
        navigate('/login'); // 로그인 페이지로 이동
      }
    } catch (error) {
      console.error('토큰 재발급 오류:', error);
      navigate('/login');
    }
    */
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#FEF387] flex justify-center items-center">
      <SplashIcon />
    </div>
  );
};

export default Splash;
