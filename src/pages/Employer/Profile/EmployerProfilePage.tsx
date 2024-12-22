import EmployerJobInfo from '@/components/Employer/Profile/EmployerJobInfo';
import EmployerProfileCard from '@/components/Employer/Profile/EmployerProfileCard';
import EmployerProfileMenuList from '@/components/Employer/Profile/EmployerProfileMenuList';
import DeleteAccount from '@/components/Profile/DeleteAccount';
import DeleteModal from '@/components/Profile/DeleteModal';
import LogoutBottomSheet from '@/components/Profile/LogoutBottomSheet';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import { useLogout } from '@/hooks/api/useAuth';
import { useEffect, useState } from 'react';

const EmployerProfilePage = () => {
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [logoutBottomSheet, setLogoutBottomSheet] = useState(false);
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
  const handleBottomSheetOpen = () => {
    setLogoutBottomSheet(true);
  };

  useEffect(() => {
    // 모달 열려있을 때 스크롤 비활성화
    if (withdrawModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // 컴포넌트 언마운트 시에도 원래 상태로 복원
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [withdrawModal]);

  return (
    <>
      {/* 계정 탈퇴 모달 */}
      {withdrawModal && (
        <DeleteModal
          onDeleteButton={setWithdrawModal} // 계정 탈퇴 취소 버튼
        />
      )}
      {/* 로그아웃 바텀시트 */}
      {logoutBottomSheet && (
        <LogoutBottomSheet
          handleLogout={handleLogout} // 로그아웃 버튼
          handleLogoutCancel={() => setLogoutBottomSheet(false)} // 취소 버튼
          isShowBottomsheet={logoutBottomSheet}
          setIsShowBottomSheet={setLogoutBottomSheet}
        />
      )}
      <div>
        <ProfileHeader />
        <div className="px-6">
          <div className="px-[1.125rem] pt-5 pb-4 flex flex-col gap-6">
            <EmployerProfileCard />
            <EmployerJobInfo />
          </div>
          <EmployerProfileMenuList
            handleBottomSheetOpen={handleBottomSheetOpen}
          />
        </div>
        <div className="mt-32">
          <DeleteAccount onDeleteButton={setWithdrawModal} />
        </div>
      </div>
    </>
  );
};

export default EmployerProfilePage;
