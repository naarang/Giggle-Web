import BaseHeader from '@/components/Common/Header/BaseHeader';
import JobPostingCard from '@/components/Common/JobPostingCard';
import { useGetBookmarkPostList } from '@/hooks/api/usePost';
import { ScrappedJobPostingType } from '@/types/api/mypage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScrappedJobPostsPage = () => {
  const navigate = useNavigate();
  const [jobPostingData, setJobPostingData] = useState<
    ScrappedJobPostingType[]
  >([]);

  // TODO: 무한스크롤 구현
  const { data } = useGetBookmarkPostList(1, 20);

  useEffect(() => {
    // API - 5.1 (유학생) 북마크한 공고 리스트 조회하
    if (data?.data?.job_posting_list) {
      const updatedJobPostingData = data.data.job_posting_list.map(
        (item: ScrappedJobPostingType) => ({
          ...item,
          is_book_marked: true,
        }),
      );
      setJobPostingData(updatedJobPostingData);
    }
  }, [data]);
  return (
    <>
      <BaseHeader
        hasBackButton
        onClickBackButton={() => navigate('/profile')}
        hasMenuButton={false}
        title="Scrap Job Posting"
      />
      <div className="p-6 flex flex-col gap-4">
        {jobPostingData.map((post) => (
          <JobPostingCard key={post.id} jobPostingData={post} />
        ))}
      </div>
    </>
  );
};

export default ScrappedJobPostsPage;
