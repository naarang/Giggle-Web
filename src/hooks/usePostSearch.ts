import { useState } from 'react';
import {
  initialFilterList,
  POST_SEARCH_MENU,
  POST_SORTING,
} from '@/constants/postSearch';
import {
  PostSearchFilterItemType,
  PostSortingType,
} from '@/types/PostSearchFilter/PostSearchFilterItem';

export type PostSearchType = {
  sortType: PostSortingType | POST_SEARCH_MENU;
  searchText: string;
  filterList: PostSearchFilterItemType;
};

export const usePostSearch = (initialState: Partial<PostSearchType> = {}) => {
  const [state, setState] = useState<PostSearchType>({
    sortType: initialState?.sortType ?? POST_SORTING.RECENT,
    searchText: initialState?.searchText ?? '',
    filterList: initialState?.filterList ?? initialFilterList,
  });

  const updateSortType = (value: PostSortingType | POST_SEARCH_MENU) => {
    setState((prev) => ({ ...prev, sortType: value }));
  };

  const updateSearchText = (value: string) => {
    setState((prev) => ({ ...prev, searchText: value }));
  };

  const updateFilterList = (value: PostSearchFilterItemType) => {
    setState((prev) => ({ ...prev, filterList: value }));
  };

  return {
    searchOption: state,
    updateSortType,
    updateSearchText,
    updateFilterList,
  };
};
