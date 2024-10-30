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

type PostSearchStore = {
  sortType: PostSortingType | POST_SEARCH_MENU;
  searchText: string;
  filterList: PostSearchFilterItemType;
  updateSortType: (type: PostSortingType | POST_SEARCH_MENU) => void;
  updateSearchText: (text: string) => void;
  updateFilterList: (newFilterList: PostSearchFilterItemType) => void;
};

export const usePostSearchStore = create<PostSearchStore>()((set) => ({
  sortType: POST_SORTING.POPULAR,
  searchText: '',
  filterList: initialFilterList,
  updateSortType: (type) => set(() => ({ sortType: type })),
  updateSearchText: (text) => set(() => ({ searchText: text })),
  updateFilterList: (newFilterList) =>
    set(() => ({ filterList: newFilterList })),
}));
