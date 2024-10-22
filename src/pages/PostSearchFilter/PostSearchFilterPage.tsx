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

const excludedCategories = [
  FILTER_CATEGORY.REGION_1DEPTH,
  FILTER_CATEGORY.REGION_2DEPTH,
  FILTER_CATEGORY.REGION_3DEPTH,
];

const showCategories = Object.entries(FILTER_CATEGORY_OPTIONS).filter(
  ([category]) => !excludedCategories.includes(category as FILTER_CATEGORY),
);

const PostSearchFilterPage = () => {
  const navigate = useNavigate();
  // TODO: 여기서 검색어, 검색 필터 모두 전역변수로 관리하기
  const [filterList, setFilterList] = useState<PostSearchFilterItemType[]>([]);
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
              showCategories={showCategories}
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
