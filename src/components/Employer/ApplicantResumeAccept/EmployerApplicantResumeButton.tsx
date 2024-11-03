import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';
// import { usePatchResumeAccepted } from '@/hooks/api/useApplication';

const EmployerApplicantResumeButton = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // const { mutateAsync } = usePatchResumeAccepted();

  const onClickAcceptButton = async (isAccepted: boolean) => {
    if (isNaN(Number(id))) return;

    // data 사용 안 하고있어서 우선 제외
    {/*
      const { data } = await mutateAsync({
      id: Number(id),
      isAccepted: { is_accepted: isAccepted },
    });
      */}

    {/* 왜 data에 null 값이 들어오는데 isAccepted에는 값이 있는걸까요? */}
    if (isAccepted) navigate(`/employer/applicant/${id}`);
  };

  return (
    <>
      <section className="fixed bottom-0 left-0 w-full flex justify-center items-center gap-[0.5rem] pt-[0.75rem] pb-[2.5rem] px-[1.5rem] bg-white">
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
      </section>
    </>
  );
};

export default EmployerApplicantResumeButton;
