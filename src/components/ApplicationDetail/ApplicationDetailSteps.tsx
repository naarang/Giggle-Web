import CheckStepIcon from '@/assets/icons/ApplicationDetail/CheckStepIcon.svg?react';
import CurrentStepIcon from '@/assets/icons/ApplicationDetail/CurrentStepIcon.svg?react';
import UncheckStepIcon from '@/assets/icons/ApplicationDetail/UncheckStepIcon.svg?react';
import ApplicationDetailStepBarLayout from '@/components/ApplicationDetail/ApplicationDetailStepBarLayout';
import {
  APPLICATION_STEP_EXPLAIN_DATA,
  KO_APPLICATION_STEP_EXPLAIN_DATA,
} from '@/constants/application';

type ApplicationDetailStepsProps = {
  step: number;
  isKorean?: boolean;
};

const ApplicationDetailSteps = ({
  step,
  isKorean,
}: ApplicationDetailStepsProps) => {
  const stepIconStyler = (currentStep: number) => {
    if (step > currentStep) {
      return <CheckStepIcon />;
    } else if (step === currentStep) {
      return <CurrentStepIcon />;
    } else {
      return <UncheckStepIcon />;
    }
  };

  return (
    <section>
      <h3 className="pb-[1.5rem] head-3 text-black">Application Steps</h3>
      {isKorean
        ? KO_APPLICATION_STEP_EXPLAIN_DATA.map((data) => (
            <ApplicationDetailStepBarLayout
              key={data.step}
              stepIcon={stepIconStyler(data.step)}
              step={step}
              currentStep={data.step}
              title={data.title}
              explain={data.explain}
              isLastStep={data.step === 6}
            />
          ))
        : APPLICATION_STEP_EXPLAIN_DATA.map((data) => (
            <ApplicationDetailStepBarLayout
              key={data.step}
              stepIcon={stepIconStyler(data.step)}
              step={step}
              currentStep={data.step}
              title={data.title}
              explain={data.explain}
              isLastStep={data.step === 6}
            />
          ))}
    </section>
  );
};

export default ApplicationDetailSteps;
