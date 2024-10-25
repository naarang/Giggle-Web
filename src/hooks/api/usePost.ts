import { deletePost, getPostDetail } from '@/api/post';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 4.4 (유학생/고용주) 공고 상세 조회하기 훅
export const useGetPostDetail = (id: number) => {
  return useQuery({ queryKey: ['post', id], queryFn: () => getPostDetail(id) });
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
