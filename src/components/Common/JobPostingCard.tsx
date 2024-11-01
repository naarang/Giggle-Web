import Tag from '@/components/Common/Tag';
import BookmarkIcon from '@/assets/icons/BookmarkIcon.svg?react';
import BookmarkCheckedIcon from '@/assets/icons/BookmarkCheckedIcon.svg?react';
import LocationIcon from '@/assets/icons/LocationIcon.svg?react';
import ClockIcon from '@/assets/icons/ClockIcon.svg?react';
import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { calculateTimeAgo } from '@/utils/calculateTimeAgo';
import { calculateDDay } from '@/utils/calculateDDay';
import { useNavigate } from 'react-router-dom';
import { usePutPostBookmark } from '@/hooks/api/usePost';
import { useUserStore } from '@/store/user';

type JobPostingCardProps = {
  jobPostingData: JobPostingItemType;
};

const JobPostingCard = ({ jobPostingData }: JobPostingCardProps) => {
  const { account_type } = useUserStore();
  const { mutate } = usePutPostBookmark();

  const navigate = useNavigate();

  const onClickBookmark = async (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    event.stopPropagation();

    if (account_type) mutate(jobPostingData.id);
  };

  const goToPostDetailPage = () => {
    navigate(`/post/${jobPostingData.id}`);
  };

  return (
    <article
      className="flex flex-col gap-[1rem] w-full px-[1.125rem] pt-[1.125rem] pb-[0.75rem] border-[0.5px] border-solid border-[#1E19263D] rounded-[1.125rem]"
      onClick={goToPostDetailPage}
    >
      <div className="w-full flex justify-between items-start">
        <div>
          <div className="mb-[0.5rem] flex items-center gap-[0.625rem]">
            {jobPostingData?.icon_img_url ? (
              <div
                className="w-[2rem] h-[2rem] rounded-[0.5rem] bg-cover"
                style={{
                  backgroundImage: `url(${jobPostingData.icon_img_url})`,
                }}
              ></div>
            ) : (
              <div className="w-[2rem] h-[2rem] rounded-[0.5rem] bg-[#F4F4F9]"></div>
            )}
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
            value={jobPostingData.recruitment_dead_line === '상시모집' ? '상시모집' : calculateDDay(jobPostingData.recruitment_dead_line)}
            padding="0.313rem 0.875rem"
            isRounded={false}
            hasCheckIcon={false}
            backgroundColor="#FEF38780"
            color="#1E1926"
            fontStyle="button-2"
          />
          {account_type &&
            (jobPostingData?.is_book_marked ? (
              <BookmarkCheckedIcon onClick={(e) => onClickBookmark(e)} />
            ) : (
              <BookmarkIcon onClick={(e) => onClickBookmark(e)} />
            ))}
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
          value={jobPostingData.tags.visa.replace(/_/g, '-')}
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
