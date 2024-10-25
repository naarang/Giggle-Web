import { APPLICATION_STEP } from '@/constants/application';
import { ApplicationStepType } from '@/types/application/applicationItem';

type ApplicationDetailStepEtcProps = {
  result: ApplicationStepType;
};

const ApplicationDetailStepEtc = ({
  result,
}: ApplicationDetailStepEtcProps) => {
  return (
    <>
      <section className="w-full px-[1.5rem] pt-[0.75rem] pb-[3.125rem] text-center">
        <p className="button-2 text-[#FF6F61]">
          {result == APPLICATION_STEP.PENDING
            ? "I'm on standby for more than two weeks"
            : 'Your resume has been rejected'}
        </p>
      </section>
    </>
  );
};

export default ApplicationDetailStepEtc;
