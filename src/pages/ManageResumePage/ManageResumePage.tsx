import BaseHeader from '@/components/Common/Header/BaseHeader';
import MypageCardSection from '@/components/ManageResume/MypageCardSection';
import ProfilePicture from '@/components/ManageResume/ProfilePicture';
import ResumeEditSection from '@/components/ManageResume/ResumeEditSection';
import { useNavigate } from 'react-router-dom';
import { useGetResume } from '@/hooks/api/useResume';

const ManageResumePage = () => {
  const navigate = useNavigate();
  const { data } = useGetResume();

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
                name={data.data.name}
                profileImg={data.data.profile_img_url}
              />
              <MypageCardSection
                visaData={data.data.visa}
                personalData={data.data.personal_information}
              />
            </div>
            <ResumeEditSection
              introductionData={data.data.introduction}
              workexperienceData={data.data.work_experience}
              educationData={data.data.education}
              languageData={data.data.languages}
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
