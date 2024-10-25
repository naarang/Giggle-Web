import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostSearchFilterButtons from '@/components/PostSearchFilter/PostSearchFilterButtons';
import PostSearchFilterAreaInput from '@/components/PostSearchFilter/PostSearchFilterAreaInput';
import { useState } from 'react';
import { FILTER_CATEGORY_OPTIONS } from '@/constants/postSearch';
import PostSearchFilterList from '@/components/PostSearchFilter/PostSearchFilterList';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import PostSearchFilterArea from '@/components/PostSearchFilter/PostSearchFilterArea';
import { useNavigate } from 'react-router-dom';
import { usePostSearchStore } from '@/store/postSearch';

const PostSearchFilterPage = () => {
  const { filterList: currentFilterList, updateFilterList } =
    usePostSearchStore();

  const navigate = useNavigate();

  const [filterList, setFilterList] =
    useState<PostSearchFilterItemType>(currentFilterList);
  const [isOpenAreaFilter, setIsOpenAreaFilter] = useState<boolean>(false);

  const onClickApply = () => {
    updateFilterList(filterList);
    navigate('/search');
  };

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
          <PostSearchFilterButtons
            setFilterList={setFilterList}
            onClickApply={onClickApply}
          />
        </>
      )}
    </>
  );
};

export default PostSearchFilterPage;
