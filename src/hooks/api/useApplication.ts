import { getPostValidation } from '@/api/application';
import { useQuery } from '@tanstack/react-query';

// 4.8 (유학생) 공고 지원 자격 확인하기 훅
export const useGetPostValidation = (id: number) => {
  return useQuery({
    queryKey: ['application', id],
    queryFn: () => getPostValidation(id),
  });
};
