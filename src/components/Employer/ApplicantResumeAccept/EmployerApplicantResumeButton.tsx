import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';

const EmployerApplicantResumeButton = () => {
  return (
    <>
      <section className="fixed bottom-0 left-0 w-full flex justify-center items-center gap-[0.5rem] pt-[0.75rem] pb-[2.5rem] px-[1.5rem] bg-white">
        <Button
          type={buttonTypeKeys.BACK}
          bgColor={'bg-[#F4F4F9]'}
          fontColor="text-[#BDBDBD]"
          title="거절"
          isBorder={false}
        />
        <Button
          type={buttonTypeKeys.CONTINUE}
          bgColor={'bg-[#FEF387]'}
          fontColor="text-[#1E1926]"
          title="수락"
          isBorder={false}
        />
      </section>
    </>
  );
};

export default EmployerApplicantResumeButton;
