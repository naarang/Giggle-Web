import TextFieldHeader from '@/components/Common/Header/TextFieldHeader';
import PostSearchFilterList from '@/components/PostSearch/PostSearchFilterList';
import PostSearchResult from '@/components/PostSearch/PostSearchResult';
import { UserType } from '@/constants/user';
import { useGetPostGuestList, useGetPostList } from '@/hooks/api/usePost';
import { usePostSearchStore } from '@/store/postSearch';
import { useUserStore } from '@/store/user';
import { GetPostListReqType } from '@/types/api/post';
import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { formatSearchFilter } from '@/utils/formatSearchFilter';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostSearchPage = () => {
  const navigate = useNavigate();

  const { account_type } = useUserStore();
  const { searchText, updateSearchText, filterList, sortType, updateSortType } =
    usePostSearchStore();
  const [searchParams, setSearchParams] = useState<GetPostListReqType>(
    formatSearchFilter(searchText, sortType, filterList),
  );

  const { data: guestPostData, refetch: guestRefetch } = useGetPostGuestList(
    searchParams,
    true,
  );

  const { data: userPostData, refetch: userRefetch } = useGetPostList(
    searchParams,
    true,
  );

  const data = account_type ? userPostData : guestPostData;

  const onClickSearch = (text: string) => {
    updateSearchText(text);
    const newSearchParams = formatSearchFilter(text, sortType, filterList);
    setSearchParams(newSearchParams);
  };

  const onChangeSortType = (selectedSortType: PostSortingType) => {
    updateSortType(selectedSortType);
    setSearchParams({ ...searchParams, sorting: selectedSortType });
  };

  useEffect(() => {
    if (account_type) {
      userRefetch();
    } else {
      guestRefetch();
    }
  }, [searchParams, account_type, guestRefetch, userRefetch]);

  if (!data?.success) return <></>;

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
        postData={data?.data?.job_posting_list ?? []}
        onChangeSortType={onChangeSortType}
      />
    </>
  );
};

export default PostSearchPage;
