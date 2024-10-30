import NoSearchResultImg from '@/assets/images/NoSearchResultImg.png';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import JobPostingCard from '@/components/Common/JobPostingCard';
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
import { usePostSearchStore } from '@/store/postSearch';
import { POST_SORTING } from '@/constants/postSearch';
import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';

type PostSearchResultProps = {
  postData: JobPostingItemType[];
};

const PostSearchResult = ({ postData }: PostSearchResultProps) => {
  const { sortType, updateSortType } = usePostSearchStore();
  // TODO: 홈에서 See more 버튼 클릭 시 해당 메뉴로 정렬하기

  return (
    <section className="flex flex-col items-center gap-[1rem] w-full mt-[1rem] px-[1.5rem]">
      <div className="w-full flex justify-between items-center">
        <h3 className="head-3 text-black">Search Result</h3>
        <SearchSortDropdown
          options={Object.values(POST_SORTING).map((value) =>
            value.toLowerCase(),
          )}
          value={sortType.toLowerCase()}
          onSelect={(sort) =>
            updateSortType(sort.toUpperCase() as PostSortingType)
          }
        />
      </div>
      {postData?.length ? (
        postData.map((value: JobPostingItemType) => (
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
