import { AlarmItemType } from '@/types/api/alarm';
import YelloLogoIcon from '@/assets/icons/YellowLogoIcon.svg?react';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import {
  useCurrentApplicantIdStore,
  useCurrentPostIdEmployeeStore,
} from '@/store/url';
import { useNavigate } from 'react-router-dom';

type AlarmCardProps = {
  alarmData: AlarmItemType;
  readAlarm: (id: number) => Promise<void>;
};

const AlarmCard = ({ alarmData, readAlarm }: AlarmCardProps) => {
  const navigate = useNavigate();

  const { updateCurrentPostId } = useCurrentPostIdEmployeeStore();
  const { updateCurrentApplicantId } = useCurrentApplicantIdStore();
  const { account_type } = useUserStore();

  const goToDetailPage = async (
    isRead: boolean,
    id: number,
    postId: number,
  ) => {
    if (!isRead) await readAlarm(id);

    if (account_type === UserType.OWNER) {
      updateCurrentApplicantId(postId);
      navigate(`/employer/applicant/${postId}`);
    } else if (account_type === UserType.USER) {
      updateCurrentPostId(postId);
      navigate(`/application/${postId}`);
    }
  };

  return (
    <article
      className={`flex items-center gap-[0.5rem] w-full px-[1rem] py-[0.5rem] rounded-[0.5rem] shadow-alarmShadow ${alarmData.is_read ? 'bg-[#F4F4F9]' : 'bg-white'}`}
      onClick={() =>
        goToDetailPage(
          alarmData.is_read,
          alarmData.id,
          alarmData.user_owner_job_posting_id,
        )
      }
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
