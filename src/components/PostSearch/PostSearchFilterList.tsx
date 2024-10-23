import Tag from '@/components/Common/Tag';
import FilterIcon from '@/assets/icons/FilterIcon.svg?react';
import { FILTER_CATEGORY } from '@/constants/postSearch';
import { useNavigate } from 'react-router-dom';

// tag 더미데이터
const TAG_LIST = [
  {
    category: FILTER_CATEGORY.INDUSTRY,
    value: 'GENERAL_INTERPRETATION_TRANSLATION',
  },
  {
    category: FILTER_CATEGORY.VISA,
    value: 'D-2-1',
  },
  {
    category: FILTER_CATEGORY.EMPLOYMENT_TYPE,
    value: 'PARTTIME',
  },
  {
    category: FILTER_CATEGORY.RECRUITMENT_PERIOD,
    value: 'OPENING',
  },
];

const PostSearchFilterList = () => {
  const navigate = useNavigate();

  const goToPostSearchFilterPage = () => {
    navigate('/search/filter');
  };

  return (
    <section className="relative w-full pt-[0.75rem] pb-[0.5rem] pr-[2.5rem]">
      <div className="w-full pl-[1.5rem] flex items-center gap-[0.5rem] overflow-x-scroll whitespace-nowrap no-scrollbar">
        {TAG_LIST.map((value, index) => (
          <Tag
            key={`${index}_${value}`}
            value={value.value}
            onDelete={(value) => console.log(value)}
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
