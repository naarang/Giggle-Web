import PostSearchFilterToggle from '@/components/PostSearchFilter/PostSearchFilterToggle';
import Tag from '@/components/Common/Tag';
import SearchIcon from '@/assets/icons/MagnifyGlassIcon.svg?react';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { useEffect, useState } from 'react';
import { FILTER_CATEGORY } from '@/constants/postSearch';

type PostSearchFilterAreaInputProps = {
  setIsOpenAreaFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filterList: PostSearchFilterItemType[];
  setFilterList: React.Dispatch<
    React.SetStateAction<PostSearchFilterItemType[]>
  >;
};

const PostSearchFilterAreaInput = ({
  setIsOpenAreaFilter,
  filterList,
  setFilterList,
}: PostSearchFilterAreaInputProps) => {
  const [currentRegion, setCurrentRegion] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);

  useEffect(() => {
    const region1Depth = filterList.find(
      (value) => value.category === FILTER_CATEGORY.REGION_1DEPTH,
    );

    const region2Depth = filterList.find(
      (value) => value.category === FILTER_CATEGORY.REGION_2DEPTH,
    );
    const region3Depth = filterList.find(
      (value) => value.category === FILTER_CATEGORY.REGION_3DEPTH,
    );

    setCurrentRegion([
      region1Depth?.value ?? null,
      region2Depth?.value ?? null,
      region3Depth?.value ?? null,
    ]);
  }, [filterList]);

  const formatRegionArrayToString = (region: (string | null)[]) => {
    return `${region[0] ?? ''} ${region[1] ?? ''} ${region[2] ?? ''}`;
  };

  const onClickDelete = () => {
    setCurrentRegion([null, null, null]);
    const resetRegionFilterList = filterList.filter(
      (value) => !value.category.includes('Region'),
    );
    setFilterList([...resetRegionFilterList]);
  };

  return (
    <PostSearchFilterToggle title={'Select Areas'}>
      <div
        className={`w-full flex gap-2 items-center justify-between text-left text-sm font-[Pretendard] border rounded-xl border-[#BDBDBD] bg-white py-[0.625rem] pl-4 pr-[14px] mb-[0.5rem]`}
        onClick={() => setIsOpenAreaFilter(true)}
      >
        <SearchIcon />
        <input
          placeholder={'Select Area'}
          className={
            'w-full outline-none placeholder:text-[var(--input-color)]'
          }
          readOnly
        />
      </div>
      <div className="flex flex-wrap gap-[0.5rem] px-[0.5rem] w-full">
        {currentRegion[0] && (
          <Tag
            value={formatRegionArrayToString(currentRegion)}
            padding="0.313rem 0.625rem 0.313rem 0.75rem"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor={'#FEF387'}
            color="#1E1926"
            fontStyle="body-3"
            onDelete={onClickDelete}
          />
        )}
      </div>
    </PostSearchFilterToggle>
  );
};

export default PostSearchFilterAreaInput;
