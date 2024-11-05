import AlarmIcon from '@/assets/icons/Home/AlarmIcon.svg?react';
import { UserType } from '@/constants/user';
import { useGetAlarms } from '@/hooks/api/useAlarm';
import { useUserStore } from '@/store/user';
import { AlarmItemType } from '@/types/api/alarm';
import { useNavigate } from 'react-router-dom';

const HomeHeader = () => {
  const navigate = useNavigate();
  const { account_type, name } = useUserStore();
  const { data } = useGetAlarms(1, 50, account_type ? true : false);

  const isReadAlarms = (alarms: AlarmItemType[]) => {
    const isRead = alarms.some((alarm) => !alarm.is_read);
    return isRead;
  };

  if (!data?.success) return <></>;

  return (
    <section className="w-full pt-[3.125rem] pb-[1rem] px-[1.5rem] bg-[#FEF387]">
      <p className="pb-[0.375rem] body-2 text-[#37383C9C]">
        {account_type === UserType.OWNER ? '환영합니다!' : 'Welcome!'}{' '}
        {name.replace(/-/g, ' ')}{' '}
        {account_type === UserType.OWNER ? '고용주님' : ''}
      </p>
      <div className="w-full flex">
        <h1 className="flex-1 title-1 text-[#0A0909]">
          {account_type === UserType.OWNER ? '최고의 근로자를' : 'Find your'}{' '}
          <br />
          {account_type === UserType.OWNER
            ? '찾을 수 있습니다.'
            : 'perfect job'}
        </h1>
        {/* 로그인 시에만 표시하기 */}
        {account_type && (
          <button
            className="w-[2rem] h-[2rem] flex justify-center items-center relative bg-[#FFFAEDCC] rounded-[1.25rem]"
            onClick={() => navigate('/alarm')}
          >
            <AlarmIcon />
            {/* 알람이 있을 때만 표시하기 */}
            {isReadAlarms(data?.data?.notification_list) ? (
              <div className="absolute top-[0.3rem] right-[0.4rem] w-[0.438rem] h-[0.438rem] rounded-full bg-[#FF6F61]"></div>
            ) : (
              <></>
            )}
          </button>
        )}
      </div>
    </section>
  );
};

export default HomeHeader;
