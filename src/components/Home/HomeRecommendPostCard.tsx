import MessageIcon from '@/assets/icons/Home/MessageIcon.svg?react';

const HomeRecommendPostCard = () => {
  return (
    <article className="flex flex-col justify-between min-w-[11.25rem] w-[11.25rem] h-[8.75rem] pt-[0.75rem] pb-[1.125rem] px-[1.125rem] rounded-[1.5rem] border-[0.031rem] border-[#F4F4F9] shadow-cardShadow bg-[#F4F4F9]">
      <div className="flex justify-end gap-[0.375rem]">
        <div className="py-[0.125rem] px-[0.438rem] border-[0.031rem] border-[#1E1926] rounded-[0.5rem]  bg-[#FFFFFFCC] text-[#1E1926] caption-2">
          D-day
        </div>
        <div className="py-[0.125rem] px-[0.438rem] border-[0.031rem] border-[#1E1926] rounded-[0.5rem]  bg-[#1E1926] text-[#F4F4F9] caption-2">
          업직종
        </div>
      </div>
      <MessageIcon />
      <div>
        <p className="pb-[0.5rem] caption-1 text-[#656565]">
          한은서님을 위한 추천 공고 도착!
        </p>
        <div className="button-2 text-[#1E1926] break-keep whitespace-normal">
          공고제목) 에그드랍 역삼역점 파트 알바 모집
        </div>
      </div>
    </article>
  );
};

export default HomeRecommendPostCard;
