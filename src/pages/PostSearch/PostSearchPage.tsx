import TextFieldHeader from '@/components/Common/Header/TextFieldHeader';
import PostSearchFilterList from '@/components/PostSearch/PostSearchFilterList';
import PostSearchResult from '@/components/PostSearch/PostSearchResult';
import { FILTER_CATEGORY, POST_SORTING } from '@/constants/postSearch';
import { useGetPostGuestList, useGetPostList } from '@/hooks/api/usePost';
import { usePostSearchStore } from '@/store/postSearch';
import { useUserStore } from '@/store/user';
import { GetPostListReqType } from '@/types/api/post';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostSearchPage = () => {
  const navigate = useNavigate();

  const { account_type } = useUserStore();
  const { searchText, updateSearchText, filterList } = usePostSearchStore();
  const [searchParams, setSearchParams] = useState<GetPostListReqType>({
    page: 1,
    size: 10,
    sorting: POST_SORTING.RECENT,
  });

  const { data: guestPostData, refetch: guestRefetch } = useGetPostGuestList(
    searchParams,
    false,
  );

  const { data: userPostData, refetch: userRefetch } = useGetPostList(
    searchParams,
    false,
  );

  const data = account_type ? userPostData : guestPostData;

  // TODO: 여기서 검색어, 검색 필터 모두 전역변수로 관리하기
  const onClickSearch = (text: string) => {
    updateSearchText(text);
    // TODO : 검색 api 불러오기
    const trendingDataRequest = {
      page: 1,
      size: 10,
      search: text ?? null,
      sorting: POST_SORTING.RECENT,
      region_1depth: filterList[FILTER_CATEGORY.REGION_1DEPTH].join(','),
      region_2depth: filterList[FILTER_CATEGORY.REGION_2DEPTH].join(','),
      region_3depth: filterList[FILTER_CATEGORY.REGION_3DEPTH].join(','),
      industry: filterList[FILTER_CATEGORY.INDUSTRY]
        .join(',')
        .toUpperCase()
        .replace(/\s+/g, '_'),
      work_period: filterList[FILTER_CATEGORY.WORK_PERIOD]
        .join(',')
        .toUpperCase()
        .replace(/\s+/g, '_'),
      work_days_per_week: filterList[FILTER_CATEGORY.WORK_DAYS_PER_WEEK]
        .join(',')
        .toUpperCase()
        .replace(/\s+/g, '_'),
      working_day: filterList[FILTER_CATEGORY.WORKING_DAY]
        .join(',')
        .toUpperCase()
        .replace(/\s+/g, '_'),
      working_hours: filterList[FILTER_CATEGORY.WORKING_HOURS]
        .join(',')
        .toUpperCase()
        .replace(/\s+/g, '_'),
      recruitment_period: filterList[FILTER_CATEGORY.RECRUITMENT_PERIOD]
        .join(',')
        .toUpperCase()
        .replace(/\s+/g, '_'),
      employment_type:
        filterList[FILTER_CATEGORY.EMPLOYMENT_TYPE]?.[0]?.toUpperCase() ?? null,
      visa: filterList[FILTER_CATEGORY.VISA]?.[0]?.replace(/-/g, '_') ?? null,
    };
    setSearchParams(trendingDataRequest);
  };

  useEffect(() => {
    if (account_type) {
      userRefetch();
    } else {
      guestRefetch();
    }
  }, [searchParams, account_type, guestRefetch, userRefetch]);

  return (
    <>
      <TextFieldHeader
        onClickBackButton={() => navigate('/')}
        onClickSearchButton={onClickSearch}
        placeholder="Search for job posting name"
        initialValue={searchText}
      />
      <PostSearchFilterList />
      <PostSearchResult postData={data} />
    </>
  );
};

export default PostSearchPage;
