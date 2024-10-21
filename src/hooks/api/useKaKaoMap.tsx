import { getGeoInfo, searchAddress } from '@/api/map';
import { Document, GeoPosition, UseSearchAddressProps } from '@/types/api/map';
import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

export function useGetGeoInfo(
  setCurrentPosition: Dispatch<SetStateAction<GeoPosition>>,
) {
  return useQuery({
    queryKey: ['event'],
    queryFn: () => getGeoInfo(setCurrentPosition),
  });
}

export const useSearchAddress = ({
  onSuccess,
  onError,
}: UseSearchAddressProps): UseMutationResult<Document[], unknown, string, unknown> => {
  return useMutation({
    mutationFn: searchAddress,
    onSuccess,
    onError: (error) => {
      console.error('주소 검색 중 오류 발생:', error);
      onError?.(error);
    },
  });
};