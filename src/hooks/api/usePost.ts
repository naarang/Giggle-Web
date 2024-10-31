import {
  createPost,
  deletePost,
  getApplicantList,
  getApplyPostList,
  getBookmarkPostList,
  getEmployerPostList,
  getInterviewList,
  getPostDetail,
  getPostDetailGuest,
  getPostList,
  getPostListGuest,
  getPostSummary,
  getRecommendPostList,
  putPostBookmark,
} from '@/api/post';
import { GetApplyPostListReqType, GetPostListReqType } from '@/types/api/post';
import { MatchKoEnAscendingSortType } from '@/types/common/sort';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 4.1 (게스트) 공고 리스트 조회 훅
export const useGetPostGuestList = (
  req: GetPostListReqType,
  isEnabled: boolean,
) => {
  return useQuery({
    queryKey: ['post', req],
    queryFn: () => getPostListGuest(req),
    enabled: isEnabled,
    staleTime: 0,
  });
};

// 4.2 (게스트) 공고 상세 조회하기 훅
export const useGetPostDetailGuest = (id: number, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostDetailGuest(id),
    enabled: isEnabled,
  });
};

// 4.3 (유학생/고용주) 공고 리스트 조회 훅
export const useGetPostList = (req: GetPostListReqType, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['post', req],
    queryFn: () => getPostList(req),
    enabled: isEnabled,
    staleTime: 0,
  });
};

// 4.4 (유학생/고용주) 공고 상세 조회하기 훅
export const useGetPostDetail = (id: number, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['post', 'detail', id],
    queryFn: () => getPostDetail(id),
    enabled: isEnabled,
  });
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
  isEnabled: boolean,
) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getApplicantList(id, sorting, status),
    enabled: isEnabled,
  });
};

// 4.7 (유학생/고용주) 공고 요약 정보 조회하기 훅
export const useGetPostSummary = (id: number, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['post', 'summary', id],
    queryFn: () => getPostSummary(id),
    enabled: isEnabled,
  });
};

// 4.10 (고용주) 공고 등록하기 훅
export const useCreatePost = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (response) => {
      // response는 API 응답 데이터
      // { success: true, data: { id: Long }, error: null }
      navigate(`/employer/post/${response.data.id}`);
    },
    onError: (error) => {
      console.error('공고 등록하기 실패', error);
    },
  });
};

// 4.12 (유학생) 북마크 추가/삭제 훅
export const usePutPostBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putPostBookmark,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['post'],
      });
    },
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
    enabled: false,
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
export const useGetEmployerPostList = (sorting: MatchKoEnAscendingSortType) => {
  return useQuery({
    queryKey: ['post'],
    queryFn: () => getEmployerPostList(sorting),
  });
};
