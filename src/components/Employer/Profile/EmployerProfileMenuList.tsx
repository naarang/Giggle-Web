import ProfileMenu from '@/components/Profile/ProfileMenu';
import { IconType } from '@/constants/profile';
import { useNavigate } from 'react-router-dom';

type EmployerProfileMenuListProps = {
  handleBottomSheetOpen: () => void;
};

const EmployerProfileMenuList = ({
  handleBottomSheetOpen,
}: EmployerProfileMenuListProps) => {
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate('/employer/profile/edit');
  };

  return (
    <div className="flex flex-col gap-9 pt-9">
      <ProfileMenu
        title="회사/점포 정보 수정"
        iconType={IconType.PROFILE}
        onClick={handleEditProfileClick}
      />
      <ProfileMenu
        title="알림 수신"
        iconType={IconType.NOTIFICATION}
        isToggle={true}
      />
      <ProfileMenu
        title="로그아웃"
        iconType={IconType.LOGOUT}
        onClick={handleBottomSheetOpen}
      />
    </div>
  );
};

export default EmployerProfileMenuList;
