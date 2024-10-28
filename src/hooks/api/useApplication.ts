import {
  getEmployerApplicationDetail,
  getEmployerApplicationSummary,
  patchInterviewFinish,
  patchResumeAccepted,
  getPostValidation,
} from '@/api/application';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 4.8 (유학생) 공고 지원 자격 확인하기 훅
export const useGetPostValidation = (id: number) => {
  return useQuery({
    queryKey: ['application', id],
    queryFn: () => getPostValidation(id),
  });
};

// 6.7 (고용주) 지원자 지원 상태 상세 조회 훅
export const useGetEmployerApplicationDetail = (id: number) => {
  return useQuery({
    queryKey: ['application', id],
    queryFn: () => getEmployerApplicationDetail(id),
  });
};

// 6.8 (고용주) 지원자 간단 정보 조회하기 훅
export const useGetEmployerApplicationSummary = (id: number) => {
  return useQuery({
    queryKey: ['application', id],
    queryFn: () => getEmployerApplicationSummary(id),
  });
};

// 6.10 (고용주) 이력서 수락/거절하기 훅
export const usePatchResumeAccepted = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: patchResumeAccepted,
    onSuccess: (id: number) => {
      navigate(`/employer/applicant/${id}`);
    },
    onError: (error) => {
      console.error('이력서 수락/거절하기 실패', error);
    },
  });
};

// 6.11 (고용주) 인터뷰 완료하기 훅
export const usePatchInterviewFinish = () => {
  return useMutation({
    mutationFn: patchInterviewFinish,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error('인터뷰 완료하기 실패', error);
    },
  });
};
