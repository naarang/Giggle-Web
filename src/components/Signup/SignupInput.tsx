import { useState } from 'react';
import Input from '../Common/Input';
import Button from '../Common/Button';
import { useNavigate } from 'react-router-dom';
import { validateId, validatePassword } from '@/utils/signin';
import SigninSocialButtons from '../Signin/SigninSocialButtons';

type signupInputProps = {
  id: string;
  password: string;
  onIdChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSignUpClick: () => void;
};

const SignupInput = ({
  onSignUpClick,
  id,
  password,
  onIdChange,
  onPasswordChange,
}: signupInputProps) => {
  const navigate = useNavigate();

  // // ===== state =====
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
  const [idError, setIdError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  // ===== handler =====
  const handleIdChange = async (value: string) => {
    onIdChange(value);
    // ID 중복 검사 API 호출 - 유효성 검사
    if (validateId(value, setIdError)) {
      try {
        const response = await fetch(`/api/v1/auth/validations/id?id=${value}`);
        const data = await response.json();
        if (data.is_valid) {
          setIdError(null); // 중복되지 않은 경우 오류 초기화
        } else {
          setIdError('This email already exists'); // 중복된 경우 오류 메시지 설정
        }
      } catch (error) {
        console.error('ID 중복 확인 오류:', error);
      }
    }
  };

  const handlePasswordChange = (value: string) => {
    onPasswordChange(value);
    validatePassword(value, setPasswordError); // 비밀번호 입력 시 유효성 검사
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPasswordValue(value);
    if (value !== password) {
      // 비밀번호 재입력 일치 여부 검사
      setConfirmPasswordError('Password does not match');
    } else {
      setConfirmPasswordError(null);
    }
  };

  return (
    <>
      <div className="title-1 text-center py-6">Sign Up</div>
      <div className="flex flex-col gap-2">
        <div className="w-[20.5rem] flex flex-col">
          <div>
            <p className="py-2 px-1 text-sm font-normal text-[#171719]">ID</p>
            <Input
              inputType="TEXT"
              placeholder="Enter ID"
              value={id}
              onChange={handleIdChange}
              canDelete={false}
              isInvalid={!!idError}
            />
            {idError && <p className="text-[#FF6F61] text-xs p-2">{idError}</p>}
          </div>
          <div>
            <p className="py-2 px-1 text-sm font-normal text-[#171719]">
              Password
            </p>
            <Input
              inputType="PASSWORD"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              canDelete={false}
              isInvalid={!!passwordError}
            />
            {passwordError && (
              <p className="text-[#FF6F61] text-xs p-2">{passwordError}</p>
            )}
          </div>
          <div>
            <p className="py-2 px-1 text-sm font-normal text-[#171719]">
              Confirm Password
            </p>
            <Input
              inputType="PASSWORD"
              placeholder="Confirm password"
              value={confirmPasswordValue}
              onChange={handleConfirmPasswordChange}
              canDelete={false}
              isInvalid={!!confirmPasswordError}
            />
            {confirmPasswordError && (
              <p className="text-[#FF6F61] text-xs p-2">
                {confirmPasswordError}
              </p>
            )}
          </div>
        </div>
        <div className="py-6 flex flex-col items-center gap-2">
          <Button
            type="large"
            bgColor="bg-[#FEF387]"
            fontColor="text-[#1E1926]"
            isBorder={false}
            title="Continue"
            onClick={onSignUpClick}
          />
          <div className="flex items-center justify-center gap-2">
            <p className="text-[#7D8A95] text-sm font-normal">
              Already have an account?
            </p>
            {/* 로그인 화면 이동 */}
            <button
              className="text-[#1E1926] text-sm font-semibold"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      <SigninSocialButtons />
    </>
  );
};

export default SignupInput;
