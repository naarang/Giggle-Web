import { useEffect, useState } from 'react';
import ApplicationStatus from '@/components/Profile/ApplicationStatus';
import DeleteAccount from '@/components/Profile/DeleteAccount';
import DeleteModal from '@/components/Profile/DeleteModal';
import LicenseCard from '@/components/Profile/LicenseCard';
import ProfileCard from '@/components/Profile/ProfileCard';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileMenuList from '@/components/Profile/ProfileMenuList';
import LogoutBottomSheet from '@/components/Profile/LogoutBottomSheet';
import { UserProfileSummaryData } from '@/constants/profile';
import { useLogout } from '@/hooks/api/useAuth';
// import { useGetUserSummaries } from '@/hooks/api/useProfile';

const ProfilePage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);

  // TODO: API 완료, 퍼블리싱 작업 중 주석 처리
  // const { data } = useGetUserSummaries();
  const data = UserProfileSummaryData;

  // 계정 삭제 모달 핸들러
  const handleDeleteButton = (value: boolean) => {
    setModalOpen(value);
  };
  // 로그아웃 바텀시트 핸들러
  const handleLogoutClick = () => {
    setBottomSheetOpen(true);
  };

  // API - 1.2 사용자 로그아웃
  const { mutate: logout } = useLogout();
  const handleLogout = () => {
    logout;
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
    // 컴포넌트 언마운트 시에도 원래 상태로 복원
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  return (
    <>
      {data && data.success ? (
        <>
          {/* 계정 삭제 modal */}
          {modalOpen && (
            <DeleteModal
              onDeleteButton={handleDeleteButton} // 계정 삭제 취소 버튼
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
              <ProfileCard data={data.data.user_information} />
              <ApplicationStatus />
              <LicenseCard
                metaData={data.data.meta_data}
                languageData={data.data.language_level}
              />
              <ProfileMenuList onLogoutClick={handleLogoutClick} />
            </div>
            <DeleteAccount onDeleteButton={handleDeleteButton} />
          </div>
        </>
      ) : (
        <div>로딩 중</div>
      )}
    </>
  );
};

export default ProfilePage;
