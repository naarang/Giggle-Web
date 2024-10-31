import { POST_SEARCH_MENU } from '@/constants/postSearch';
import { ApplicationStatusType } from '../application/applicationStatus';
import { AscendingSortType } from '../common/sort';

export type GetPostListReqType = {
  page: number;
  size: number;
  search?: string | null;
  sorting?: string | null;
  region_1depth?: string | null;
  region_2depth?: string | null;
  region_3depth?: string | null;
  industry?: string | null;
  work_period?: string | null;
  work_days_per_week?: string | null;
  working_day?: string | null;
  working_hours?: string | null;
  recruitment_period?: string | null;
  employment_type?: string | null;
  visa?: string | null;
  type?: POST_SEARCH_MENU | null;
};

export type GetApplyPostListReqType = {
  page: number;
  size: number;
  sorting: AscendingSortType;
  status: ApplicationStatusType;
};
