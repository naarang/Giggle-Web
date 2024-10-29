import {
  deletePost,
  getApplicantList,
  getApplyPostList,
  getBookmarkPostList,
  getEmployerPostList,
  getInterviewList,
  getPostDetail,
  getPostDetailGuest,
  getPostList,
  getPostSummary,
  getRecommendPostList,
  putPostBookmark,
} from '@/api/post';
import { GetApplyPostListReqType, GetPostListReqType } from '@/types/api/post';
import { AscendingSortType } from '@/types/common/sort';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 4.2 (게스트) 공고 상세 조회하기 훅
export const useGetPostDetailGuest = (id: number) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostDetailGuest(id),
  });
};

// 4.3 (유학생/고용주) 공고 리스트 조회 훅
export const useGetPostList = (req: GetPostListReqType) => {
  return useQuery({ queryKey: ['post'], queryFn: () => getPostList(req) });
};

// 4.4 (유학생/고용주) 공고 상세 조회하기 훅
export const useGetPostDetail = (id: number) => {
  return useQuery({ queryKey: ['post', id], queryFn: () => getPostDetail(id) });
};

// 4.5 (유학생) 추천 공고 리스트 조회하기 훅
export const useGetRecommendPostList = () => {
  return useQuery({
    queryKey: ['post'],
    queryFn: () => getRecommendPostList(),
  });
};

// 4.6 (고용주) 공고에 대한 지원자 리스트 조회 훅
export const useGetApplicantList = (
  id: number,
  sorting: string,
  status: string,
) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getApplicantList(id, sorting, status),
  });
};

// 4.7 (유학생/고용주) 공고 요약 정보 조회하기 훅
export const useGetPostSummary = (id: number) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostSummary(id),
  });
};

// 4.12 (유학생) 북마크 추가/삭제 훅
export const usePutPostBookmark = () => {
  return useMutation({
    mutationFn: putPostBookmark,
    onError: (error) => {
      console.error('북마크 추가/삭제 실패', error);
    },
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

// 5.1 (유학생) 북마크한 공고 리스트 조회하기 훅
export const useGetBookmarkPostList = (page: number, size: number) => {
  return useQuery({
    queryKey: ['post'],
    queryFn: () => getBookmarkPostList(page, size),
  });
};

// 6.1 (유학생) 지원한 공고 리스트 조회하기 훅
export const useGetApplyPostList = ({
  page,
  size,
  sorting,
  status,
}: GetApplyPostListReqType) => {
  return useQuery({
    queryKey: ['post'],
    queryFn: () => getApplyPostList({ page, size, sorting, status }),
  });
};

// 6.3 (유학생) 현재 진행중인 인터뷰 리스트 조회하기 훅
export const useGetInterviewList = (page: number, size: number) => {
  return useQuery({
    queryKey: ['post'],
    queryFn: () => getInterviewList(page, size),
  });
};

// 6.6 (고용주) 등록한 공고 리스트 조회하기 훅
export const useGetEmployerPostList = (sorting: AscendingSortType) => {
  return useQuery({
    queryKey: ['post'],
    queryFn: () => getEmployerPostList(sorting),
  });
};
