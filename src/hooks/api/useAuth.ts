import {
  getEmailValidation,
  getIdValidation,
  getUserType,
  logout,
  ownerSignUp,
  patchAuthentication,
  reIssueAuthentication,
  reIssueToken,
  signIn,
  signUp,
  tempSignUp,
  withdraw,
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
import { RESTYPE } from '@/types/api/common';

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
      console.log('로그인 실패 : ', data.error?.code, data.error?.message);
    },
    onError: () => {
      navigate('/signin');
    },
  });
};

// 1.2 사용자 로그아웃 훅
export const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logout,
    onSuccess: (data: RESTYPE<null>) => {
      if (data.success) {
        deleteAccessToken();
        deleteRefreshToken();
        navigate('/splash');
      }
      console.log('로그아웃 실패 : ', data.error?.code, data.error?.message);
    },
    onError: () => {
      navigate('/profile');
    },
  });
};

// 1.3 JWT 재발급 훅
export const useReIssueToken = () => {
  return useMutation({
    mutationFn: reIssueToken,
    onSuccess: (data: RESTYPE<SignInResponse>) => {
      if (data.success) {
        setAccessToken(data.data.access_token);
        setRefreshToken(data.data.refresh_token);
      }
      console.log('JWT 재발급 실패 : ', data.error?.code, data.error?.message);
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
    onSuccess: (data: RESTYPE<TempSignUpResponse>) => {
      if (!data.success) {
        console.log(
          '임시 회원가입 실패 : ',
          data.error?.code,
          data.error?.message,
        );
      }
    },
  });
};

// 2.5  기본 유저 회원가입 훅
export const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data: RESTYPE<SignInResponse>) => {
      if (data.success) {
        deleteTemporaryToken();
        setAccessToken(data.data.access_token);
        setRefreshToken(data.data.refresh_token);
      }
      console.log('회원가입 실패 : ', data.error?.code, data.error?.message);
    },
    onError: () => {
      navigate('/');
    },
  });
};

// 2.6 기본 고용주 회원가입 훅
export const useOwnerSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ownerSignUp,
    onSuccess: (data: RESTYPE<SignInResponse>) => {
      if (data.success) {
        deleteTemporaryToken();
        setAccessToken(data.data.access_token);
        setRefreshToken(data.data.refresh_token);
      }
      console.log('회원가입 실패 : ', data.error?.code, data.error?.message);
    },
    onError: () => {
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
      if (data.success) {
        setTemporaryToken(data.data.temporary_token);
        navigate('/information');
      }
      console.log(
        '인증코드 검증 실패 : ',
        data.error?.code,
        data.error?.message,
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// 2.8 이메일 인증코드 재전송 훅
export const useReIssueAuthentication = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: reIssueAuthentication,
    onSuccess: (data: RESTYPE<TempSignUpResponse>) => {
      if (!data.success) {
        console.log(
          '인증코드 재전송 실패 : ',
          data.error?.code,
          data.error?.message,
        );
      }
    },
    onError: () => {
      navigate('/signup');
    },
  });
};

// 2.9 탈퇴하기 훅
export const useWithdraw = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: withdraw,
    onSuccess: (data: RESTYPE<null>) => {
      if (data.success) {
        deleteAccessToken();
        deleteRefreshToken();
      }
      console.log('탈퇴 실패 : ', data.error?.code, data.error?.message);
    },
    onError: () => {
      navigate('/splash');
    },
  });
};
