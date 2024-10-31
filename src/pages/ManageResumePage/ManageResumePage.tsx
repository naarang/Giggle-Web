import BaseHeader from '@/components/Common/Header/BaseHeader';
import MypageCardSection from '@/components/ManageResume/MypageCardSection';
import ProfilePicture from '@/components/ManageResume/ProfilePicture';
import ResumeEditSection from '@/components/ManageResume/ResumeEditSection';
import { useNavigate } from 'react-router-dom';
import { useGetResume } from '@/hooks/api/useResume';
import { useEffect, useState } from 'react';
import { UserResumeDetailResponse } from '@/types/api/resumes';

const ManageResumePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<UserResumeDetailResponse>();
  const { data: resumeData } = useGetResume();

  useEffect(() => {
    if (resumeData) {
      setData(resumeData.data);
    }
  }, [resumeData]);

  return (
    <>
      {data ? (
        <>
          <BaseHeader
            hasBackButton={true}
            onClickBackButton={() => navigate('/profile')}
            hasMenuButton={false}
            title="Manage Resume"
          />
          <div className="flex flex-col px-6 gap-9 pb-9">
            <div className="flex flex-col pt-5 pb-4 gap-6">
              <ProfilePicture
                name={data.name}
                profileImg={data.profile_img_url}
              />
              <MypageCardSection
                visaData={data.visa}
                personalData={data.personal_information}
              />
            </div>
            <ResumeEditSection
              introductionData={data.introduction}
              workexperienceData={data.work_experience}
              educationData={data.education}
              languageData={data.languages}
            />
          </div>
        </>
      ) : (
        <div>로딩 중</div>
      )}
    </>
  );
};

export default ManageResumePage;
