import { getChatBotMessage } from '@/api/chatbot';
import { useInfiniteQuery } from '@tanstack/react-query';
const PAGE_SIZE = 10;

export const useGetChatHistory = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['getChatHistory'],
      queryFn: ({ pageParam = 1 }) => getChatBotMessage(pageParam, PAGE_SIZE), // API 호출 함수
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
    hasNextPage: data?.pages[0].data.has_next,
    isFetchingNextPage,
  };
};
