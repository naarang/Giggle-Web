import { IconType } from '@/constants/profile';
import ProfileMenu from '@/components/Profile/ProfileMenu';
import { useNavigate } from 'react-router-dom';

type ProfileMenuListProps = {
  onLogoutClick: () => void;
};

const ProfileMenuList = ({ onLogoutClick }: ProfileMenuListProps) => {
  const navigate = useNavigate();

  const handleAccountClick = () => {
    navigate('/profile/account');
  };
  const handleScrappedClick = () => {
    navigate('/resume/scrapped');
  };
  const handleLanguageClick = () => {
    navigate('/profile/language');
  };
  const handleAboutClick = () => {
    navigate('/profile/about');
  };
//TODO: 아이콘 에셋 나오면 추가
  return (
    <div className="flex flex-col gap-4 px-4 pb-4 bg-white rounded-md">
      <div className="flex flex-col divide-y divide-gray-200">
        <ProfileMenu
          title="Scrapped Job Posts"
          iconType={IconType.SCRAPPED}
          onClick={handleScrappedClick}
        />
        <ProfileMenu
          title="Account"
          iconType={IconType.PROFILE}
          onClick={handleAccountClick}
        />
        <ProfileMenu
          title="Notifications"
          iconType={IconType.NOTIFICATION}
          isToggle={true}
        />
        <ProfileMenu
          title="Language"
          iconType={IconType.LANGUAGE}
          onClick={handleLanguageClick}
        />
        <ProfileMenu
          title="About"
          iconType={IconType.LOGOUT}
          onClick={handleAboutClick}
        />
      </div>
      <button
        className="grow w-full bg-[#ebeef1] rounded-md px-5 py-3 text-center button-2 text-[#1E1926]"
        onClick={onLogoutClick}
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfileMenuList;
