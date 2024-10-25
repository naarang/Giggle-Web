import { ASCENDING_SORT_TYPE } from '@/constants/sort';

export type AscendingSortType =
  (typeof ASCENDING_SORT_TYPE)[keyof typeof ASCENDING_SORT_TYPE];
