import { IconType } from '@/constants/profile';
import { useNavigate } from 'react-router-dom';
import EmployerProfileMenu from '@/components/Employer/Profile/EmployerProfileMenu';

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
      <EmployerProfileMenu
        title="회사/점포 정보 수정"
        iconType={IconType.PROFILE}
        onClick={handleEditProfileClick}
      />
      <EmployerProfileMenu
        title="알림 수신"
        iconType={IconType.NOTIFICATION}
        isToggle={true}
      />
      <EmployerProfileMenu
        title="로그아웃"
        iconType={IconType.LOGOUT}
        onClick={handleBottomSheetOpen}
      />
    </div>
  );
};

export default EmployerProfileMenuList;
