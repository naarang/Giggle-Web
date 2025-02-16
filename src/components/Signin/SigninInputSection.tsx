import { useEffect, useState } from 'react';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '@/utils/signin';
import { useSignIn } from '@/hooks/api/useAuth';
import { useUserInfoforSigninStore } from '@/store/signup';
import InputLayout from '../WorkExperience/InputLayout';

const SigninInputSection = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // ===== state =====
  const [emailValue, setIdValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [idError, setIdError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const { mutate: signIn } = useSignIn();
  const { updateId, updatePassword } = useUserInfoforSigninStore();

  // ===== handler =====
  const handleIdChange = (value: string) => {
    setIdValue(value);
    validateEmail(value, setIdError, pathname); // ID 입력 시 유효성 검사
  };

  const handlePasswordChange = (value: string) => {
    setPasswordValue(value);
    validatePassword(value, setPasswordError, pathname); // 비밀번호 입력 시 유효성 검사
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

  // 모든 필드의 유효성 검사 후, Sign In 버튼 활성화
  useEffect(() => {
    if (
      validateEmail(emailValue, setIdError, pathname) &&
      validatePassword(passwordValue, setPasswordError, pathname)
    ) {
      setIsValid(true);
    }
  }, [emailValue, passwordValue]);

  return (
    <div className="w-full px-6 flex flex-grow flex-col justify-between">
      <div className="flex flex-col gap-4">
        <InputLayout isEssential title="이메일">
          <Input
            inputType="TEXT"
            placeholder="이메일을 입력해주세요"
            value={emailValue}
            onChange={handleIdChange}
            canDelete={false}
          />
          {idError && <p className="text-[#FF6F61] text-xs p-2">{idError}</p>}
        </InputLayout>
        <InputLayout isEssential title="비밀번호">
          <Input
            inputType="PASSWORD"
            placeholder="Enter password"
            value={passwordValue}
            onChange={handlePasswordChange}
            canDelete={false}
          />
          {passwordError && (
            <p className="text-[#FF6F61] text-xs p-2">{passwordError}</p>
          )}
        </InputLayout>
        <div className="flex w-full justify-center">
          <button
            className="flex items-center justify-center px-2 py-1 text-text-alternative body-3 bg-surface-secondary rounded"
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
            className="flex items-center justify-center px-2 py-1.5 border-border-alternative border text-text-normal caption-1 rounded"
            onClick={() => navigate('/signup')}
          >
            회원가입 하러가기
          </button>
        </div>
      </div>
      <div className="w-full bg-gradient-to-b from-white/80 to-white flex flex-row items-start justify-start px-6 pb-[3.125rem] pt-3 box-border text-center button-1 text-[#1e1926] z-10">
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex flex-col items-center gap-6">
            <Button
              type="large"
              bgColor={isValid ? 'bg-[#000]' : 'bg-[#F4F4F9]'}
              fontColor={isValid ? 'text-[#FEF387]' : 'text-[#BDBDBD]'}
              isBorder={false}
              title="Sign In"
              onClick={isValid ? handleSubmit : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninInputSection;
