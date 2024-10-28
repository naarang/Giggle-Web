import { api } from '.';

// 4.8 (유학생) 공고 지원 자격 확인하기
export const getPostValidation = async (id: number) => {
  const response = await api.get(`/api/v1/users/job-postings/${id}/validation`);
  return response.data;
};
