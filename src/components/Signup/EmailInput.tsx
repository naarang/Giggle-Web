import { useEffect, useState } from 'react';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import SigninSocialButtons from '@/components/Signin/SigninSocialButtons';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateEmail } from '@/utils/signin';
import { signInputTranclation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';

type EmailInputProps = {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
};

const EmailInput = ({ email, onEmailChange, onSubmit }: EmailInputProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  // ===== handler =====
  const handleEmailChange = async (value: string) => {
    onEmailChange(value);

    // 이메일 형식 유효성 검사
    if (!validateEmail(value, setEmailError, pathname)) {
      setIsValid(false); // 유효성 검사 실패 시 버튼 비활성화
      return;
    }

    // 이메일 중복 검사 API - 유효성 검사
    /*
    try {
      const response = await fetch(
        `/api/v1/auth/validations/email?email=${value}`,
      );
      const data = await response.json();
      if (data.is_valid) {
        setEmailError(null); // 중복되지 않은 경우 오류 초기화
        setIsValid(true); // 이메일이 중복되지 않으면 버튼 활성화
      } else {
        setEmailError(
          signInputTranclation.emailAvailability[isEmployer(pathname)],
        ); // 중복된 경우 오류 메시지 설정
        setIsValid(false); // 중복된 경우 버튼 비활성화
      }
    } catch (error) {
      console.error('이메일 중복 확인 오류:', error);
      setIsValid(false); // 오류 발생 시 버튼 비활성화
    }
      */
  };

  const handleSignupClick = () => {
    if (!isValid) return;
    onSubmit();
  };

  // 이메일과 유효성 검사 상태에 따라 버튼 비활성화 상태를 관리
  useEffect(() => {
    setIsValid(email !== '' && !emailError); // 이메일 값이 있고 오류가 없으면 유효
  }, [email, emailError]);

  return (
    <>
      <div className="title-1 text-center py-6">
        {signInputTranclation.signup[isEmployer(pathname)]}
      </div>
      <div className="w-[20.5rem] flex flex-col py-6">
        <div>
          <p className="py-2 px-1 text-sm font-normal text-[#171719]">
            {signInputTranclation.email[isEmployer(pathname)]}
          </p>
          <Input
            inputType="TEXT"
            placeholder={signInputTranclation.enterEmail[isEmployer(pathname)]}
            value={email}
            onChange={handleEmailChange}
            canDelete={false}
            isInvalid={!!emailError}
          />
          {emailError && (
            <p className="text-[#FF6F61] text-xs p-2">{emailError}</p>
          )}
        </div>
      </div>
      <div className="py-6 flex flex-col items-center gap-2 absolute bottom-[16%]">
        <Button
          type="large"
          bgColor={isValid ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
          fontColor={isValid ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
          isBorder={false}
          title={signInputTranclation.continue[isEmployer(pathname)]}
          onClick={isValid ? handleSignupClick : undefined}
        />
        <div className="flex items-center justify-center gap-2 pb-2">
          <p className="text-[#7D8A95] text-sm font-normal">
            {signInputTranclation.haveAccount[isEmployer(pathname)]}
          </p>
          {/* 로그인 화면 이동 */}
          <button
            className="text-[#1E1926] text-sm font-semibold"
            onClick={() => navigate('/signin')}
          >
            {signInputTranclation.signin[isEmployer(pathname)]}
          </button>
        </div>
        <SigninSocialButtons />
      </div>
    </>
  );
};

export default EmailInput;
