import Tag from '@/components/Common/Tag';
import FilterIcon from '@/assets/icons/FilterIcon.svg?react';
import { FILTER_CATEGORY } from '@/constants/postSearch';
import { useNavigate } from 'react-router-dom';
import { usePostSearchStore } from '@/store/postSearch';

type TagType = {
  category: string;
  value: string;
};

const PostSearchFilterList = () => {
  const { filterList, updateFilterList } = usePostSearchStore();

  const navigate = useNavigate();

  const goToPostSearchFilterPage = () => {
    navigate('/search/filter');
  };

  const formatFilterListToTag = () => {
    const excludedCategories = [
      FILTER_CATEGORY.REGION_1DEPTH,
      FILTER_CATEGORY.REGION_2DEPTH,
      FILTER_CATEGORY.REGION_3DEPTH,
    ];

    const filteredValues = Object.entries(filterList)
      .filter(([key]) => !excludedCategories.includes(key as FILTER_CATEGORY))
      .flatMap(([key, values]) =>
        values.map((value) => ({
          category: key,
          value,
        })),
      );

    const region1Depth = filterList[FILTER_CATEGORY.REGION_1DEPTH];
    const region2Depth = filterList[FILTER_CATEGORY.REGION_2DEPTH];
    const region3Depth = filterList[FILTER_CATEGORY.REGION_3DEPTH];

    const filteredRegions = region1Depth.map((region, index) => {
      return {
        category: 'region',
        value: `${region} ${region2Depth[index]} ${region3Depth[index] === 'none' ? '' : region3Depth[index]}`,
      };
    });

    const tagList = [...filteredValues, ...filteredRegions];
    return tagList;
  };

  const updateRegionFilter = (
    category: FILTER_CATEGORY,
    regionIndex: number,
  ) => {
    const newRegionFilter = filterList[category].filter(
      (_value, index) => index !== regionIndex,
    );

    return newRegionFilter;
  };

  const findFilterIndex = (
    region1: string,
    region2: string,
    region3: string,
  ) => {
    for (let i = 0; i < filterList[FILTER_CATEGORY.REGION_1DEPTH].length; i++) {
      if (
        region1 === filterList[FILTER_CATEGORY.REGION_1DEPTH][i] &&
        region2 === filterList[FILTER_CATEGORY.REGION_2DEPTH][i] &&
        (region3 === filterList[FILTER_CATEGORY.REGION_3DEPTH][i] ||
          region2 === '전체')
      )
        return i;
    }
    return -1;
  };

  const onDeleteFilter = (tag: TagType) => {
    if (tag.category === 'region') {
      const [region1, region2, region3] = tag.value.split(' ');

      const regionIndex = findFilterIndex(region1, region2, region3);

      if (regionIndex !== -1) return;

      const newFilterList = {
        ...filterList,
        [FILTER_CATEGORY.REGION_1DEPTH]: updateRegionFilter(
          FILTER_CATEGORY.REGION_1DEPTH,
          regionIndex,
        ),
        [FILTER_CATEGORY.REGION_2DEPTH]: updateRegionFilter(
          FILTER_CATEGORY.REGION_2DEPTH,
          regionIndex,
        ),
        [FILTER_CATEGORY.REGION_3DEPTH]: updateRegionFilter(
          FILTER_CATEGORY.REGION_3DEPTH,
          regionIndex,
        ),
      };
      updateFilterList(newFilterList);
    }

    const newFilterList = {
      ...filterList,
      [tag.category]: filterList[tag.category as FILTER_CATEGORY].filter(
        (value) => value !== tag.value,
      ),
    };
    updateFilterList(newFilterList);
  };

  return (
    <section className="relative w-full pt-[0.75rem] pb-[0.5rem] pr-[2.5rem]">
      <div className="w-full min-h-[1.5rem] pl-[1.5rem] flex items-center gap-[0.5rem] overflow-x-scroll whitespace-nowrap no-scrollbar">
        {formatFilterListToTag().map((value, index) => (
          <Tag
            key={`${index}_${value.category}`}
            value={value.value}
            onDelete={() => onDeleteFilter(value)}
            padding="0.313rem 0.5rem 0.313rem 0.75rem"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor={'#FEF387'}
            color="#1E1926"
            fontStyle="body-3"
          />
        ))}
      </div>
      <button
        className="absolute top-0 right-0 px-[0.5rem] py-[0.75rem]"
        onClick={goToPostSearchFilterPage}
      >
        <FilterIcon />
      </button>
    </section>
  );
};

export default PostSearchFilterList;
