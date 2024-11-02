import { useState } from 'react';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import SigninSocialButtons from '@/components/Signin/SigninSocialButtons';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateEmail } from '@/utils/signin';
import { signInputTranclation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { useGetEmailValidation } from '@/hooks/api/useAuth';

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

  const { data: ValidationResponse } = useGetEmailValidation(email);

  // ===== handler =====
  const handleEmailChange = async (value: string) => {
    onEmailChange(value);

    // 이메일 형식 유효성 검사
    if (!validateEmail(value, setEmailError, pathname)) {
      setIsValid(false); // 유효성 검사 실패 시 버튼 비활성화
      return;
    }

    // 이메일 중복 검사 API 호출 결과 처리
    if (ValidationResponse && ValidationResponse.data.is_valid) {
      setEmailError(null); // email 중복 오류 메시지 초기화
      setIsValid(true); // 중복 검사 통과 시 버튼 활성화
    } else {
      setEmailError(signInputTranclation.invalidEmail[isEmployer(pathname)]); // email 중복 오류 메시지
      setIsValid(false); // 중복 검사 실패 시 버튼 비활성화
    }
  };

  const handleSignupClick = () => {
    if (!isValid) return;
    onSubmit();
  };

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
            isInvalid={!isValid}
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
            className="text-[#7872ED] text-sm font-semibold"
            onClick={() => navigate('/signin')}
          >
            {signInputTranclation.signin[isEmployer(pathname)]}
          </button>
        </div>
        {/* 소셜은 잠깐 제외 */}
        {/* 
        <SigninSocialButtons />
        */}
      </div>
    </>
  );
};

export default EmailInput;
