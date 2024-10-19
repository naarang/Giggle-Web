import { getGeoInfo } from '@/api/map';
import { GeoPosition } from '@/types/api/map';
import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

export function useGetGeoInfo(
  setCurrentPosition: Dispatch<SetStateAction<GeoPosition>>,
) {
  return useQuery({
    queryKey: ['event'],
    queryFn: () => getGeoInfo(setCurrentPosition),
  });
}
