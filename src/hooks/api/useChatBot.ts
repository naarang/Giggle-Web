import { getChatHistory, postChatBotMessage } from '@/api/chatbot';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
const PAGE_SIZE = 10;

// 11.1 (유학생) 이전 챗봇 내용 조회하기 훅
export const useGetChatHistory = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['getChatHistory'],
      queryFn: ({ pageParam = 1 }) => getChatHistory(pageParam, PAGE_SIZE), // API 호출 함수
      initialPageParam: 1, // 첫 페이지 설정
      getNextPageParam: (lastPage, allPage) => {
        return lastPage.data.has_next ? allPage.length + 1 : undefined;
      },
      retry: 1, // 실패 시 재시도 횟수
    });

  return {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage: data?.pages[data?.pages.length - 1].data.has_next,
    isFetchingNextPage,
  };
};

// 11.2 (유학생) 챗봇 질문하기 훅
export const usePostChatBotMessage = () => {
  return useMutation({
    mutationFn: postChatBotMessage,
    onError: (error) => {
      console.error('챗봇 질문하기', error);
    },
  });
};
