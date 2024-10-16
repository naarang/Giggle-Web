export const setAccessToken = (token: string | null) => {
  localStorage.setItem('authorization', token || '');
};

/**
 * 로컬 스토리지에서 인증 토큰을 가져오는 함수
 *
 * @function getAccessToken
 * @returns {string | null} 저장된 인증 토큰 또는 null
 *
 * @description
 * 이 함수는 로컬 스토리지에서 'authorization' 키로 저장된 인증 토큰을 반환합니다.
 * 토큰이 없는 경우 null을 반환합니다.
 */
// @utils/auth.ts
export const getAccessToken = () => {
  return localStorage.getItem('authorization');
};


export const deleteAccessToken = () => {
  localStorage.removeItem('authorization');
};