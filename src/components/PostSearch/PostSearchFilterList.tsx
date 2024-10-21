import Tag from '@/components/Common/Tag';
import FilterIcon from '@/assets/icons/FilterIcon.svg?react';

const PostSearchFilterList = () => {
  return (
    <section className="relative w-full pt-[0.75rem] pb-[0.5rem] pr-[2.5rem]">
      <div className="w-full pl-[1.5rem] flex items-center gap-[0.5rem] overflow-x-scroll whitespace-nowrap no-scrollbar">
        <Tag
          value={'~~~~~~ERFWERF'}
          onDelete={(value) => console.log(value)}
          padding="0.313rem 0.5rem 0.313rem 0.75rem"
          isRounded={true}
          hasCheckIcon={false}
          backgroundColor={'#FEF387'}
          color="#1E1926"
          fontStyle="body-3"
        />
        <Tag
          value={'~~~~~~ERFWERF'}
          onDelete={(value) => console.log(value)}
          padding="0.313rem 0.5rem 0.313rem 0.75rem"
          isRounded={true}
          hasCheckIcon={false}
          backgroundColor={'#FEF387'}
          color="#1E1926"
          fontStyle="body-3"
        />
        <Tag
          value={'~~~~~~ERFWERF'}
          onDelete={(value) => console.log(value)}
          padding="0.313rem 0.5rem 0.313rem 0.75rem"
          isRounded={true}
          hasCheckIcon={false}
          backgroundColor={'#FEF387'}
          color="#1E1926"
          fontStyle="body-3"
        />
      </div>
      <button className="absolute top-0 right-0 px-[0.5rem] py-[0.75rem]">
        <FilterIcon />
      </button>
    </section>
  );
};

export default PostSearchFilterList;
