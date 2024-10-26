import { getApplicationCounts, getBookmarksCounts, getUserProfile, getUserSummaries, patchUserProfile } from '@/api/mypage';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 3.1 (유학생) 유저 프로필 조회하기 API 통신 훅
export const useGetUserProfile = () => {
  return useMutation({
    mutationFn: getUserProfile,
    onError: (error) => {
      console.error('프로필 조회 실패', error);
    },
  });
};

// 3.3 (유학생) 유저 요약 정보 조회하기
export const useGetUserSummaries = () => {
  return useMutation({
    mutationFn: getUserSummaries,
    onError: (error) => {
      console.error('프로필 조회 실패', error);
    },
  });
};

// 6.4 (유학생) 지원 현황(개수) 확인하기
export const useGetApplicationCounts = () => {
  return useMutation({
    mutationFn: getApplicationCounts,
    onError: (error) => {
      console.error('지원 현황 개수 확인 실패', error);
    },
  });
};

// 5.2 (유학생) 북마크 현황(개수) 확인하기
export const userGetBookmarksCounts = () => {
  return useMutation({
    mutationFn: getBookmarksCounts,
    onError: (error) => {
      console.error('북마크 현황(개수) 확인 실패', error);
    },
  });
};

// 3.5 (유학생) 프로필 수정
export const usePatchUserProfile = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: patchUserProfile,
    onSuccess: () => {
      navigate('/profile');
    },
    onError: (error) =>{
      console.error('프로필 조회 실패', error);
    },
  });
};