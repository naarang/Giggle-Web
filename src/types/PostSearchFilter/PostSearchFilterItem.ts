import { FILTER_CATEGORY } from '@/constants/postSearch';

export type PostSearchFilterItemType = {
  category: FILTER_CATEGORY;
  value: string | null;
};
