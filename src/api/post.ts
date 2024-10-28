import { AscendingSortType } from '@/types/common/sort';
import { api } from '.';

// 4.4 (유학생/고용주) 공고 상세 조회하기
export const getPostDetail = async (id: number) => {
  const response = await api.get(`/job-postings/${id}/details`);
  return response.data;
};

// 4.6 (고용주) 공고에 대한 지원자 리스트 조회
export const getApplicantList = async (
  id: number,
  sorting: string,
  status: string,
) => {
  // TODO: 무한 스크롤 구현하기
  const page = 1;
  const size = 10;
  const response = await api.get(
    `/owners/job-postings/${id}/user-owner-job-postings/users/overviews?page=${page}&size=${size}&sorting=${sorting}&status=${status}`,
  );
  return response.data;
};

// 4.7 (유학생/고용주) 공고 요약 정보 조회하기
export const getPostSummary = async (id: number) => {
  const response = await api.get(`/job-postings/${id}/summaries`);
  return response.data;
};

// 4.13 (고용주) 공고 삭제하기
export const deletePost = async (id: number) => {
  const response = await api.delete(`/owners/job-postings/${id}`);
  return response.data;
};

// 6.6 (고용주) 등록한 공고 리스트 조회하기
export const getEmployerPostList = async (sorting: AscendingSortType) => {
  // TODO: 무한 스크롤 구현하기
  const page = 1;
  const size = 10;
  const response = await api.get(
    `/owners/job-postings/overviews?page=${page}&size=${size}&sorting=${sorting}`,
  );
  return response.data;
};
