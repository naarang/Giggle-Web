import ProfileMenu from '@/components/Profile/ProfileMenu';
import { IconType } from '@/constants/profile';

const EmployerProfileMenuList = () => {
  return (
    <div className="flex flex-col gap-9 pt-9">
      <ProfileMenu
        title="회사/점포 정보 수정"
        iconType={IconType.PROFILE}
        onClick={() => {}}
      />
      <ProfileMenu
        title="알림 수신"
        iconType={IconType.NOTIFICATION}
        isToggle={true}
      />
      <ProfileMenu
        title="로그아웃"
        iconType={IconType.LOGOUT}
        onClick={() => {}}
      />
    </div>
  );
};

export default EmployerProfileMenuList;
