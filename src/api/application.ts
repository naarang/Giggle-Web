import { PatchResumeAcceptedRequest } from '@/types/api/application';
import { api } from '.';

// 6.7 (고용주) 지원자 지원 상태 상세 조회
export const getEmployerApplicationDetail = async (id: number) => {
  const response = await api.get(
    `/owners/user-owner-job-postings/${id}/details`,
  );
  return response.data;
};

// 6.8 (고용주) 지원자 간단 정보 조회하기
export const getEmployerApplicationSummary = async (id: number) => {
  const response = await api.get(
    `/owners/user-owner-job-postings/${id}/users/briefs`,
  );
  return response.data;
};

// 6.10 (고용주) 이력서 수락/거절하기
export const patchResumeAccepted = async ({
  id,
  isAccepted,
}: {
  id: number;
  isAccepted: PatchResumeAcceptedRequest;
}) => {
  const response = await api.patch(
    `/owners/user-owner-job-postings/${id}/step-resume-under-review`,
    isAccepted,
  );
  return response.data;
};

// 6.11 (고용주) 인터뷰 완료하기
export const patchInterviewFinish = async (id: number) => {
  const response = await api.patch(
    `/owners/user-owner-job-postings/${id}/step-waiting-for-interview`,
  );
  return response.data;
};
