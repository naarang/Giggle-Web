import NoSearchResultImg from '@/assets/images/NoSearchResultImg.png';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import JobPostingCard from '@/components/Common/JobPostingCard';
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
import { usePostSearchStore } from '@/store/postSearch';
import { POST_SEARCH_MENU } from '@/constants/postSearch';

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
];

const SORT_TYPE = {
  POPULAR: 'Popular',
  RECOMMEND: 'Recommend',
  RECENT: 'Recent',
} as const;

const PostSearchResult = () => {
  const { sortType, updateSortType } = usePostSearchStore();
  // TODO: 홈에서 See more 버튼 클릭 시 해당 메뉴로 정렬하기

  return (
    <section className="flex flex-col items-center gap-[1rem] w-full mt-[1rem] px-[1.5rem]">
      <div className="w-full flex justify-between items-center">
        <h3 className="head-3 text-black">Search Result</h3>
        <SearchSortDropdown
          options={Object.values(SORT_TYPE)}
          value={sortType.toLowerCase()}
          onSelect={(sort) =>
            updateSortType(sort.toUpperCase() as POST_SEARCH_MENU)
          }
        />
      </div>
      {JOB_POSTING_LIST?.length ? (
        JOB_POSTING_LIST.map((value: JobPostingItemType) => (
          <JobPostingCard key={value.id} jobPostingData={value} />
        ))
      ) : (
        <>
          <img
            src={NoSearchResultImg}
            alt="검색 결과 없음"
            className="mt-[5rem]"
          />
          <div className="flex flex-col items-center gap-[1rem] px-[0.75rem] mt-[-5rem]">
            <h3 className="head-2 text-[#1E1926]">No results found</h3>
            <p className="body-2 text-[#656565] text-center">
              The search could not be found, please check spelling or write
              another word.
            </p>
          </div>
        </>
      )}
    </section>
  );
};

export default PostSearchResult;
