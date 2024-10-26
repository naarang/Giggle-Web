import { ASCENDING_SORT_TYPE, KO_ASCENDING_SORT_TYPE } from '@/constants/sort';

export type AscendingSortType =
  (typeof ASCENDING_SORT_TYPE)[keyof typeof ASCENDING_SORT_TYPE];

export type KoAscendingSortType =
  (typeof KO_ASCENDING_SORT_TYPE)[keyof typeof KO_ASCENDING_SORT_TYPE];
