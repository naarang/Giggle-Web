import ApplicationStatus from '@/components/Profile/ApplicationStatus';
import DeleteAccount from '@/components/Profile/DeleteAccount';
import DeleteModal from '@/components/Profile/DeleteModal';
import LicenseCard from '@/components/Profile/LicenseCard';
import ProfileCard from '@/components/Profile/ProfileCard';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileMenuList from '@/components/Profile/ProfileMenuList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
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
          <ProfileCard />
          <ApplicationStatus />
          <LicenseCard />
          <ProfileMenuList />
        </div>
        <DeleteAccount handleDeleteButton={handleDeleteButton} />
      </div>
    </>
  );
};

export default ProfilePage;
