import CheckStepIcon from '@/assets/icons/ApplicationDetail/CheckStepIcon.svg?react';
import CurrentStepIcon from '@/assets/icons/ApplicationDetail/CurrentStepIcon.svg?react';
import UncheckStepIcon from '@/assets/icons/ApplicationDetail/UncheckStepIcon.svg?react';

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
      <div className="flex gap-[1.125rem]">
        <div className="flex flex-col items-center">
          {stepIconStyler(1)}
          <div
            className={`w-[0.125rem] h-[3.5rem] ${step > 1 ? 'bg-[#1E1926]' : 'bg-[#F2F2F2]'}`}
          ></div>
        </div>
        <div>
          <h5 className={`${step > 1 ? 'head-3' : 'body-1'} text-[#464646]`}>
            Resume Verification
          </h5>
          <p className="caption-2 text-[#656565]">
            The employer is currently reviewing your resume.
          </p>
        </div>
      </div>
      <div className="flex gap-[1.125rem]">
        <div className="flex flex-col items-center">
          {stepIconStyler(2)}
          <div
            className={`w-[0.125rem] h-[3.5rem] ${step > 2 ? 'bg-[#1E1926]' : 'bg-[#F2F2F2]'}`}
          ></div>
        </div>
        <div>
          <h5 className={`${step > 2 ? 'head-3' : 'body-1'} text-[#464646]`}>
            Interview Preparation
          </h5>
          <p className="caption-2 text-[#656565]">
            Please check the employment contract and work conditions.
          </p>
        </div>
      </div>
      <div className="flex gap-[1.125rem]">
        <div className="flex flex-col items-center">
          {stepIconStyler(3)}
          <div
            className={`w-[0.125rem] h-[3.5rem] ${step > 3 ? 'bg-[#1E1926]' : 'bg-[#F2F2F2]'}`}
          ></div>
        </div>
        <div>
          <h5 className={`${step > 3 ? 'head-3' : 'body-1'} text-[#464646]`}>
            Document Preparation
          </h5>
          <p className="caption-2 text-[#656565]">
            Please prepare the documents required for a part-time work permit.
          </p>
        </div>
      </div>
      <div className="flex gap-[1.125rem]">
        <div className="flex flex-col items-center">
          {stepIconStyler(4)}
          <div
            className={`w-[0.125rem] h-[3.5rem] ${step > 4 ? 'bg-[#1E1926]' : 'bg-[#F2F2F2]'}`}
          ></div>
        </div>
        <div>
          <h5 className={`${step > 4 ? 'head-3' : 'body-1'} text-[#464646]`}>
            Document Review by the International Student Coordinator
          </h5>
          <p className="caption-2 text-[#656565]">
            Get the documents reviewed by the international student coordinator
            at your school.
          </p>
        </div>
      </div>
      <div className="flex gap-[1.125rem]">
        <div className="flex flex-col items-center">
          {stepIconStyler(5)}
          <div
            className={`w-[0.125rem] h-[3.5rem] ${step > 5 ? 'bg-[#1E1926]' : 'bg-[#F2F2F2]'}`}
          ></div>
        </div>
        <div>
          <h5 className={`${step > 5 ? 'head-3' : 'body-1'} text-[#464646]`}>
            HiKorea e-Government Applica
          </h5>
          <p className="caption-2 text-[#656565]">
            Apply for a part-time work permit through HiKorea.
          </p>
        </div>
      </div>
      <div className="flex gap-[1.125rem] pb-[2.75rem]">
        {stepIconStyler(6)}
        <div>
          <h5 className={`${step > 6 ? 'head-3' : 'body-1'} text-[#464646]`}>
            Result Registration
          </h5>
          <p className="caption-2 text-[#656565]">
            Please register the results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ApplicationDetailSteps;
