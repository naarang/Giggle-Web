import AlarmCard from '@/components/Alarm/AlarmCard';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { ALARM_LIST_DATA } from '@/constants/alarm';
import { AlarmItemType } from '@/types/api/alarm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlarmPage = () => {
  const navigate = useNavigate();

  const [alarmList, setAlarmList] = useState<AlarmItemType[]>([]);

  useEffect(() => {
    // TODO: 10.1로 조회
    setAlarmList(ALARM_LIST_DATA);
  }, []);

  const readAlarm = (id: number) => {
    // TODO: 10.2 호출하기
    // 성공 시 색상 변경
    setAlarmList([
      ...alarmList.map((data) =>
        data.id === id ? { ...data, is_read: true } : data,
      ),
    ]);
  };

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate('/')}
        hasMenuButton={false}
        title="Notification"
      />
      <section className="flex flex-col gap-[1rem] w-full p-[1rem] pb-[5rem]">
        {alarmList?.map((data) => (
          <AlarmCard key={data.id} alarmData={data} readAlarm={readAlarm} />
        ))}
      </section>
    </>
  );
};

export default AlarmPage;
