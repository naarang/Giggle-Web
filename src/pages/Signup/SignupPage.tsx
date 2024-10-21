import React, { useState } from 'react';
import FindJourney from '@/components/Signup/FindJourney';
import Stroke from '@/assets/icons/SignupStroke.svg?react';
import SignupInput from '@/components/Signup/SignupInput';
import { UserType } from '@/constants/user';
import EmailInput from '@/components/Signup/EmailInput';
import SignupVerification from '@/components/Signup/SignupVerification';

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
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

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  // ====== Sign up API =======
  // API - 2.4 임시 회원가입 API 호출
  const handleSignUp = async () => {
    // 임의 로직
    handleSignUpClick();

    /*
    try {
      const response = await fetch('/api/v1/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          password: password,
          email: email,
          account_type: accountType, // accountType 추가
        }),
      });

      if (response.ok) {
        // 이메일 인증 요청 성공 시 인증 단계로 이동
        handleSignUpClick();
      } else {
        console.error('이메일 인증 실패:', response.statusText);
      }
    } catch (error) {
      console.error('이메일 인증 중 오류 발생:', error);
    }
      */
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
        {currentStep === 3 && (
          <EmailInput
            onSignUpClick={handleSignUpClick}
            email={email}
            onEmailChange={handleEmailChange}
            onSubmit={handleSignUp} // 이메일을 입력하고 제출하면 회원가입 API 호출
          />
        )}
        {currentStep === 4 && <SignupVerification />}
      </div>
    </div>
  );
};

export default SignupPage;
