import { initialFilterList } from '@/constants/postSearch';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { create } from 'zustand';

type PostSearchStore = {
  searchText: string;
  filterList: PostSearchFilterItemType;
  updateSearchText: (text: string) => void;
  updateFilterList: (newFilterList: PostSearchFilterItemType) => void;
};

export const usePostSearchStore = create<PostSearchStore>()((set) => ({
  searchText: '',
  filterList: initialFilterList,
  updateSearchText: (text) => set(() => ({ searchText: text })),
  updateFilterList: (newFilterList) =>
    set(() => ({ filterList: newFilterList })),
}));
