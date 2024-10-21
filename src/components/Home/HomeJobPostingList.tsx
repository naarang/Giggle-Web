import JobPostingCard from '@/components/Common/JobPostingCard';
import { JobPostingItemType } from '@/types/common/jobPostingItem';

// 공고 목록 더미데이터
const JOB_POSTING_LIST: JobPostingItemType[] = [
  {
    id: 1234567890,
    icon_img_url: 'https://example.com/images/icon1.png',
    title: 'English Tutor',
    summaries: {
      address: 'Seoul, South Korea',
      work_period: '1_WEEK_TO_1_MONTH',
      work_days_per_week: 5,
    },
    tags: {
      is_recruiting: true,
      visa: 'D-2-1',
      job_category: 'GENERAL_INTERPRETATION_TRANSLATION',
    },
    hourly_rate: 15000,
    recruitment_dead_line: '2024-11-01T23:59:59',
    created_at: '2024-10-20T10:30:00',
  },
  {
    id: 9876543210,
    icon_img_url: 'https://example.com/images/icon2.png',
    title: 'Café Barista',
    summaries: {
      address: 'Busan, South Korea',
      work_period: '3_MONTHS_TO_6_MONTHS',
      work_days_per_week: 6,
    },
    tags: {
      is_recruiting: false,
      visa: 'D-4-1',
      job_category: 'GENERAL_CAFE',
    },
    hourly_rate: 12000,
    recruitment_dead_line: '2024-10-21T18:00:00',
    created_at: '2024-10-15T09:00:00',
  },
  {
    id: 1122334455,
    icon_img_url: 'https://example.com/images/icon3.png',
    title: 'Tour Guide',
    summaries: {
      address: 'Jeju Island, South Korea',
      work_period: 'MORE_THAN_1_YEAR',
      work_days_per_week: 5,
    },
    tags: {
      is_recruiting: true,
      visa: 'F-2',
      job_category: 'TOUR_GUIDE_AND_DUTY_FREE_ASSISTANT',
    },
    hourly_rate: 18000,
    recruitment_dead_line: '2024-12-31T23:59:59',
    created_at: '2024-09-20T14:45:00',
  },
];

const HomeJobPostingList = () => {
  return (
    <>
      {JOB_POSTING_LIST.map((value: JobPostingItemType) => (
        <JobPostingCard key={value.id} jobPostingData={value} />
      ))}
    </>
  );
};

export default HomeJobPostingList;
