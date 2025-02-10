import BaseHeader from '@/components/Common/Header/BaseHeader';
import DeleteModal from '@/components/Profile/DeleteModal';
import ProfileMenu from '@/components/Profile/ProfileMenu';
import { IconType } from '@/constants/profile';
import { profileTranslation } from '@/constants/translation';
import { useUserStore } from '@/store/user';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '@/constants/user';

const AccountPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { account_type } = useUserStore();
  const navigate = useNavigate();
  // 계정 삭제 모달 핸들러
  const handleDeleteButton = (value: boolean) => {
    setModalOpen(value);
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
      {/* 계정 삭제 modal */}
      {modalOpen && (
        <DeleteModal
          onDeleteButton={handleDeleteButton} // 계정 삭제 취소 버튼
        />
      )}
      <BaseHeader
        hasBackButton
        onClickBackButton={() => navigate('/profile')}
        hasMenuButton={false}
        title={account_type === UserType.USER ? 'Account' : '계정'}
      />
      <div className="w-full h-full min-h-[100vh] bg-[#f4f4f9]">
        <div className="flex flex-col gap-4 px-4 pb-4 bg-white rounded-md">
          <div className="flex flex-col divide-y divide-gray-200">
            <ProfileMenu
              title={
                account_type === UserType.USER
                  ? profileTranslation.deleteAccount.en
                  : profileTranslation.deleteAccount.en
              }
              iconType={IconType.LOGOUT}
              onClick={() => handleDeleteButton(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
