import { AlarmItemType } from '@/types/api/alarm';
import YelloLogoIcon from '@/assets/icons/YellowLogoIcon.svg?react';

type AlarmCardProps = {
  alarmData: AlarmItemType;
  readAlarm: (id: number) => void;
};

const AlarmCard = ({ alarmData, readAlarm }: AlarmCardProps) => {
  return (
    <article
      className={`flex items-center gap-[0.5rem] w-full px-[1rem] py-[0.5rem] rounded-[0.5rem] shadow-alarmShadow ${alarmData.is_read ? 'bg-[#F4F4F9]' : 'bg-white'}`}
      onClick={() => !alarmData.is_read && readAlarm(alarmData.id)}
    >
      <div className="flex justify-center items-center min-w-[3.375rem] w-[3.375rem] h-[3.375rem] rounded-full bg-black">
        <YelloLogoIcon />
      </div>
      <div className="flex flex-col gap-[0.25rem]">
        <h5 className="text-sm font-bold text-[#252B36]">{alarmData.title}</h5>
        <p className="body-3 text-[#252B36]">{alarmData.description}</p>
        <p className="body-2 text-[#68707F]">{alarmData.created_at}</p>
      </div>
    </article>
  );
};

export default AlarmCard;
