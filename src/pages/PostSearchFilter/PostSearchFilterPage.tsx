import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostSearchFilterButtons from '@/components/PostSearchFilter/PostSearchFilterButtons';
import PostSearchFilterArea from '@/components/PostSearchFilter/PostSearchFilterArea';
import { useState } from 'react';
import {
  FILTER_CATEGORY,
  FILTER_CATEGORY_OPTIONS,
} from '@/constants/postSearch';
import PostSearchFilterList from '@/components/PostSearchFilter/PostSearchFilterList';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';

const excludedCategories = [
  FILTER_CATEGORY.REGION_1DEPTH,
  FILTER_CATEGORY.REGION_2DEPTH,
  FILTER_CATEGORY.REGION_3DEPTH,
];

const showCategories = Object.entries(FILTER_CATEGORY_OPTIONS).filter(
  ([category]) => !excludedCategories.includes(category as FILTER_CATEGORY),
);

const PostSearchFilterPage = () => {
  // TODO: 여기서 검색어, 검색 필터 모두 전역변수로 관리하기
  const [filterList, setFilterList] = useState<PostSearchFilterItemType[]>([]);

  return (
    <>
      <BaseHeader hasBackButton={true} hasMenuButton={false} title="Filter" />
      <section className="flex flex-col gap-[3.125rem] w-full p-[1.5rem]">
        <PostSearchFilterArea />
        <PostSearchFilterList
          showCategories={showCategories}
          filterList={filterList}
          setFilterList={setFilterList}
        />
      </section>
      <PostSearchFilterButtons />
    </>
  );
};

export default PostSearchFilterPage;
