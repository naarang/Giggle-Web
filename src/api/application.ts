import {
  PatchHiKoreaResultRequest,
  PatchResumeAcceptedRequest,
} from '@/types/api/application';
import { api } from '.';

// 4.8 (유학생) 공고 지원 자격 확인하기
export const getPostValidation = async (id: number) => {
  const response = await api.get(`/users/job-postings/${id}/validation`);
  return response.data;
};

// 4.9 (유학생) 공고 지원하기
export const postApplyPost = async (id: number) => {
  const response = await api.post(`/users/job-postings/${id}`);
  return response.data;
};

// 6.2 (유학생) 지원 상태 상세 조회하기
export const getApplicationDetail = async (id: number) => {
  const response = await api.get(
    `/users/user-owner-job-postings/${id}/details`,
  );
  return response.data;
};

// 6.5 (유학생) 공고 담당자 정보 조회하기
export const getRecruiterInfo = async (id: number) => {
  const response = await api.get(
    `/users/user-owner-job-postings/${id}/job-postings/recruiters`,
  );
  return response.data;
};

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

// 6.12 (유학생) 서류 작성 완료하기
export const patchWritingDocumentFinish = async (id: number) => {
  const response = await api.patch(
    `/users/user-owner-job-postings/${id}/step-filling-out-documents`,
  );
  return response.data;
};

// 6.13 (유학생) 유학생 담당자 검토 완료
export const patchContactCoordinator = async (id: number) => {
  const response = await api.patch(
    `/users/user-owner-job-postings/${id}/step-document-under-review`,
  );
  return response.data;
};

// 6.14 (유학생) 하이코리아 지원
export const patchApplyHiKorea = async (id: number) => {
  const response = await api.patch(
    `/users/user-owner-job-postings/${id}/step-application-in-progress`,
  );
  return response.data;
};

// 6.15 (유학생) 하이코리아 처리결과 등록하기
export const patchHiKoreaResult = async ({
  id,
  body,
}: {
  id: number;
  body: PatchHiKoreaResultRequest;
}) => {
  const response = await api.patch(
    `/users/user-owner-job-postings/${id}/step-registering-results`,
    body,
  );
  return response.data;
};

// 9.2 (유학생) 학교 정보 상세조회하기
export const getSchoolInfo = async () => {
  const response = await api.get(`/users/resumes/schools/details`);
  return response.data;
};
