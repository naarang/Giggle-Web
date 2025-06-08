import { useEffect, useState } from 'react';
import { usePatchNotificationAllowed } from '@/hooks/api/useSetting';
import { useGetUserSummaries } from '@/hooks/api/useProfile';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import ArrowIcon from '@/assets/icons/Chevron.svg?react';
import ToggleButton from '../Common/ToggleButton';

type ProfileMenuProps = {
  title: string;
  onClick?: () => void;
  isToggle?: boolean;
};

const ProfileMenu = ({ title, onClick, isToggle }: ProfileMenuProps) => {
  const { account_type } = useUserStore();
  const { mutate: patchNotificationAllowed } = usePatchNotificationAllowed();
  const { data: notificaionAllowed } = useGetUserSummaries(
    account_type === UserType.USER,
  );

  const [toggleOn, setToggleOn] = useState<boolean>(false);

  useEffect(() => {
    // 알림 설정 상태 불러오기
    if (isToggle && notificaionAllowed) {
      setToggleOn(
        notificaionAllowed.data.user_information.is_notification_allowed,
      );
    }
  }, [isToggle, notificaionAllowed]);

  const handleToggleChange = () => {
    // 알림 설정 변경
    patchNotificationAllowed(!toggleOn, {
      onSuccess: () => {
        setToggleOn(!toggleOn);
      },
    });
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between cursor-pointer p-4 bg-white  bg-cover bg-no-repeat bg-center"
    >
      <div className="flex justify-center items-center gap-4">
        <div className="heading-18-semibold text-text-strong">{title}</div>
      </div>
      {isToggle ? (
        <ToggleButton isOn={toggleOn} onChange={handleToggleChange} />
      ) : (
        <div className="flex items-center">
          <ArrowIcon />
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
