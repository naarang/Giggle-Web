import { IconType } from '@/constants/profile';
import ProfileMenu from '@/components/Profile/ProfileMenu';
import { useNavigate } from 'react-router-dom';

type ProfileMenuListProps = {
  isNotificationAllowed: boolean;
  onLogoutClick: () => void;
};

const ProfileMenuList = ({
  isNotificationAllowed,
  onLogoutClick,
}: ProfileMenuListProps) => {
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate('/profile/edit');
  };
  const handleManageClick = () => {
    navigate('/profile/manage-resume');
  };
  const handleScrappedClick = () => {
    navigate('/resume/scrapped');
  };
  const handleLanguageClick = () => {
    // API - 언어 설정(추후 적용 예정)
    navigate('/profile/language');
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <ProfileMenu
          title="Edit Profile"
          iconType={IconType.PROFILE}
          onClick={handleEditProfileClick}
        />
        <ProfileMenu
          title="Manage Resume"
          iconType={IconType.MANAGE}
          onClick={handleManageClick}
        />
        <ProfileMenu
          title="Scrapped Job Posts"
          iconType={IconType.SCRAPPED}
          onClick={handleScrappedClick}
        />
      </div>
      <div className="flex flex-col gap-4">
        <ProfileMenu
          title="Notifications"
          iconType={IconType.NOTIFICATION}
          isToggle={isNotificationAllowed}
        />
        <ProfileMenu
          title="Language"
          iconType={IconType.LANGUAGE}
          onClick={handleLanguageClick}
        />
      </div>
      <ProfileMenu
        title="Log out"
        iconType={IconType.LOGOUT}
        onClick={onLogoutClick}
      />
    </div>
  );
};

export default ProfileMenuList;
