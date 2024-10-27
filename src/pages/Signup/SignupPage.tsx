import { useState } from 'react';
import FindJourney from '@/components/Signup/FindJourney';
import Stroke from '@/assets/icons/SignupStroke.svg?react';
import SignupInput from '@/components/Signup/SignupInput';
import { UserType } from '@/constants/user';
import EmailInput from '@/components/Signup/EmailInput';
import SignupVerification from '@/components/Signup/SignupVerification';
import VerificationSuccessful from '@/components/Signup/VerificationSuccessful';

const SignupPage = () => {
  // sign up 단계(총 5단계)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // sign-up Field 상태 관리
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [accountType, setCurrentType] = useState<UserType | null>(null);

  // authentication-code Field 상태 관리
  const [authenticationCode, setAuthenticationCode] = useState<string>('');

  // handler 정의
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
  const handleAuthCodeChange = (value: string) => {
    setAuthenticationCode(value);
  };

  // API 정의
  // API - 2.4 임시 회원가입 API 호출
  const handleSignUp = async () => {
    // 임의 로직 API 연동 후 삭제
    handleSignUpClick();
  };

  // API - 2.7 이메일 인증코드 검증
  const handleVerify = async () => {
    // 임의 로직 API 연동 후 삭제
    handleSignUpClick();
  };

  return (
    <div
      className={`flex flex-col w-[100vw] h-[100vh] ${currentStep == 1 ? `bg-[#FEF387]` : 'bg-white'} `}
    >
      {currentStep === 5 ? (
        <VerificationSuccessful />
      ) : (
        <div className="flex justify-center items-center gap-3 pt-6 pr-8 pb-[3.125rem] pl-8">
          <Stroke stroke={currentStep === 1 ? '#1E1926' : '#FFF'} />
          <Stroke stroke={currentStep === 2 ? '#1E1926' : '#FFF'} />
          <Stroke stroke={currentStep === 3 ? '#1E1926' : '#FFF'} />
          <Stroke stroke={currentStep === 4 ? '#1E1926' : '#FFF'} />
        </div>
      )}
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
            email={email}
            onEmailChange={handleEmailChange}
            onSubmit={handleSignUp} // 이메일을 입력하고 제출하면 임시 회원가입 API 호출
          />
        )}
        {currentStep === 4 && (
          <SignupVerification
            email={email}
            id={id}
            authenticationCode={authenticationCode}
            onAuthCodeChange={handleAuthCodeChange}
            onSubmit={handleVerify} // 인증코드 입력하고 제출하면 이메일 인증코드 검증 API 호출
          />
        )}
      </div>
    </div>
  );
};

export default SignupPage;
