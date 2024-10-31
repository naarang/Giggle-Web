import JobPostingCard from '@/components/Common/JobPostingCard';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import RightArrowIcon from '@/assets/icons/Home/RightArrowIcon.svg?react';
import Tag from '@/components/Common/Tag';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POST_SEARCH_MENU } from '@/constants/postSearch';
import { usePostSearchStore } from '@/store/postSearch';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { useGetPostGuestList, useGetPostList } from '@/hooks/api/usePost';

const HomeJobPostingList = () => {
  const { account_type } = useUserStore();
  const { updateSortType } = usePostSearchStore();

  const isGuest = !account_type;

  // 인기 공고
  const trendingDataRequest = {
    page: 1,
    size: 2,
    type: POST_SEARCH_MENU.TRENDING,
    sorting: 'RECENT',
  };
  const { data: guestTrendData } = useGetPostGuestList(
    trendingDataRequest,
    isGuest,
  );

  const { data: userTrendData, refetch: userTrendFetch } = useGetPostList(
    trendingDataRequest,
    !isGuest,
  );

  const trendData = account_type ? userTrendData : guestTrendData;

  // 최신 공고
  const recentlyDataRequest = {
    page: 1,
    size: 2,
    type: POST_SEARCH_MENU.RECENTLY,
    sorting: 'RECENT',
  };
  const { data: guestRecentlyData } = useGetPostGuestList(
    recentlyDataRequest,
    isGuest,
  );
  const { data: userRecentlyData, refetch: userRecentlyFetch } = useGetPostList(
    recentlyDataRequest,
    !isGuest,
  );

  const recentlyData = account_type ? userRecentlyData : guestRecentlyData;

  // 관심 공고
  const bookmarkedDataRequest = {
    page: 1,
    size: 2,
    type: POST_SEARCH_MENU.BOOKMARKED,
    sorting: 'RECENT',
  };
  const { data: userBookmarkedData, refetch: userBookmarkFetch } =
    useGetPostList(bookmarkedDataRequest, !isGuest);

  const navigate = useNavigate();
  const scrollRef = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedMenu, setSelectedMenu] = useState<POST_SEARCH_MENU>(
    POST_SEARCH_MENU.TRENDING,
  );

  const scrollToSelectedMenu = (menu: POST_SEARCH_MENU) => {
    const scrollIndex: { [key: string]: number } = {
      TRENDING: 0,
      RECENTLY: 1,
      BOOKMARKED: 2,
    };

    const target = scrollRef.current[scrollIndex[menu]];
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
    setSelectedMenu(menu);
  };

  const goToSearchPage = (type: POST_SEARCH_MENU) => {
    updateSortType(type);
    navigate('/search');
  };

  useEffect(() => {
    if (!account_type) return;
    userTrendFetch();
    userRecentlyFetch();
    userBookmarkFetch();
  }, [
    isGuest,
    account_type,
    userTrendFetch,
    userRecentlyFetch,
    userBookmarkFetch,
  ]);

  return (
    <section className="w-full bg-[#FEF387]">
      <nav className="flex gap-[0.5rem] w-full py-[1rem] px-[2rem] rounded-t-[1rem] bg-white">
        <button onClick={() => scrollToSelectedMenu(POST_SEARCH_MENU.TRENDING)}>
          <Tag
            value={'🔥 Popular'}
            padding="0.5rem 1rem"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor={
              selectedMenu === POST_SEARCH_MENU.TRENDING ? '#FEF387' : 'white'
            }
            color="#1E1926A6"
            fontStyle="button-2"
          />
        </button>
        <button onClick={() => scrollToSelectedMenu(POST_SEARCH_MENU.RECENTLY)}>
          <Tag
            value={'🌟 Recent'}
            padding="0.5rem 1rem"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor={
              selectedMenu === POST_SEARCH_MENU.RECENTLY ? '#FEF387' : 'white'
            }
            color="#1E1926A6"
            fontStyle="button-2"
          />
        </button>
        {/* 로그인 시에만 존재하는 메뉴 */}
        {account_type === UserType.USER && (
          <button
            onClick={() => scrollToSelectedMenu(POST_SEARCH_MENU.BOOKMARKED)}
          >
            <Tag
              value={'🌟 Bookmarks'}
              padding="0.5rem 1rem"
              isRounded={true}
              hasCheckIcon={false}
              backgroundColor={
                selectedMenu === POST_SEARCH_MENU.BOOKMARKED
                  ? '#FEF387'
                  : 'white'
              }
              color="#1E1926A6"
              fontStyle="button-2"
            />
          </button>
        )}
      </nav>
      <div className="flex flex-col gap-[3.125rem] pt-[0.75rem] pb-[6.25rem] px-[1.5rem] bg-white">
        <div
          className="flex flex-col gap-[1rem]"
          ref={(e) => (scrollRef.current[0] = e)}
        >
          <div className="flex justify-between items-end">
            <h3 className="head-3 text-black">🔥 Popular Job Lists for You</h3>
            <button
              className="flex items-center gap-[0.625rem] button-2 text-[#1E1926]"
              onClick={() => goToSearchPage(POST_SEARCH_MENU.TRENDING)}
            >
              See more <RightArrowIcon />
            </button>
          </div>
          {trendData?.data?.job_posting_list?.map(
            (value: JobPostingItemType) => (
              <JobPostingCard key={value.id} jobPostingData={value} />
            ),
          )}
        </div>
        <div
          className="flex flex-col gap-[1rem]"
          ref={(e) => (scrollRef.current[1] = e)}
        >
          <div className="flex justify-between items-end">
            <h3 className="head-3 text-black">🌟 Recently Added Job</h3>
            <button
              className="flex items-center gap-[0.625rem] button-2 text-[#1E1926]"
              onClick={() => goToSearchPage(POST_SEARCH_MENU.RECENTLY)}
            >
              See more <RightArrowIcon />
            </button>
          </div>
          {recentlyData?.data?.job_posting_list?.map(
            (value: JobPostingItemType) => (
              <JobPostingCard key={value.id} jobPostingData={value} />
            ),
          )}
        </div>
        {account_type === UserType.USER && (
          <div
            className="flex flex-col gap-[1rem]"
            ref={(e) => (scrollRef.current[2] = e)}
          >
            <div className="flex justify-between items-end">
              <h3 className="head-3 text-black">🌟 My Bookmarks</h3>
              <button
                className="flex items-center gap-[0.625rem] button-2 text-[#1E1926]"
                onClick={() => navigate('/resume/scrapped')}
              >
                See more <RightArrowIcon />
              </button>
            </div>
            {userBookmarkedData?.data?.job_posting_list?.map(
              (value: JobPostingItemType) => (
                <JobPostingCard key={value.id} jobPostingData={value} />
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeJobPostingList;
