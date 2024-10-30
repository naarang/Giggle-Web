import {
  getEmailValidation,
  getIdValidation,
  getUserType,
  logout,
  patchAuthentication,
  reIssueAuthentication,
  reIssueToken,
  signIn,
  signUp,
  tempSignUp,
  withdraw,
  signUpEmployer,
} from '@/api/auth';
import {
  AuthenticationResponse,
  SignInResponse,
  TempSignUpResponse,
} from '@/types/api/auth';
import {
  deleteAccessToken,
  deleteRefreshToken,
  deleteTemporaryToken,
  setAccessToken,
  setRefreshToken,
  setTemporaryToken,
} from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEmailTryCountStore } from '@/store/signup';
import { useUserStore } from '@/store/user';
import { RESTYPE } from '@/types/api/common';
import { error } from 'console';

/**
 * 로그인 프로세스를 처리하는 커스텀 훅
 *
 * @function useSignIn
 * @returns {UseMutationResult} Tanstack Query의 useMutation 결과
 *
 * @description
 * 이 훅은 로그인 과정을 관리하며 다음과 같은 기능을 수행합니다:
 * 1. signIn 함수를 사용하여 로그인 요청을 보냅니다.
 * 2. 로그인 성공 시 액세스 토큰을 저장하고 홈페이지로 이동합니다.
 * 3. 로그인 실패 시 로그인 페이지로 리다이렉트합니다.
 *
 * @example
 * const { mutate: signIn, isLoading } = useSignIn();
 *
 * const handleSubmit = (data) => {
 *   signIn(data);
 * };
 *
 * if (isLoading) return <LoadingSpinner />;
 *
 * return <LoginForm onSubmit={handleSubmit} />;
 */

// 1.1 사용자 로그인 훅
export const useSignIn = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data: RESTYPE<SignInResponse>) => {
      if (data.success) {
        setAccessToken(data.data.access_token);
        setRefreshToken(data.data.refresh_token);
        navigate('/splash');
      }
    },
    onError: () => {
      alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
    },
  });
};

// 1.2 사용자 로그아웃 훅
export const useLogout = () => {
  const navigate = useNavigate();
  const { updateAccountType, updateName } = useUserStore();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 토큰 삭제
      deleteAccessToken();
      deleteRefreshToken();
      // 유저 타입 전역 변수 초기화
      updateAccountType(undefined);
      updateName('');
      // 스플래시 이동
      navigate('/splash');
    },
    onError: () => {
      alert('로그아웃을 다시 시도해주세요.');
      navigate('/profile');
    },
  });
};

// 1.3 JWT 재발급 훅
export const useReIssueToken = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: reIssueToken,
    onSuccess: (data: RESTYPE<SignInResponse>) => {
      setAccessToken(data.data.access_token);
      setRefreshToken(data.data.refresh_token);
      navigate('/splash'); // 재발급 후 유형 확인
    },
    onError: () => {
      alert('만료되었습니다. 다시 로그인해주세요.');
      navigate('/signin');
    },
  });
};

// 2.1 아이디 중복검사 훅
export const useGetIdValidation = (userId: string) => {
  return useQuery({
    queryKey: ['validId', userId],
    queryFn: () => getIdValidation(userId),
  });
};

// 2.2 이메일 중복검사 훅
export const useGetEmailValidation = (userEmail: string) => {
  return useQuery({
    queryKey: ['validEmail', userEmail],
    queryFn: () => getEmailValidation(userEmail),
  });
};

// 2.3 유학생/고용주 판단 훅 ** 로그인 이후 호출
export const useGetUserType = () => {
  return useQuery({
    queryKey: ['userType'],
    queryFn: getUserType,
  });
};

// 2.4 기본 임시회원가입 훅
export const useTempSignUp = () => {
  return useMutation({
    mutationFn: tempSignUp,
    onError: (error) => {
      console.log('임시 회원가입 실패 : ', error.message);
    },
  });
};

// 2.5  기본 유저 회원가입 훅
export const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data: RESTYPE<SignInResponse>) => {
      deleteTemporaryToken();
      setAccessToken(data.data.access_token);
      setRefreshToken(data.data.refresh_token);
    },
    onError: () => {
      alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
      navigate('/');
    },
  });
};

// 2.7 이메일 인증코드 검증 훅
export const usePatchAuthentication = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: patchAuthentication,
    onSuccess: (data: RESTYPE<AuthenticationResponse>) => {
      setTemporaryToken(data.data.temporary_token);
      navigate('/information');
    },
    onError: (error) => {
      alert('인증코드를 다시 확인해주세요.');
      console.log(error);
    },
  });
};

// 2.8 이메일 인증코드 재전송 훅
export const useReIssueAuthentication = () => {
  const navigate = useNavigate();
  const { updateTryCnt } = useEmailTryCountStore();
  return useMutation({
    mutationFn: reIssueAuthentication,
    onSuccess: (data: RESTYPE<TempSignUpResponse>) => {
      // 이메일 재발송 횟수 업데이트
      updateTryCnt(data.data.try_cnt);
    },
    onError: () => {
      alert('인증코드 재발송이 실패하였습니다. 회원가입을 다시 시도해주세요.');
      navigate('/signup');
    },
  });
};

// 2.9 탈퇴하기 훅
export const useWithdraw = () => {
  const navigate = useNavigate();
  const { updateAccountType, updateName } = useUserStore();
  return useMutation({
    mutationFn: withdraw,
    onSuccess: () => {
      // 토큰 삭제
      deleteAccessToken();
      deleteRefreshToken();
      // 유저 타입 전역 변수 초기화
      updateAccountType(undefined);
      updateName('');
      // 스플래시 이동
      navigate('/splash');
    },
    onError: () => {
      alert('탈퇴에 실패하였습니다.');
      navigate('/splash');
    },
  });
};

export const useSignupEmployer = (setSuccess: () => void) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUpEmployer,
    onSuccess: () => {
      setSuccess();
    },
    onError: () => {
      navigate('/signin');
    },
  });
};
