import Tag from '@/components/Common/Tag';
import LocationIcon from '@/assets/icons/LocationIcon.svg?react';
import ClockIcon from '@/assets/icons/ClockIcon.svg?react';
import MoneyIcon from '@/assets/icons/MoneyIcon.svg?react';

const PostDetailTitle = () => {
  return (
    <section className="flex flex-col items-center gap-[1rem] w-full mt-[-2.5rem] pt-[2.5rem] pb-[2rem] px-[1.5rem] rounded-[2.5rem] shadow-bottomSheetShadow bg-white">
      <div className='w-[5.125rem] h-[5.125rem] rounded-full bg-cover bg-center bg-[url("/src/assets/images/JobIconExample.jpeg")]'></div>
      <div className="flex flex-col gap-[0.5rem]">
        <p className="button-2 text-[#656565]">Job name</p>
        <h2 className="text-[#33384B] font-bold text-lg">공고 제목</h2>
      </div>
      <div className="flex gap-[0.25rem]">
        <Tag
          value={'Tag'}
          padding="0.375rem 0.75rem"
          isRounded={true}
          hasCheckIcon={false}
          backgroundColor="#1E1926"
          color="#F4F4F9"
          fontStyle="caption-1"
        />
        <Tag
          value={'Tag'}
          padding="0.375rem 0.75rem"
          isRounded={true}
          hasCheckIcon={false}
          backgroundColor="#1E1926"
          color="#F4F4F9"
          fontStyle="caption-1"
        />
        <Tag
          value={'Tag'}
          padding="0.375rem 0.75rem"
          isRounded={true}
          hasCheckIcon={false}
          backgroundColor="#1E1926"
          color="#F4F4F9"
          fontStyle="caption-1"
        />
      </div>
      <div className="grid grid-cols-2 gap-[0.5rem] py-[0.375rem]">
        <div className="flex gap-[0.5rem] px-[0.5rem]">
          <LocationIcon />
          <p className="text-[#464646] caption-1">Yeoksam-dong, Seoul</p>
        </div>
        <div className="flex gap-[0.5rem] px-[0.5rem]">
          <ClockIcon />
          <p className="text-[#464646] caption-1">Yeoksam-dong, Seoul</p>
        </div>
        <div className="flex gap-[0.5rem] px-[0.5rem]">
          <MoneyIcon />
          <p className="text-[#464646] caption-1">Yeoksam-dong, Seoul</p>
        </div>
        <div className="flex gap-[0.5rem] px-[0.5rem]">
          <ClockIcon />
          <p className="text-[#464646] caption-1">Yeoksam-dong, Seoul</p>
        </div>
      </div>
    </section>
  );
};

export default PostDetailTitle;
