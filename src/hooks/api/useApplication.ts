import {
  getEmployerApplicationDetail,
  getEmployerApplicationSummary,
  patchInterviewFinish,
  patchResumeAccepted,
  getPostValidation,
  postApplyPost,
  getApplicationDetail,
  getRecruiterInfo,
  getSchoolInfo,
  patchContactCoordinator,
  patchApplyHiKorea,
  patchHiKoreaResult,
} from '@/api/application';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 4.8 (유학생) 공고 지원 자격 확인하기 훅
export const useGetPostValidation = (id: number, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['application', id],
    queryFn: () => getPostValidation(id),
    enabled: isEnabled,
  });
};

// 4.9 (유학생) 공고 지원하기 훅
export const usePostApplyPost = () => {
  return useMutation({
    mutationFn: postApplyPost,
    onError: (error) => {
      console.error('공고 지원하기 실패', error);
    },
  });
};

// 6.2 (유학생) 지원 상태 상세 조회하기 훅
export const useGetApplicationDetail = (id: number, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['application', id],
    queryFn: () => getApplicationDetail(id),
    enabled: isEnabled,
  });
};

// 6.5 (유학생) 공고 담당자 정보 조회하기 훅
export const useGetRecruiterInfo = (id: number, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['application', 'recruiter', id],
    queryFn: () => getRecruiterInfo(id),
    enabled: isEnabled,
  });
};

// 6.7 (고용주) 지원자 지원 상태 상세 조회 훅
export const useGetEmployerApplicationDetail = (
  id: number,
  isEnabled: boolean,
) => {
  return useQuery({
    queryKey: ['application', 'detail', id],
    queryFn: () => getEmployerApplicationDetail(id),
    enabled: isEnabled,
  });
};

// 6.8 (고용주) 지원자 간단 정보 조회하기 훅
export const useGetEmployerApplicationSummary = (
  id: number,
  isEnabled: boolean,
) => {
  return useQuery({
    queryKey: ['application', id],
    queryFn: () => getEmployerApplicationSummary(id),
    enabled: isEnabled,
  });
};

// 6.10 (고용주) 이력서 수락/거절하기 훅
export const usePatchResumeAccepted = () => {
  return useMutation({
    mutationFn: patchResumeAccepted,
    onError: (error) => {
      console.error('이력서 수락/거절하기 실패', error);
    },
  });
};

// 6.11 (고용주) 인터뷰 완료하기 훅
export const usePatchInterviewFinish = (id: number) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: patchInterviewFinish,
    onSuccess: () => {
      navigate(`/employer/applicant/${id}`);
    },
    onError: (error) => {
      console.error('인터뷰 완료하기 실패', error);
    },
  });
};

// 6.13 (유학생) 유학생 담당자 검토 완료 훅
export const usePatchContactCoordinator = () => {
  return useMutation({
    mutationFn: patchContactCoordinator,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error('유학생 담당자 검토 완료 실패', error);
    },
  });
};

// 6.14 (유학생) 하이코리아 지원 훅
export const usePatchApplyHiKorea = () => {
  return useMutation({
    mutationFn: patchApplyHiKorea,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error('하이코리아 지원 실패', error);
    },
  });
};

// 6.15 (유학생) 하이코리아 처리결과 등록하기 훅
export const usePatchHiKoreaResult = (id: number) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: patchHiKoreaResult,
    onSuccess: () => {
      navigate(`/application/${id}`);
    },
    onError: (error) => {
      console.error('하이코리아 처리결과 등록 실패', error);
    },
  });
};

// 9.2 (유학생) 학교 정보 상세조회하기 훅
export const useGetSchoolInfo = (isEnabled: boolean) => {
  return useQuery({
    queryKey: ['application'],
    queryFn: () => getSchoolInfo(),
    enabled: isEnabled,
  });
};
