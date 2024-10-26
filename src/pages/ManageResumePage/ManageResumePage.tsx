import { useEffect, useState } from 'react';
import { ResumeDetailItemType } from '@/types/postApply/resumeDetailItem';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import MypageCardSection from '@/components/ManageResume/MypageCardSection';
import ProfilePicture from '@/components/ManageResume/ProfilePicture';
import ResumeEditSection from '@/components/ManageResume/ResumeEditSection';
import useNavigateBack from '@/hooks/useNavigateBack';
import { ResumeData } from '@/constants/manageResume';

const ManageResumePage = () => {
  const [data, setData] = useState<ResumeDetailItemType>();
  const handleBackButtonClick = useNavigateBack();

  useEffect(() => {
    // TODO : API - 7.1 (유학생/고용주) 이력서 조회하기
    // 더이데이터 수정
    setData(ResumeData);
  }, []);
  return (
    <>
      {data ? (
        <>
          <BaseHeader
            hasBackButton={true}
            onClickBackButton={handleBackButtonClick}
            hasMenuButton={false}
            title="Manage Resume"
          />
          <div className="flex flex-col px-6 gap-9 pb-9">
            <div className="flex flex-col pt-5 pb-4 gap-6">
              <ProfilePicture
                name={data?.name}
                profileImg={data?.profile_img_url}
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
