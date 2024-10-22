import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostSearchFilterButtons from '@/components/PostSearchFilter/PostSearchFilterButtons';
import PostSearchFilterAreaInput from '@/components/PostSearchFilter/PostSearchFilterAreaInput';
import { useState } from 'react';
import {
  FILTER_CATEGORY,
  FILTER_CATEGORY_OPTIONS,
} from '@/constants/postSearch';
import PostSearchFilterList from '@/components/PostSearchFilter/PostSearchFilterList';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import PostSearchFilterArea from '@/components/PostSearchFilter/PostSearchFilterArea';
import { useNavigate } from 'react-router-dom';

const PostSearchFilterPage = () => {
  const navigate = useNavigate();
  // TODO: 여기서 검색어, 검색 필터 모두 전역변수로 관리하기
  const [filterList, setFilterList] = useState<PostSearchFilterItemType>({
    [FILTER_CATEGORY.REGION_1DEPTH]: [],
    [FILTER_CATEGORY.REGION_2DEPTH]: [],
    [FILTER_CATEGORY.REGION_3DEPTH]: [],
    [FILTER_CATEGORY.INDUSTRY]: [],
    [FILTER_CATEGORY.WORK_PERIOD]: [],
    [FILTER_CATEGORY.WORK_DAYS_PER_WEEK]: [],
    [FILTER_CATEGORY.WORKING_DAY]: [],
    [FILTER_CATEGORY.WORKING_HOURS]: [],
    [FILTER_CATEGORY.RECRUITMENT_PERIOD]: [],
    [FILTER_CATEGORY.EMPLOYMENT_TYPE]: [],
    [FILTER_CATEGORY.VISA]: [],
  });
  const [isOpenAreaFilter, setIsOpenAreaFilter] = useState<boolean>(false);

  return (
    <>
      {isOpenAreaFilter ? (
        // 지역 선택 페이지
        <PostSearchFilterArea
          setIsOpenAreaFilter={setIsOpenAreaFilter}
          filterList={filterList}
          setFilterList={setFilterList}
        />
      ) : (
        // 정렬 선택 페이지
        <>
          <BaseHeader
            hasBackButton={true}
            onClickBackButton={() => navigate('/search')}
            hasMenuButton={false}
            title="Filter"
          />
          <section className="flex flex-col gap-[3.125rem] w-full p-[1.5rem]">
            <PostSearchFilterAreaInput
              setIsOpenAreaFilter={setIsOpenAreaFilter}
              filterList={filterList}
              setFilterList={setFilterList}
            />
            <PostSearchFilterList
              showCategories={Object.entries(FILTER_CATEGORY_OPTIONS)}
              filterList={filterList}
              setFilterList={setFilterList}
            />
          </section>
          <PostSearchFilterButtons setFilterList={setFilterList} />
        </>
      )}
    </>
  );
};

export default PostSearchFilterPage;
