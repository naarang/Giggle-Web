import StepIndicator from '@/components/Information/StepIndicator';
import { useState } from 'react';

const InformationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="m-auto max-w-[500px] h-screen flex flex-col items-center justify-start border border-black">
      <div className="w-full flex flex-row items-center justify-between">
        <div className="relative w-full flex items-center justify-center text-[1.75rem] tracking-[-0.01em] leading-9 font-semibold font-[Pretendard] text-[#1e1926] text-left" onClick={() => setCurrentStep(currentStep + 1)}>
          Information
        </div>
        <StepIndicator currentStep={currentStep} />
      </div>
    </div>
  );
};

export default InformationPage;
