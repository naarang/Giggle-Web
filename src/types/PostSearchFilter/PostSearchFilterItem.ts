import { FILTER_CATEGORY, POST_SORTING } from '@/constants/postSearch';
import { REGION_KR_TO_EN_MAPPING_DATA } from '@/constants/regionMappingDataEn';

export type PostSearchFilterItemType = {
  [key in FILTER_CATEGORY]: string[];
};

export type PostSortingType = keyof typeof POST_SORTING;

export type RegionDataType = {
  [key: string]: {
    [key: string]: string[];
  };
};

export type RegionDataEnType = keyof typeof REGION_KR_TO_EN_MAPPING_DATA;
