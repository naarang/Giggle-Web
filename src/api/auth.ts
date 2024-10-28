import {
  AuthenticationRequest,
  AuthenticationResponse,
  ReIssueAuthenticationRequest,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  TempSignUpRequest,
  TempSignUpResponse,
  UserTypeResponse,
  ValidationResponse,
} from '@/types/api/auth';
import { api } from '@/api/index.ts';
import { apiWithoutAuth } from '@/api/index.ts';
import { OwnerInfoRequest } from '@/types/api/users';
import { RESTYPE } from '@/types/api/common';
import { EmployerRegistrationRequest } from '@/types/api/employ';

/**
 * 사용자 로그인을 처리하는 함수
 *
 * @async
 * @function signIn
 * @param {SignInRequest} signinInfo - 로그인에 필요한 사용자 정보
 * @returns {Promise<SignInResponse>} 로그인 결과 및 사용자 정보
 * @throws {Error} API 요청 실패 시 에러를 throw
 *
 * @description
 * 이 함수는 주로 useSignIn 커스텀 훅 내부에서 사용됩니다.
 * 직접 호출하기보다는 useSignIn 훅을 통해 사용하는 것이 권장됩니다.
 *
 * @see useSignIn
 *
 * @example useSignIn 훅을 통한 사용 (권장)
 * const { mutate: signIn } = useSignIn();
 * signIn({ email: 'user@example.com', password: 'password123' });
 */

// 1.1 사용자 로그인
export const signIn = async (
  signinInfo: SignInRequest,
): Promise<RESTYPE<SignInResponse>> => {
  const response = await apiWithoutAuth.post('/auth/login', signinInfo);
  return response.data;
};

// 1.2 사용자 로그아웃
export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

// 1.3 JWT 재발급
export const reIssueToken = async (): Promise<RESTYPE<SignInResponse>> => {
  const response = await api.post('/auth/reissue/token');
  return response.data;
};

// 2.1 아이디 중복검사
export const getIdValidation = async (
  userId: string,
): Promise<RESTYPE<ValidationResponse>> => {
  const response = await apiWithoutAuth.get(
    `/auth/validations/id?id=${userId}`,
  );
  return response.data;
};

// 2.2 이메일 중복검사
export const getEmailValidation = async (
  userEmail: string,
): Promise<RESTYPE<ValidationResponse>> => {
  const response = await apiWithoutAuth.get(
    `/auth/validations/email?email=${userEmail}`,
  );
  return response.data;
};

// 2.3 유학생/고용주 판단 ** 로그인 이후 호출
export const getUserType = async (): Promise<RESTYPE<UserTypeResponse>> => {
  const response = await api.get('/auth/briefs');
  return response.data;
};

// 2.4 기본 임시회원가입
export const tempSignUp = async (
  signupInfo: TempSignUpRequest,
): Promise<RESTYPE<TempSignUpResponse>> => {
  const response = await apiWithoutAuth.post('/auth/sign-up', signupInfo);
  return response.data;
};

// 2.5  기본 유저 회원가입
export const signUp = async (
  signupInfo: SignUpRequest,
): Promise<RESTYPE<SignUpResponse>> => {
  const response = await apiWithoutAuth.post('/auth/users', signupInfo);
  return response.data;
};

// 2.6 기본 고용주 회원가입
export const ownerSignUp = async (
  signupInfo: OwnerInfoRequest,
  logoImage?: File,
): Promise<RESTYPE<SignUpResponse>> => {
  const formData = new FormData();
  // 회사 로고
  if (logoImage) {
    formData.append('logo_image', logoImage);
  }
  formData.append('signup_info', JSON.stringify(signupInfo));
  const response = await apiWithoutAuth.post('/auth/owners', formData);
  return response.data;
};

// 2.7 이메일 인증코드 검증
export const patchAuthentication = async (
  info: AuthenticationRequest,
): Promise<RESTYPE<AuthenticationResponse>> => {
  const response = await apiWithoutAuth.patch(
    '/auth/validations/authentication-code',
    info,
  );
  return response.data;
};

// 2.8 이메일 인증코드 재전송
export const reIssueAuthentication = async (
  info: ReIssueAuthenticationRequest,
): Promise<RESTYPE<TempSignUpResponse>> => {
  const response = await apiWithoutAuth.patch(
    '/auth/reissue/authentication-code',
    info,
  );
  return response.data;
};

// 2.9 탈퇴하기
export const withdraw = async () => {
  const response = await api.delete('/auth/withdraw');
  return response.data;
};

export const signUpEmployer = async (
  signupInfo: EmployerRegistrationRequest,
): Promise<{ success: boolean }> => {
  const response = await api.post(`/auth/owners`, signupInfo);
  return response.data;
};
