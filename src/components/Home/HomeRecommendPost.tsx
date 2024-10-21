import MessageIcon from '@/assets/icons/Home/MessageIcon.svg?react';
import HomeRecommendPostCard from '@/components/Home/HomeRecommendPostCard';
import { RecommendJobPostingItemType } from '@/types/home/recommendJobPostingItem';

// 추천 공고 목록 더미데이터
const RECOMMEND_JOB_POSTING_LIST: RecommendJobPostingItemType[] = [
  {
    id: 1,
    title: '공고 제목1',
    recruitment_dead_line: '2024.11.01',
    job_category: 'GENERAL_INTERPRETATION_TRANSLATION',
  },
  {
    id: 2,
    title: '공고 제목 222 어쩌구 저쩌구',
    recruitment_dead_line: '2024.10.25',
    job_category: 'GENERAL_CAFE',
  },
];

const HomeRecommendPost = () => {
  const hasProfile = true; // 이력서 등록여부
  return (
    <section className="w-full flex gap-[0.5rem] px-[1.25rem] overflow-x-scroll no-scrollbar whitespace-nowrap bg-[#FEF387]">
      {hasProfile ? (
        // 이력서 등록 -> 추천 공고 보여주기
        <>
          {RECOMMEND_JOB_POSTING_LIST.map(
            (value: RecommendJobPostingItemType) => (
              <HomeRecommendPostCard key={value.id} jobPostingData={value} />
            ),
          )}
        </>
      ) : (
        // 이력서 미등록 -> 추가 메뉴 보여주기
        <>
          <article className="flex flex-col justify-between min-w-[11.25rem] w-[11.25rem] h-[8.75rem] pt-[0.75rem] pb-[1.125rem] px-[1.125rem] rounded-[1.5rem] border-[0.031rem] border-[#F4F4F9] shadow-cardShadow bg-[#F4F4F9]">
            <MessageIcon />
            <div>
              <p className="pb-[0.5rem] caption-1 text-[#656565]">
                프로필 채우기
              </p>
              <div className="button-2 text-[#1E1926] break-keep whitespace-normal">
                프로필을 작성하면 추천 공고를 열람할 수 있어요
              </div>
            </div>
          </article>
          <article className="flex flex-col justify-between min-w-[11.25rem] w-[11.25rem] h-[8.75rem] pt-[0.75rem] pb-[1.125rem] px-[1.125rem] rounded-[1.5rem] border-[0.031rem] border-[#F4F4F9] shadow-cardShadow bg-[#F4F4F9]">
            <MessageIcon />
            <div>
              <p className="pb-[0.5rem] caption-1 text-[#656565]">
                공고 찾아보기
              </p>
              <div className="button-2 text-[#1E1926] break-keep whitespace-normal">
                맘에 쏙 드는 공고들을 저장해보세요
              </div>
            </div>
          </article>
        </>
      )}
    </section>
  );
};

export default HomeRecommendPost;
