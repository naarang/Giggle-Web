import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeDetailItemType } from '@/types/postApply/resumeDetailItem';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import MypageCardSection from '@/components/ManageResume/MypageCardSection';
import ProfilePicture from '@/components/ManageResume/ProfilePicture';
import ResumeEditSection from '@/components/ManageResume/ResumeEditSection';

const ManageResumePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ResumeDetailItemType>();

  const handleBackButtonClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

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
          title: 'Software Engineer',
          description:
            'Worked on developing and maintaining a web application.',
          start_date: '2021-03-01',
          end_date: '2023-05-15',
          duration: 805,
        },
      ],
      education: [
        {
          id: 1,
          education_level: 'ASSOCIATE',
          school_name: 'Seoul National University',
          major: 'Computer Science',
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
              introData={data.introduction}
              workData={data.work_experience}
              eduData={data.education}
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
