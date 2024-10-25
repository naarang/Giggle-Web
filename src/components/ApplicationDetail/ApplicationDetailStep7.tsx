import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { ApplicationStepType } from '@/types/application/applicationItem';
import { APPLICATION_STEP } from '@/constants/application';

type ApplicationDetailStep7Props = {
  result: ApplicationStepType;
};

const ApplicationDetailStep7 = ({ result }: ApplicationDetailStep7Props) => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center gap-[0.75rem] w-full px-[1.5rem] pt-[0.75rem] pb-[3.125rem]">
      {result == APPLICATION_STEP.APPLICATION_SUCCESS ? (
        <p className="button-2 text-[#7872ED]">
          This application is successed.
        </p>
      ) : (
        <p className="button-2 text-[#FF6F61]">This application is rejected.</p>
      )}

      <Button
        type={buttonTypeKeys.APPLY}
        bgColor=""
        fontColor="text-[#F4F4F9]"
        isBorder={false}
        title="Check the application documents"
        onClick={() => navigate('/application-documents')}
      />
    </section>
  );
};

export default ApplicationDetailStep7;
