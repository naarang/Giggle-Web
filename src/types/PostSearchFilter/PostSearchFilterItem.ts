import { FILTER_CATEGORY } from '@/constants/postSearch';

export type PostSearchFilterItemType = {
  [key in FILTER_CATEGORY]: string[];
};
