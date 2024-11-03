import NoSearchResultImg from '@/assets/images/NoSearchResultImg.png';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import JobPostingCard from '@/components/Common/JobPostingCard';
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
import { POST_SORTING } from '@/constants/postSearch';
import { usePostSearchStore } from '@/store/postSearch';
import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';

type PostSearchResultProps = {
  postData: JobPostingItemType[];
  onChangeSortType: (sort: PostSortingType) => void;
};

const PostSearchResult = ({
  postData,
  onChangeSortType,
}: PostSearchResultProps) => {
  const { sortType } = usePostSearchStore();

  const { account_type } = useUserStore();

  return (
    <section className="flex flex-col items-center gap-[1rem] w-full mt-[1rem] px-[1.5rem] pb-[6rem]">
      <div className="w-full flex justify-between items-center">
        <h3 className="head-3 text-black">Search Result</h3>
        <SearchSortDropdown
          options={Object.values(POST_SORTING).map((value) =>
            value.toLowerCase(),
          )}
          value={sortType.toLowerCase()}
          onSelect={(value) => onChangeSortType(value as PostSortingType)}
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
            <h3 className="head-2 text-[#1E1926]">
              {account_type === UserType.OWNER
                ? '찾을 수 없음'
                : 'No results found'}
            </h3>
            <p className="body-2 text-[#656565] text-center">
              {account_type === UserType.OWNER
                ? '검색 결과를 찾을 수 없습니다. 다른 방법을 시도해보세요.'
                : 'The search could not be found, please check spelling or write another word.'}
            </p>
          </div>
        </>
      )}
    </section>
  );
};

export default PostSearchResult;
