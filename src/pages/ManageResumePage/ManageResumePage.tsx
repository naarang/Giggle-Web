import { useEffect, useState } from 'react';
import { ResumeDetailItemType } from '@/types/postApply/resumeDetailItem';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import MypageCardSection from '@/components/ManageResume/MypageCardSection';
import ProfilePicture from '@/components/ManageResume/ProfilePicture';
import ResumeEditSection from '@/components/ManageResume/ResumeEditSection';
import useNavigateBack from '@/hooks/useNavigateBack';

const ManageResumePage = () => {
  const [data, setData] = useState<ResumeDetailItemType>();
  const handleBackButtonClick = useNavigateBack();

  useEffect(() => {
    setData({
      profile_img_url:
        'https://images.pexels.com/photos/1458926/pexels-photo-1458926.jpeg?cs=srgb&dl=pexels-poodles2doodles-1458926.jpg&fm=jpg',
      name: 'John Doe',
      visa: {
        visa: 'D_2_2',
        description: 'Student visa for academic studies',
      },
      personal_information: {
        main_address: '123 Main Street, Seoul',
        detailed_address: 'Apt 45B, Gangnam-gu',
        phone_number: '010-1234-5678',
        email: 'john.doe@example.com',
      },
      introduction:
        'A passionate software developer with experience in full-stack development.',
      work_experience: [
        {
          id: 1,
          title: 'Restaurant Work',
          description:
            'Worked on developing and maintaining a web application.',
          start_date: '2021-03-01',
          end_date: '2023-05-15',
          duration: 805,
          work_place: 'Some Rastaurant',
        },
      ],
      education: [
        {
          id: 1,
          education_level: 'ASSOCIATE',
          school_name: 'Dongguk University',
          major: 'Department of Computer Engineering',
          start_date: '2017-03-01',
          end_date: '2021-02-28',
          grade: 3,
        },
      ],
      languages: {
        topik: 5,
        social_integration: 80,
        sejong_institute: 85,
        etc: [
          {
            id: 1,
            laguage_name: 'English',
            level: 4,
          },
          {
            id: 2,
            laguage_name: 'Japanese',
            level: 3,
          },
        ],
      },
    });
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
