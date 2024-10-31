import { getAlarms, patchReadAlarm } from '@/api/alarm';
import { useMutation, useQuery } from '@tanstack/react-query';

// 10.1 (유학생/고용주) 알림 조회 훅
export const useGetAlarms = (
  page: number,
  size: number,
  isEnabled: boolean,
) => {
  return useQuery({
    queryKey: ['alarm'],
    queryFn: () => getAlarms(page, size),
    enabled: isEnabled,
  });
};

// 10.2 (유학생/고용주) 알림 읽음 상태 변경 훅
export const usePatchReadAlarm = () => {
  return useMutation({
    mutationFn: patchReadAlarm,
    onError: (error) => {
      console.error('알림 읽음 상태 변경 실패', error);
    },
  });
};
