import { getAlarms } from '@/api/alarm';
import { useQuery } from '@tanstack/react-query';

// 10.1 (유학생/고용주) 알림 조회 훅
export const useGetPostDetail = (page: number, size: number) => {
  return useQuery({
    queryKey: ['alarm'],
    queryFn: () => getAlarms(page, size),
  });
};
