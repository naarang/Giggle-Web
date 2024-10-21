import FindJourney from '@/components/Signup/FindJourney';
import React, { useState } from 'react';
import Stroke from '@/assets/icons/SignupStroke.svg?react';
import { UserType } from '@/constants/user';

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currentRole, setCurrentRole] = useState<UserType | null>(null);

  const handleSignUpClick = () => {
    setCurrentStep(currentStep + 1);
    console.log(currentRole);
  };

  const handleRoleSelect = (role: UserType) => {
    setCurrentRole(role);
  };

  return (
    <div className="flex flex-col w-[100vw] h-[100vh]">
      <div className="flex justify-center items-center gap-3 bg-[#FEF387] pt-6 pr-8 pb-[3.125rem] pl-8">
        <Stroke stroke={currentStep === 1 ? '#1E1926' : '#FFF'} />
        <Stroke stroke={currentStep === 2 ? '#1E1926' : '#FFF'} />
        <Stroke stroke={currentStep === 3 ? '#1E1926' : '#FFF'} />
        <Stroke stroke={currentStep === 4 ? '#1E1926' : '#FFF'} />
      </div>
      <div className="grow px-6 bg-[#FEF387]">
        {currentStep === 1 && (
          <FindJourney
            onSignUpClick={handleSignUpClick}
            onRoleSelect={handleRoleSelect}
          />
        )}

        {currentRole && <p>현재 선택된 역할: {currentRole}</p>}
      </div>
    </div>
  );
};

export default SignupPage;
