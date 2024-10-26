import {
  deletePost,
  getApplicantList,
  getEmployerPostList,
  getPostDetail,
  getPostSummary,
} from '@/api/post';
import { AscendingSortType } from '@/types/common/sort';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 4.4 (유학생/고용주) 공고 상세 조회하기 훅
export const useGetPostDetail = (id: number) => {
  return useQuery({ queryKey: ['post', id], queryFn: () => getPostDetail(id) });
};

// 4.6 (고용주) 공고에 대한 지원자 리스트 조회 훅
export const useGetApplicantList = (id: number) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getApplicantList(id),
  });
};

// 4.7 (유학생/고용주) 공고 요약 정보 조회하기 훅
export const useGetPostSummary = (id: number) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostSummary(id),
  });
};

// 4.13 (고용주) 공고 삭제하기 훅
export const useDeletePost = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // TODO: 고용주 공고 - 작성한 공고 조회 페이지로 이동하기
      navigate('/employer/post');
    },
    onError: (error) => {
      console.error('공고 삭제하기 실패', error);
    },
  });
};

// 6.6 (고용주) 등록한 공고 리스트 조회하기 훅
export const useGetEmployerPostList = (sorting: AscendingSortType) => {
  return useQuery({
    queryKey: ['post'],
    queryFn: () => getEmployerPostList(sorting),
  });
};
