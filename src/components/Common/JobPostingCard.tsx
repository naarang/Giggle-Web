import Tag from '@/components/Common/Tag';
import BookmarkIcon from '@/assets/icons/BookmarkIcon.svg?react';
import BookmarkCheckedIcon from '@/assets/icons/BookmarkCheckedIcon.svg?react';
import LocationIcon from '@/assets/icons/LocationIcon.svg?react';
import ClockIcon from '@/assets/icons/ClockIcon.svg?react';
import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { calculateTimeAgo } from '@/utils/calculateTimeAgo';
import { calculateDDay } from '@/utils/calculateDDay';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface JobPostingCardProps {
  jobPostingData: JobPostingItemType;
}

const JobPostingCard = ({ jobPostingData }: JobPostingCardProps) => {
  const navigate = useNavigate();

  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    jobPostingData?.is_book_marked ?? false,
  );

  return (
    <article
      className="flex flex-col gap-[1rem] w-full px-[1.125rem] pt-[1.125rem] pb-[0.75rem] border-[0.5px] border-solid border-[#1E19263D] rounded-[1.125rem]"
      onClick={() => navigate(`/post/${jobPostingData.id}`)}
    >
      <div className="w-full flex justify-between items-start">
        <div>
          <div className="mb-[0.5rem] flex items-center gap-[0.625rem]">
            <div className='w-[2rem] h-[2rem] rounded-[0.5rem] bg-cover bg-[url("/src/assets/images/JobIconExample.jpeg")]'></div>
            <h3 className="head-2 text-[#1E1926]">{jobPostingData.title}</h3>
          </div>
          <div className="flex flex-col gap-[0.125rem]">
            <div className="flex items-center gap-[0.625rem]">
              <LocationIcon />
              <p className="caption-1 text-[#464646]">
                {jobPostingData.summaries.address}
              </p>
            </div>
            <div className="flex items-center gap-[0.625rem]">
              <ClockIcon />
              <p className="caption-1 text-[#464646]">
                {jobPostingData.summaries.work_period
                  .replace(/_/g, ' ')
                  .toLowerCase()}
              </p>
            </div>
            <div className="flex items-center gap-[0.625rem]">
              <CalendarIcon />
              <p className="caption-1 text-[#464646]">
                {jobPostingData.summaries.work_days_per_week} days a week
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[0.5rem]">
          <Tag
            value={calculateDDay(jobPostingData.recruitment_dead_line)}
            padding="0.313rem 0.875rem"
            isRounded={false}
            hasCheckIcon={false}
            backgroundColor="#FEF38780"
            color="#1E1926"
            fontStyle="button-2"
          />
          {isBookmarked ? (
            <BookmarkCheckedIcon onClick={() => setIsBookmarked(false)} />
          ) : (
            <BookmarkIcon onClick={() => setIsBookmarked(true)} />
          )}
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-[0.375rem]">
        <Tag
          value={jobPostingData.tags.is_recruiting ? 'Opening' : 'Closed'}
          padding="0.375rem 0.75rem"
          isRounded={false}
          hasCheckIcon={false}
          borderColor="#1E1926"
          backgroundColor="white"
          color="#1E1926"
          fontStyle="caption-1"
        />
        <Tag
          value={jobPostingData.tags.job_category
            .replace(/_/g, ' ')
            .toLowerCase()}
          padding="0.375rem 0.75rem"
          isRounded={false}
          hasCheckIcon={false}
          borderColor="#1E1926"
          backgroundColor="white"
          color="#1E1926"
          fontStyle="caption-1"
        />
        <Tag
          value={jobPostingData.tags.visa}
          padding="0.375rem 0.75rem"
          isRounded={false}
          hasCheckIcon={false}
          borderColor="#1E1926"
          backgroundColor="white"
          color="#1E1926"
          fontStyle="caption-1"
        />
      </div>
      <div className="w-full px-[0.25rem] flex justify-between items-center">
        <p className="text-[#656565] caption-2">
          {calculateTimeAgo(jobPostingData.created_at)}
        </p>
        <p className="text-[#656565] body-3">
          <span className="text-[#1E1926] button-1">
            {jobPostingData.hourly_rate}KRW
          </span>
          /Hr
        </p>
      </div>
    </article>
  );
};

export default JobPostingCard;
