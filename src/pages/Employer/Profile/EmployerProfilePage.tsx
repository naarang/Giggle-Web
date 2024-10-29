import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import EmployerJobInfo from '@/components/Employer/Profile/EmployerJobInfo';
import EmployerProfileCard from '@/components/Employer/Profile/EmployerProfileCard';
import EmployerProfileMenuList from '@/components/Employer/Profile/EmployerProfileMenuList';
import DeleteAccount from '@/components/Profile/DeleteAccount';
import DeleteModal from '@/components/Profile/DeleteModal';
import LogoutBottomSheet from '@/components/Profile/LogoutBottomSheet';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import { useLogout, useWithdraw } from '@/hooks/api/useAuth';
import { useState } from 'react';

const EmployerProfilePage = () => {
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [logoutBottomSheet, setLogoutBottomSheet] = useState(false);
  const { mutate: withdraw } = useWithdraw();
  const { mutate: logout } = useLogout();

  const handleAccountDelete = () => {
    withdraw;
  };

  const handleLogout = () => {
    logout;
  };

  return (
    <>
      {/* 계정 탈퇴 모달 */}
      {withdrawModal && (
        <DeleteModal
          onDeleteButton={setWithdrawModal} // 삭제 취소 버튼
          onAccountDelete={handleAccountDelete} // 삭제 버튼
        />
      )}
      {/* 로그아웃 바텀시트 */}
      {logoutBottomSheet && (
        <LogoutBottomSheet
          handleLogout={handleLogout} // 로그아웃 버튼
          handleLogoutCancel={() => setLogoutBottomSheet(false)} // 취소 버튼
        />
      )}
      <div>
        <ProfileHeader />
        <div className="px-6">
          <div className="px-[1.125rem] pt-5 pb-4 flex flex-col gap-6">
            <EmployerProfileCard />
            <EmployerJobInfo />
          </div>
          <EmployerProfileMenuList />
          <DeleteAccount onDeleteButton={setWithdrawModal} />
        </div>
      </div>
    </>
  );
};

export default EmployerProfilePage;
