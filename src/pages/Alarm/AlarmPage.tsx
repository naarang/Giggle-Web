import AlarmCard from '@/components/Alarm/AlarmCard';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { useGetAlarms, usePatchReadAlarm } from '@/hooks/api/useAlarm';
import { AlarmItemType } from '@/types/api/alarm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlarmPage = () => {
  // TODO: 우선은 한 페이지에 10개까지 보여주도록 설정
  const { data } = useGetAlarms(1, 10, true);
  const { mutateAsync } = usePatchReadAlarm();

  const navigate = useNavigate();

  const [alarmList, setAlarmList] = useState<AlarmItemType[]>([]);

  useEffect(() => {
    setAlarmList(data?.data?.notification_list ?? []);
  }, [data]);

  const readAlarm = async (id: number) => {
    const result = await mutateAsync(id);
    if (result?.success)
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
