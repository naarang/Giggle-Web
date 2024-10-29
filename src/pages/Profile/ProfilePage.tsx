import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationStatus from '@/components/Profile/ApplicationStatus';
import DeleteAccount from '@/components/Profile/DeleteAccount';
import DeleteModal from '@/components/Profile/DeleteModal';
import LicenseCard from '@/components/Profile/LicenseCard';
import ProfileCard from '@/components/Profile/ProfileCard';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileMenuList from '@/components/Profile/ProfileMenuList';
import { UserProfileResponse } from '@/types/api/profile';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import LogoutBottomSheet from '@/components/Profile/LogoutBottomSheet';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserProfileResponse>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);

  // 계정 삭제 모달 핸들러
  const handleDeleteButton = (value: boolean) => {
    setModalOpen(value);
  };

  const handleLogoutClick = () => {
    setBottomSheetOpen(true);
  };

  // API - 2.9 탈퇴하기
  const handleAccountDelete = () => {
    // TODO: account 로직 추가
    navigate('/');
  };

  // API - 1.2 사용자 로그아웃
  const handleLogout = () => {
    // TODO: logout 로직 추가
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setBottomSheetOpen(false);
  };

  useEffect(() => {
    // 모달 열려있을 때 스크롤 비활성화
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // API 연결 - 3.3 (유학생) 유저 요약 정보 조회하기
    setUserData({
      profile_img_url:
        'https://images.pexels.com/photos/1458926/pexels-photo-1458926.jpeg?cs=srgb&dl=pexels-poodles2doodles-1458926.jpg&fm=jpg',
      first_name: 'Hyeona',
      last_name: 'Seol',
      birth: '0000-00-00',
      school_name: 'Dongguk University',
      grade: 3,
      gpa: 3.5,
      is_notification_allowed: true,
    });

    // 컴포넌트 언마운트 시에도 원래 상태로 복원
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  return (
    <>
      {/* user data API 데이터 통신 이후 페이지 렌딩(추후 로딩 처리) */}
      {userData && (
        <>
          {/* 계정 삭제 modal */}
          {modalOpen && (
            <DeleteModal
              onDeleteButton={handleDeleteButton}
              onAccountDelete={handleAccountDelete}
            />
          )}
          {/* bottom sheet */}
          {bottomSheetOpen && (
            <LogoutBottomSheet
              handleLogout={handleLogout}
              handleLogoutCancel={handleLogoutCancel}
            />
          )}
          <div className="w-full h-full min-h-[100vh] bg-profilePageGradient">
            {/* Profile 페이지 시작 */}
            <ProfileHeader />
            <div className="flex flex-col px-6 gap-9 pb-12">
              <ProfileCard data={userData.user_information} />
              <ApplicationStatus />
              <LicenseCard
                languageData={userData.language_level}
                metaData={userData.meta_data}
              />
              <ProfileMenuList
                onLogoutClick={handleLogoutClick}
                isNotificationAllowed={
                  userData.user_information.is_notification_allowed
                }
              />
            </div>
            <DeleteAccount onDeleteButton={handleDeleteButton} />
          </div>
        </>
      )}
    </>
  );
};

export default ProfilePage;
