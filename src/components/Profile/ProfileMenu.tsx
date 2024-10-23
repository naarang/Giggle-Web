import { useState } from 'react';
import { IconType } from '@/constants/profile';
import ProfileIcon from '@/assets/icons/Profile/ProfileIcon.svg?react';
import ManageIcon from '@/assets/icons/Profile/ManageIcon.svg?react';
import ScrappedIcon from '@/assets/icons/Profile/ScrappedIcon.svg?react';
import NotificationIcon from '@/assets/icons/Profile/NotificationIcon.svg?react';
import LanguageIcon from '@/assets/icons/Profile/LanguageIcon.svg?react';
import LogoutIcon from '@/assets/icons/Profile/LogoutIcon.svg?react';
import ToggleBar from '@/assets/icons/Profile/ToggleBar.svg?react';
import ToggleButton from '@/assets/icons/Profile/ToggleButton.svg?react';

type ProfileMenuProps = {
  title: string;
  iconType: IconType;
  onClick: () => void;
  isToggle: boolean;
};

const ProfileMenu = ({
  title,
  iconType,
  onClick,
  isToggle,
}: ProfileMenuProps) => {
  const [toggleOn, setToggleOn] = useState<boolean>(true);

  const handleToggleChange = async () => {
    // 임시 코드로 아래 API 코드로 변경 예정
    setToggleOn(!toggleOn);

    /*
    try {
      // PATCH API 호출
      const response = await axios.patch('/api/v1/notification-allowed', {
        is_notification_allowed: toggleOn,
      });

      if (response.data.success) {
        setToggleOn(response.data.is_notification_allowed);
      } else {
        console.error('Error:', response.data.error);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
      */
  };

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
    <div
      onClick={onClick}
      className="flex items-center justify-between cursor-pointer p-6 rounded-[1.375rem]"
      style={{
        background:
          'linear-gradient(0deg, var(--grey, #F4F4F9) 0%, var(--grey, #F4F4F9) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%), url(<path-to-image>) lightgray 50% / cover no-repeat',
      }}
    >
      <div className="flex justify-center items-center gap-4">
        {Icon}
        <div className="body-2 text-[#1E1926]">{title}</div>
      </div>
      {isToggle && (
        <div className="relative flex items-center">
          <ToggleBar />
          <ToggleButton
            className={`absolute transform transition-transform duration-300 ease-in-out ${
              toggleOn ? 'translate-x-4' : 'translate-x-0'
            }`}
            onClick={handleToggleChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
