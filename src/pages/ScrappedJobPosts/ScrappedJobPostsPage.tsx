import BaseHeader from '@/components/Common/Header/BaseHeader';
import JobPostingCard from '@/components/Common/JobPostingCard';
import { ScrappedJobPostsData } from '@/constants/manageResume';
import { ScrappedJobPostingType } from '@/types/api/mypage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScrappedJobPostsPage = () => {
  const navigate = useNavigate();
  const [jobPostingData, setJobPostingData] =
    useState<ScrappedJobPostingType[]>();

  useEffect(() => {
    // TODO: API - 5.1 (유학생) 북마크한 공고 리스트 조회하
    setJobPostingData(ScrappedJobPostsData);
  }, []);
  return (
    <>
      {jobPostingData ? (
        <div>
          <BaseHeader
            hasBackButton={true}
            onClickBackButton={() => navigate('/profile/manage-resume')}
            hasMenuButton={false}
            title="Scrap Job Posting"
          />
          <div className="p-6 flex flex-col gap-4">
            {jobPostingData.map((post) => (
              <JobPostingCard jobPostingData={post} />
            ))}
          </div>
        </div>
      ) : (
        <div>로딩 중</div>
      )}
    </>
  );
};

export default ScrappedJobPostsPage;
