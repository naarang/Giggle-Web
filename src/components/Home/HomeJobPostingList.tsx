import JobPostingCard from '@/components/Common/JobPostingCard';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import RightArrowIcon from '@/assets/icons/Home/RightArrowIcon.svg?react';
import Tag from '@/components/Common/Tag';
import { useRef, useState } from 'react';

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

const enum Menu {
  POPULAR = 'POPULAR',
  RECENT = 'RECENT',
  BOOKMARKS = 'BOOKMARKS',
}

const HomeJobPostingList = () => {
  const scrollRef = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.POPULAR);

  const scrollToSelectedMenu = (menu: Menu) => {
    const scrollIndex: { [key: string]: number } = {
      POPULAR: 0,
      RECENT: 1,
      BOOKMARKS: 2,
    };

    const target = scrollRef.current[scrollIndex[menu]];
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
    setSelectedMenu(menu);
  };

  return (
    <section className="w-full bg-[#FEF387]">
      <nav className="flex gap-[0.5rem] w-full py-[1rem] px-[2rem] rounded-t-[1rem] bg-white">
        <button onClick={() => scrollToSelectedMenu(Menu.POPULAR)}>
          <Tag
            value={'🔥 Popular'}
            padding="0.5rem 1rem"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor={
              selectedMenu === Menu.POPULAR ? '#FEF387' : 'white'
            }
            color="#1E1926A6"
            fontStyle="button-2"
          />
        </button>
        <button onClick={() => scrollToSelectedMenu(Menu.RECENT)}>
          <Tag
            value={'🌟 Recent'}
            padding="0.5rem 1rem"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor={selectedMenu === Menu.RECENT ? '#FEF387' : 'white'}
            color="#1E1926A6"
            fontStyle="button-2"
          />
        </button>
        {/* 로그인 시에만 존재하는 메뉴 */}
        <button onClick={() => scrollToSelectedMenu(Menu.BOOKMARKS)}>
          <Tag
            value={'🌟 Bookmarks'}
            padding="0.5rem 1rem"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor={
              selectedMenu === Menu.BOOKMARKS ? '#FEF387' : 'white'
            }
            color="#1E1926A6"
            fontStyle="button-2"
          />
        </button>
      </nav>
      <div className="flex flex-col gap-[3.125rem] pt-[0.75rem] pb-[6.25rem] px-[1.5rem] bg-white">
        <div
          className="flex flex-col gap-[1rem]"
          ref={(e) => (scrollRef.current[0] = e)}
        >
          <div className="flex justify-between items-end">
            <h3 className="head-3 text-black">🔥 Popular Job Lists for You</h3>
            <button className="flex items-center gap-[0.625rem] button-2 text-[#1E1926]">
              See more <RightArrowIcon />
            </button>
          </div>
          {JOB_POSTING_LIST.map((value: JobPostingItemType) => (
            <JobPostingCard key={value.id} jobPostingData={value} />
          ))}
        </div>
        <div
          className="flex flex-col gap-[1rem]"
          ref={(e) => (scrollRef.current[1] = e)}
        >
          <div className="flex justify-between items-end">
            <h3 className="head-3 text-black">🌟 Recently Added Job</h3>
            <button className="flex items-center gap-[0.625rem] button-2 text-[#1E1926]">
              See more <RightArrowIcon />
            </button>
          </div>
          {JOB_POSTING_LIST.map((value: JobPostingItemType) => (
            <JobPostingCard key={value.id} jobPostingData={value} />
          ))}
        </div>
        <div
          className="flex flex-col gap-[1rem]"
          ref={(e) => (scrollRef.current[2] = e)}
        >
          <div className="flex justify-between items-end">
            <h3 className="head-3 text-black">🌟 My Bookmarks</h3>
            <button className="flex items-center gap-[0.625rem] button-2 text-[#1E1926]">
              See more <RightArrowIcon />
            </button>
          </div>
          {JOB_POSTING_LIST.map((value: JobPostingItemType) => (
            <JobPostingCard key={value.id} jobPostingData={value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeJobPostingList;
