import AlarmIcon from '@/assets/icons/Home/AlarmIcon.svg?react';
import HeaderLogoIcon from '@/assets/icons/Home/HeaderLogoIcon.svg?react';
import { useGetAlarms } from '@/hooks/api/useAlarm';
import { useUserStore } from '@/store/user';
import { AlarmItemType } from '@/types/api/alarm';
import { useNavigate } from 'react-router-dom';

const HomeHeader = () => {
  const navigate = useNavigate();
  const { account_type } = useUserStore();
  const { data } = useGetAlarms(1, 50, account_type ? true : false);

  const isReadAlarms = (alarms: AlarmItemType[]) => {
    const isRead = alarms.some((alarm) => !alarm.is_read);
    return isRead;
  };

  return (
    <header className="w-full h-[3.75rem] px-4 py-2 flex justify-between items-center border-b border-[#E2E5EB]">
      <HeaderLogoIcon />
      <button
        className="w-[2rem] h-[2rem] flex justify-center items-center relative  rounded-[1.25rem]"
        onClick={() => account_type && navigate('/alarm')}
      >
        <AlarmIcon />
        {/* 알람이 있을 때만 표시하기 */}
        {data?.success && isReadAlarms(data?.data?.notification_list) && (
          <div className="absolute top-[0.2rem] right-[0.4rem] w-[0.438rem] h-[0.438rem] rounded-full bg-[#FF6F61]"></div>
        )}
      </button>
    </header>
  );
};

export default HomeHeader;
