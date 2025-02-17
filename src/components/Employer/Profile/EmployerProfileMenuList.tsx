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
  const handleAccountClick = () => {
    navigate('/profile/account');
  };
  const handleAboutClick = () => {
    navigate('/profile/about');
  };

  return (
    <div className="flex flex-col gap-4 px-4 pb-4 bg-white rounded-lg">
      <div className="flex flex-col divide-y divide-gray-200">
        <EmployerProfileMenu
          title="계정"
          iconType={IconType.PROFILE}
          onClick={handleAccountClick}
        />
        <EmployerProfileMenu
          title="알림 수신"
          iconType={IconType.NOTIFICATION}
          isToggle={true}
        />
        <EmployerProfileMenu
          title="정보"
          iconType={IconType.PROFILE}
          onClick={handleAboutClick}
        />
        <button
          className="grow w-full bg-[#ebeef1] rounded-lg px-5 py-3 text-center button-2 text-[#1E1926]"
          onClick={handleBottomSheetOpen}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default EmployerProfileMenuList;
