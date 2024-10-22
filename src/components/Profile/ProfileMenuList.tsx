import { IconType } from '@/constants/profile';
import ProfileMenu from './ProfileMenu';

type ProfileMenuListProps = {
  isNotificationAllowed: boolean;
};

const ProfileMenuList = ({ isNotificationAllowed }: ProfileMenuListProps) => {
  const handleEditProfileClick = () => {};
  const handleManageClick = () => {};
  const handleScrappedClick = () => {};
  const handleNotificationClick = () => {};
  const handleLanguageClick = () => {};
  const handleLogoutClick = () => {};

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <ProfileMenu
          title="Edit Profile"
          iconType={IconType.PROFILE}
          onClick={handleEditProfileClick}
          isToggle={false}
        />
        <ProfileMenu
          title="Manage Resume"
          iconType={IconType.MANAGE}
          onClick={handleManageClick}
          isToggle={false}
        />
        <ProfileMenu
          title="Scrapped Job Posts"
          iconType={IconType.SCRAPPED}
          onClick={handleScrappedClick}
          isToggle={false}
        />
      </div>
      <div className="flex flex-col gap-4">
        <ProfileMenu
          title="Notifications"
          iconType={IconType.NOTIFICATION}
          onClick={handleNotificationClick}
          isToggle={isNotificationAllowed}
        />
        <ProfileMenu
          title="Language"
          iconType={IconType.LANGUAGE}
          onClick={handleLanguageClick}
          isToggle={false}
        />
      </div>
      <ProfileMenu
        title="Log out"
        iconType={IconType.LOGOUT}
        onClick={handleLogoutClick}
        isToggle={false}
      />
    </div>
  );
};

export default ProfileMenuList;
