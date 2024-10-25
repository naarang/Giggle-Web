import CheckStepIcon from '@/assets/icons/ApplicationDetail/CheckStepIcon.svg?react';
import CurrentStepIcon from '@/assets/icons/ApplicationDetail/CurrentStepIcon.svg?react';
import UncheckStepIcon from '@/assets/icons/ApplicationDetail/UncheckStepIcon.svg?react';
import ApplicationDetailStepBarLayout from '@/components/ApplicationDetail/ApplicationDetailStepBarLayout';

type ApplicationDetailStepsProps = {
  step: number;
};

const ApplicationDetailSteps = ({ step }: ApplicationDetailStepsProps) => {
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
      <ApplicationDetailStepBarLayout
        stepIcon={stepIconStyler(1)}
        step={step}
        currentStep={1}
        title="Resume Verification"
        explain="The employer is currently reviewing your resume."
      />
      <ApplicationDetailStepBarLayout
        stepIcon={stepIconStyler(2)}
        step={step}
        currentStep={2}
        title="Interview Preparation"
        explain="Please check the employment contract and work conditions."
      />
      <ApplicationDetailStepBarLayout
        stepIcon={stepIconStyler(3)}
        step={step}
        currentStep={3}
        title="Document Preparation"
        explain="Please prepare the documents required for a part-time work permit."
      />
      <ApplicationDetailStepBarLayout
        stepIcon={stepIconStyler(4)}
        step={step}
        currentStep={4}
        title="Document Review by the International Student Coordinator"
        explain="Get the documents reviewed by the international student coordinator
            at your school."
      />
      <ApplicationDetailStepBarLayout
        stepIcon={stepIconStyler(5)}
        step={step}
        currentStep={5}
        title="HiKorea e-Government Applica"
        explain="Apply for a part-time work permit through HiKorea."
      />
      <ApplicationDetailStepBarLayout
        stepIcon={stepIconStyler(6)}
        step={step}
        currentStep={6}
        title="Result Registration"
        explain="Please register the results."
        isLastStep={true}
      />
    </section>
  );
};

export default ApplicationDetailSteps;
