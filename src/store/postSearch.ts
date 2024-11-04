import {
  initialFilterList,
  POST_SEARCH_MENU,
  POST_SORTING,
} from '@/constants/postSearch';
import {
  PostSearchFilterItemType,
  PostSortingType,
} from '@/types/PostSearchFilter/PostSearchFilterItem';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PostSearchStore = {
  sortType: PostSortingType | POST_SEARCH_MENU;
  searchText: string;
  filterList: PostSearchFilterItemType;
  updateSortType: (type: PostSortingType | POST_SEARCH_MENU) => void;
  updateSearchText: (text: string) => void;
  updateFilterList: (newFilterList: PostSearchFilterItemType) => void;
};

export const usePostSearchStore = create(
  persist<PostSearchStore>(
    (set) => ({
      sortType: POST_SORTING.RECENT,
      searchText: '',
      filterList: initialFilterList,
      updateSortType: (type) => set(() => ({ sortType: type })),
      updateSearchText: (text) => set(() => ({ searchText: text })),
      updateFilterList: (newFilterList) =>
        set(() => ({ filterList: newFilterList })),
    }),
    {
      name: 'postSearchStore',
    },
  ),
);
