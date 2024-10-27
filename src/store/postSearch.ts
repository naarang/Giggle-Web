import { initialFilterList, POST_SEARCH_MENU } from '@/constants/postSearch';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { create } from 'zustand';

type PostSearchStore = {
  sortType: POST_SEARCH_MENU;
  searchText: string;
  filterList: PostSearchFilterItemType;
  updateSortType: (type: POST_SEARCH_MENU) => void;
  updateSearchText: (text: string) => void;
  updateFilterList: (newFilterList: PostSearchFilterItemType) => void;
};

export const usePostSearchStore = create<PostSearchStore>()((set) => ({
  sortType: POST_SEARCH_MENU.POPULAR,
  searchText: '',
  filterList: initialFilterList,
  updateSortType: (type) => set(() => ({ sortType: type })),
  updateSearchText: (text) => set(() => ({ searchText: text })),
  updateFilterList: (newFilterList) =>
    set(() => ({ filterList: newFilterList })),
}));
