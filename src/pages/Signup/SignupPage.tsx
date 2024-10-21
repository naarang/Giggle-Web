import React, { useState } from 'react';
import FindJourney from '@/components/Signup/FindJourney';
import Stroke from '@/assets/icons/SignupStroke.svg?react';
import SignupInput from '@/components/Signup/SignupInput';
import { UserType } from '@/constants/user';

const SignupPage = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [accountType, setCurrentType] = useState<UserType | null>(null);

  const handleSignUpClick = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleTypeSelect = (type: UserType) => {
    setCurrentType(type);
  };

  const handleIdChange = (value: string) => {
    setId(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  return (
    <div
      className={`flex flex-col w-[100vw] h-[100vh] ${currentStep == 1 ? `bg-[#FEF387]` : 'bg-white'} `}
    >
      <div className="flex justify-center items-center gap-3 pt-6 pr-8 pb-[3.125rem] pl-8">
        <Stroke stroke={currentStep === 1 ? '#1E1926' : '#FFF'} />
        <Stroke stroke={currentStep === 2 ? '#1E1926' : '#FFF'} />
        <Stroke stroke={currentStep === 3 ? '#1E1926' : '#FFF'} />
        <Stroke stroke={currentStep === 4 ? '#1E1926' : '#FFF'} />
      </div>
      <div className="grow px-6">
        {currentStep === 1 && (
          <FindJourney
            onSignUpClick={handleSignUpClick}
            onTypeSelect={handleTypeSelect}
            accountType={accountType}
          />
        )}
        {currentStep === 2 && (
          <SignupInput
            onSignUpClick={handleSignUpClick}
            id={id}
            password={password}
            onIdChange={handleIdChange}
            onPasswordChange={handlePasswordChange}
          />
        )}
      </div>
    </div>
  );
};

export default SignupPage;
