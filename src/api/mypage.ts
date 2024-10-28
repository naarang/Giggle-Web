import { api } from '.';
import { UserLanguageRequest, UserProfileBody } from '@/types/api/mypage';

// 3.1 (유학생) 유저 프로필 조회하기
export const getUserProfile = async () => {
  const response = await api.get('/users/details');
  return response.data;
};

// 3.3 (유학생) 유저 요약 정보 조회하기
export const getUserSummaries = async () => {
  const response = await api.get('/users/summaries');
  return response.data;
};

// 3.5 (유학생) 프로필 수정
export const patchUserProfile = async ({
  image,
  userProfile,
}: {
  image?: File;
  userProfile: UserProfileBody;
}) => {
  const formData = new FormData();

  // 이미지가 있을 경우 FormData에 추가
  if (image) {
    formData.append('image', image);
  }

  // JSON 데이터를 문자열로 변환 후 Blob으로 FormData에 추가(FormData는 객체가 포함될 수 없음)
  const jsonBlob = new Blob([JSON.stringify(userProfile)], {
    type: 'application/json',
  });
  formData.append('body', jsonBlob);

  const response = await api.patch('/users', formData);
  return response.data;
};

// 3.7 (유학생/고용주) 알람 설정 변경하기
export const patchNotificationAllowed = async (
  is_notification_allowed: boolean,
) => {
  const response = await api.patch('/notification-allowed', {
    is_notification_allowed: is_notification_allowed,
  });
  return response.data;
};

// 3.8 (유학생) 앱 내 언어 수정
export const patchUserLanguage = async (language: UserLanguageRequest) => {
  const response = await api.patch('/users/languages', language);
  return response.data;
};

// 5.1 (유학생) 북마크한 공고 리스트 조회하기
export const getBookmarks = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const response = await api.get(
    `/users/book-marks/overviews?page=${page}&size=${size}`,
  );
  return response.data;
};

// 5.2 (유학생) 북마크 현황(개수) 확인하기
export const getBookmarksCounts = async () => {
  const response = await api.get('/users/book-marks/counts');
  return response.data;
};

// 6.4 (유학생) 지원 현황(개수) 확인하기
export const getApplicationCounts = async () => {
  const response = await api.get('/users/user-owner-job-postings/counts');
  return response.data;
};
