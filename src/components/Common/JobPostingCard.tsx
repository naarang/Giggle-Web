import Tag from '@/components/Common/Tag';
import BookmarkIcon from '@/assets/icons/BookmarkIcon.svg?react';
import LocationIcon from '@/assets/icons/LocationIcon.svg?react';
import ClockIcon from '@/assets/icons/ClockIcon.svg?react';
import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';

type JobPostingCardProps = {
  id: number;
  isBookmarked?: boolean; // 북마크 여부(로그인 시에만!)
  iconImageUrl?: string; // 회사 로고
  title: string; // 공고 제목
  location: string; // 위치 정보
  workPeriod: string; // 근무 기간
  workDaysPerWeek: string; // 근무 일자
  isRecruiting: boolean; // “모집중/마감"
  jobCategory: string; // “업직종종류",
  visa: string; // “비자종류"
  createdAt: string; // 등록일자
  recruitmentDeadline: string; // 마감일자
  hourlyRate: number; // 시급
};

const JobPostingCard = () => {
  return (
    <article className="flex flex-col gap-[1rem] w-full px-[1.125rem] pt-[1.125rem] pb-[0.75rem] border-[0.5px] border-solid border-[#1E19263D] rounded-[1.125rem]">
      <div className="w-full flex justify-between items-start">
        <div>
          <div className="mb-[0.5rem] flex items-center gap-[0.625rem]">
            <div className='w-[2rem] h-[2rem] rounded-[0.5rem] bg-cover bg-[url("/src/assets/images/JobIconExample.jpeg")]'></div>
            <h3 className="head-2 text-[#1E1926]">Coffee Shop</h3>
          </div>
          <div className="flex flex-col gap-[0.125rem]">
            <div className="flex items-center gap-[0.625rem]">
              <LocationIcon />
              <p className="caption text-[#464646]">Yeoksam-dong, Seoul</p>
            </div>
            <div className="flex items-center gap-[0.625rem]">
              <ClockIcon />
              <p className="caption text-[#464646]">3 months</p>
            </div>
            <div className="flex items-center gap-[0.625rem]">
              <CalendarIcon />
              <p className="caption text-[#464646]">6 days a week</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[0.5rem]">
          <Tag
            value={'D-5'}
            padding="0.313rem 0.875rem"
            isRounded={false}
            hasCheckIcon={false}
            backgroundColor="#FEF38780"
            color="#1E1926"
            fontStyle="button"
          />
          <BookmarkIcon />
        </div>
      </div>
      <div className="flex items-center gap-[0.375rem]">
        <Tag
          value={'Opening'}
          padding="0.375rem 0.75rem"
          isRounded={false}
          hasCheckIcon={false}
          borderColor="#1E1926"
          backgroundColor="white"
          color="#1E1926"
          fontStyle="button"
        />
        <Tag
          value={'Opening'}
          padding="0.375rem 0.75rem"
          isRounded={false}
          hasCheckIcon={false}
          borderColor="#1E1926"
          backgroundColor="white"
          color="#1E1926"
          fontStyle="button"
        />
        <Tag
          value={'Opening'}
          padding="0.375rem 0.75rem"
          isRounded={false}
          hasCheckIcon={false}
          borderColor="#1E1926"
          backgroundColor="white"
          color="#1E1926"
          fontStyle="button"
        />
      </div>
      <div className="w-full px-[0.25rem] flex justify-between items-center">
        <p className="text-[#656565] caption">25 mins ago</p>
        <p className="text-[#656565] body-3">
          <span className="text-[#1E1926] button">10,000KRW</span>/Hr
        </p>
      </div>
    </article>
  );
};

export default JobPostingCard;
