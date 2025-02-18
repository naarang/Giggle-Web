import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatchResumeAccepted } from '@/hooks/api/useApplication';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';

const EmployerApplicantResumeButton = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutateAsync } = usePatchResumeAccepted();

  const onClickAcceptButton = async (isAccepted: boolean) => {
    if (isNaN(Number(id))) return;

    // data 사용 안 하고있어서 우선 제외
    const data = await mutateAsync({
      id: Number(id),
      isAccepted: { is_accepted: isAccepted },
    });

    if (data?.success) navigate(`/employer/applicant/${id}`);
  };

  return (
    <BottomButtonPanel>
      <div className="w-full flex gap-2">
        <Button
          type={buttonTypeKeys.BACK}
          bgColor={'bg-[#F4F4F9]'}
          fontColor="text-[#BDBDBD]"
          title="거절"
          isBorder={false}
          onClick={() => onClickAcceptButton(false)}
        />
        <Button
          type={buttonTypeKeys.CONTINUE}
          bgColor={'bg-[#FEF387]'}
          fontColor="text-[#1E1926]"
          title="수락"
          isBorder={false}
          onClick={() => onClickAcceptButton(true)}
        />
      </div>
    </BottomButtonPanel>
  );
};

export default EmployerApplicantResumeButton;
