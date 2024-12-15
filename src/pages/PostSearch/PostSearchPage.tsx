import TextFieldHeader from '@/components/Common/Header/TextFieldHeader';
import PostSearchFilterList from '@/components/PostSearch/PostSearchFilterList';
import PostSearchResult from '@/components/PostSearch/PostSearchResult';
import { UserType } from '@/constants/user';
import {
  useInfiniteGetPostGuestList,
  useInfiniteGetPostList,
} from '@/hooks/api/usePost';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { usePostSearchStore } from '@/store/postSearch';
import { useUserStore } from '@/store/user';
import { GetPostListReqType } from '@/types/api/post';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { formatSearchFilter } from '@/utils/formatSearchFilter';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostSearchPage = () => {
  const navigate = useNavigate();

  const { account_type } = useUserStore();
  const { searchText, updateSearchText, filterList, sortType, updateSortType } =
    usePostSearchStore();
  const [searchParams, setSearchParams] =
    useState<GetPostListReqType>(formatSearchFilter());

  const [postData, setPostData] = useState<JobPostingItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data: guestPostData,
    fetchNextPage: guestFetchNextPage,
    hasNextPage: guesthasNextPage,
    isFetchingNextPage: guestIsFetchingNextPage,
  } = useInfiniteGetPostGuestList(searchParams, !account_type ? true : false);

  const {
    data: userPostData,
    fetchNextPage: userFetchNextPage,
    hasNextPage: userhasNextPage,
    isFetchingNextPage: userIsFetchingNextPage,
  } = useInfiniteGetPostList(searchParams, account_type ? true : false);

  const data = account_type ? userPostData : guestPostData;
  const fetchNextPage = account_type ? userFetchNextPage : guestFetchNextPage;
  const hasNextPage = account_type ? userhasNextPage : guesthasNextPage;
  const isFetchingNextPage = account_type
    ? userIsFetchingNextPage
    : guestIsFetchingNextPage;

  const onClickSearch = (text: string) => {
    updateSearchText(text);
    const newSearchParams = formatSearchFilter(text, sortType, filterList);
    setSearchParams(newSearchParams);
  };

  const onChangeSortType = (selectedSortType: PostSortingType) => {
    updateSortType(selectedSortType);
    setSearchParams({ ...searchParams, sorting: selectedSortType });
  };

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoading(true);
      fetchNextPage().finally(() => setIsLoading(false));
    }
  }, !!hasNextPage);

  useEffect(() => {
    if (data && data.pages.length > 0) {
      const result = data.pages.flatMap((page) => page.data.job_posting_list);
      setPostData(result);
    }
  }, [data]);

  return (
    <>
      <TextFieldHeader
        onClickBackButton={() => navigate('/')}
        onClickSearchButton={onClickSearch}
        placeholder={
          account_type === UserType.OWNER
            ? '이름으로 검색'
            : 'Search for job posting name'
        }
        initialValue={searchText}
      />
      <PostSearchFilterList />
      <PostSearchResult
        postData={postData}
        onChangeSortType={onChangeSortType}
        isLoading={isLoading}
      />
      <div ref={targetRef} className="h-1"></div>
    </>
  );
};

export default PostSearchPage;
