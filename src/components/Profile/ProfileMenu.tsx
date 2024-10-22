import ProfileIcon from '@/assets/icons/Profile/ProfileIcon.svg?react';
import ManageIcon from '@/assets/icons/Profile/ManageIcon.svg?react';
import ScrappedIcon from '@/assets/icons/Profile/ScrappedIcon.svg?react';
import NotificationIcon from '@/assets/icons/Profile/NotificationIcon.svg?react';
import LanguageIcon from '@/assets/icons/Profile/LanguageIcon.svg?react';
import LogoutIcon from '@/assets/icons/Profile/LogoutIcon.svg?react';
import { IconType } from '@/constants/profile';

type ProfileMenuProps = {
  title: string;
  iconType: IconType;
  onClick: () => void;
};

const ProfileMenu = ({ title, iconType, onClick }: ProfileMenuProps) => {
  const iconMapping = (iconType: IconType) => {
    switch (iconType) {
      case IconType.PROFILE:
        return <ProfileIcon />;
      case IconType.MANAGE:
        return <ManageIcon />;
      case IconType.SCRAPPED:
        return <ScrappedIcon />;
      case IconType.NOTIFICATION:
        return <NotificationIcon />;
      case IconType.LANGUAGE:
        return <LanguageIcon />;
      case IconType.LOGOUT:
        return <LogoutIcon />;
      default:
        return null;
    }
  };

  const Icon = iconMapping(iconType);

  return (
    <div onClick={onClick} className="flex items-center gap-2 cursor-pointer">
      {Icon}
      <div>{title}</div>
    </div>
  );
};

export default ProfileMenu;
