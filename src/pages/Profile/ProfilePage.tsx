import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationStatus from '@/components/Profile/ApplicationStatus';
import DeleteAccount from '@/components/Profile/DeleteAccount';
import DeleteModal from '@/components/Profile/DeleteModal';
import LicenseCard from '@/components/Profile/LicenseCard';
import ProfileCard from '@/components/Profile/ProfileCard';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileMenuList from '@/components/Profile/ProfileMenuList';
import { UserProfileData } from '@/types/api/profile';

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserProfileData>({
    user_information: {
      profile_img_url:
        'https://images.pexels.com/photos/1458926/pexels-photo-1458926.jpeg?cs=srgb&dl=pexels-poodles2doodles-1458926.jpg&fm=jpg',
      first_name: 'Hyeona',
      last_name: 'Seol',
      birth: '0000.00.00',
      school_name: 'Dongguk University',
      grade: 3,
      gpa: 3.5,
      is_notification_allowed: true,
    },
    language_level: {
      topik_level: 1,
      kiip_level: 1,
      sejong_level: 1,
    },
    meta_data: {
      weekend_work_hour: 20,
      weekday_work_hour: 30,
      is_topik_4_or_more: true,
      is_metropolitan_area: true,
    },
  });

  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 계정 삭제 모달 핸들러
  const handleDeleteButton = (value: boolean) => {
    setModalOpen(value);
  };

  // API - 계정 삭제
  const handleAccountDelete = () => {
    // TODO: account 로직 추가
    navigate('/');
  };

  useEffect(() => {
    if (modalOpen) {
      // 모달이 열려 있을 때 body 스크롤 비활성화
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫히면 스크롤 활성화
      document.body.style.overflow = 'auto';
    }

    // 컴포넌트 언마운트 시에도 원래 상태로 복원
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  return (
    <>
      {modalOpen && (
        <DeleteModal
          handleDeleteButton={handleDeleteButton}
          handleAccountDelete={handleAccountDelete}
        />
      )}
      <div
        className="w-full h-full min-h-[100vh]"
        style={{
          background: 'linear-gradient(180deg, #FEF387 0.01%, #FFF 46.31%)',
        }}
      >
        <ProfileHeader />
        <div className="flex flex-col px-6 gap-9 pb-24">
          <ProfileCard data={userData.user_information} />
          <ApplicationStatus />
          <LicenseCard
            languageData={userData.language_level}
            metaData={userData.meta_data}
          />
          <ProfileMenuList
            isNotificationAllowed={
              userData.user_information.is_notification_allowed
            }
          />
        </div>
        <DeleteAccount handleDeleteButton={handleDeleteButton} />
      </div>
    </>
  );
};

export default ProfilePage;
