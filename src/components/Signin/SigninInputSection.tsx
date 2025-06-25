import { useEffect, useState } from 'react';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '@/utils/signin';
import { useGetEmailValidation, useSignIn } from '@/hooks/api/useAuth';
import { useUserInfoforSigninStore } from '@/store/signup';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { signInputTranclation } from '@/constants/translation';
import useDebounce from '@/hooks/useDebounce';
import { InputType } from '@/types/common/input';

const SigninInputSection = () => {
  const navigate = useNavigate();

  // ===== state =====
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const debouncedEmail = useDebounce(emailValue);

  const { mutate: signIn } = useSignIn();
  const { data: ValidationResponse } = useGetEmailValidation(debouncedEmail);
  const { updateId, updatePassword } = useUserInfoforSigninStore();

  // ===== handler =====
  const handleIdChange = (value: string) => {
    setEmailValue(value);
  };

  const handlePasswordChange = (value: string) => {
    setPasswordValue(value);
  };

  // ====== Sign in API =======
  const handleSubmit = async () => {
    // signIn({ serial_id: idValue, password: passwordValue });
    const formData = new FormData();
    formData.append('serial_id', emailValue);
    formData.append('password', passwordValue);

    // 전역 상태 업데이트
    updateId(emailValue);
    updatePassword(passwordValue);

    // api 훅 호출
    signIn(formData);
  };

  useEffect(() => {
    const validateEmailAsync = async () => {
      if (debouncedEmail === '') {
        setEmailError(null);
        setIsValid(false);
        return;
      }

      // 1. 기본 이메일 형식 검사
      const isEmailFormatValid = validateEmail(
        debouncedEmail,
        setEmailError,
        '/employer/signin',
      );

      if (!isEmailFormatValid) {
        setIsValid(false);
        return;
      }

      // 2. 이메일 존재 여부 검사 결과 처리
      if (ValidationResponse) {
        if (ValidationResponse.data.is_valid === true) {
          setEmailError(signInputTranclation.emailWrong['ko']);
          setIsValid(false);
        } else {
          setEmailError(null);
          // 이메일 형식도 맞고, 비밀번호도 있다면 버튼 활성화
          setIsValid(!!passwordValue);
        }
      }
    };

    validateEmailAsync();
  }, [debouncedEmail, passwordValue, ValidationResponse]);

  return (
    <div className="w-full px-4 flex flex-grow flex-col justify-between">
      <div className="flex flex-col gap-4">
        <InputLayout title="이메일">
          <Input
            inputType={InputType.TEXT}
            placeholder="이메일을 입력해주세요"
            value={emailValue}
            onChange={handleIdChange}
            canDelete={false}
          />
          {emailError && (
            <p className="text-[#FF6F61] text-xs p-2">{emailError}</p>
          )}
        </InputLayout>
        <InputLayout title="비밀번호">
          <Input
            inputType={InputType.PASSWORD}
            placeholder="Enter password"
            value={passwordValue}
            onChange={handlePasswordChange}
            canDelete={false}
          />
        </InputLayout>
        <div className="flex w-full justify-center">
          <button
            className="flex items-center justify-center px-2 py-1 text-text-alternative caption-12-regular bg-surface-secondary rounded"
            onClick={() => navigate('/find-password')} //TODO: 비밀번호 찾기 화면 이동
          >
            비밀번호를 모르겠어요 😓
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-6">
          <p className="text-[#7D8A95] text-sm font-normal">
            계정이 아직 없으신가요?
          </p>
          {/* 회원가입 화면 이동 */}
          <button
            className="flex items-center justify-center px-2 py-1.5 border-border-alternative border text-text-normal caption-12-regular rounded"
            onClick={() => navigate('/signup')}
          >
            회원가입 하러가기
          </button>
        </div>
      </div>
      <div className="w-full bg-gradient-to-b from-white/80 to-white flex flex-row items-start justify-start pb-[3.125rem] pt-3 box-border text-center button-16-semibold text-[#1e1926] z-10">
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex flex-col items-center gap-6">
            <Button
              type={isValid ? Button.Type.PRIMARY : Button.Type.DISABLED}
              size={Button.Size.LG}
              isFullWidth={true}
              title="로그인"
              onClick={isValid ? handleSubmit : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninInputSection;
