import { api } from '.';

// 4.4 (유학생/고용주) 공고 상세 조회하기
export const getPostDetail = async (id: number) => {
  const response = await api.post(`/api/v1/job-postings/${id}/details`);
  return response.data;
};

// 4.13 (고용주) 공고 삭제하기
export const deletePost = async (id: number) => {
  const response = await api.delete(`/api/v1/owners/job-postings/${id}`);
  return response.data;
};
