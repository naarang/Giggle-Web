import { IconType } from '@/constants/profile';
import ProfileMenu from './ProfileMenu';

const ProfileMenuList = () => {
  const handleEditProfileClick = () => {};
  const handleManageClick = () => {};
  const handleScrappedClick = () => {};
  const handleNotificationClick = () => {};
  const handleLanguageClick = () => {};
  const handleLogoutClick = () => {};

  return (
    <>
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
      <ProfileMenu
        title="Notifications"
        iconType={IconType.NOTIFICATION}
        onClick={handleNotificationClick}
      />
      <ProfileMenu
        title="Language"
        iconType={IconType.LANGUAGE}
        onClick={handleLanguageClick}
      />
      <ProfileMenu
        title="Log out"
        iconType={IconType.LOGOUT}
        onClick={handleLogoutClick}
      />
    </>
  );
};

export default ProfileMenuList;
