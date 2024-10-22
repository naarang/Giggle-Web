import { useState } from 'react';
import Input from '../Common/Input';
import Button from '../Common/Button';
import { useNavigate } from 'react-router-dom';
import { validateId, validatePassword } from '@/utils/signin';

const SigninInputSection = () => {
  const navigate = useNavigate();

  // ===== state =====
  const [idValue, setIdValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [idError, setIdError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // ===== handler =====
  const handleIdChange = (value: string) => {
    setIdValue(value);
    validateId(value, setIdError); // ID 입력 시 유효성 검사
  };

  const handlePasswordChange = (value: string) => {
    setPasswordValue(value);
    validatePassword(value, setPasswordError); // 비밀번호 입력 시 유효성 검사
  };

  // ====== Sign in API =======
  const handleSubmit = async () => {
    const serial_id = validateId(idValue, setIdError);
    const password = validatePassword(passwordValue, setPasswordError);

    // temp code
    if (serial_id && password) {
      alert('id: ' + idValue + ' password: ' + passwordValue);
      navigate('/');
    }

    /*
    if (serial_id && password) {
      try {
        // 로그인 POST API 요청
        const response = await axios.post('/api/v1/auth/login', {
          serial_id: idValue,
          password: passwordValue,
        });

        // 로그인 성공 시 유저 타입에 따라 페이지 이동
        if (type === 'USER') {
          navigate('/');
        } else if (type === 'OWNER') {
          navigate('/owner');
        }
      } catch (error: any) {
        // 서버에서 받은 오류 처리
        if (error.response?.status === 404) {
          setIdError('존재하지 않는 ID 입니다.'); // 3-1. 존재하지 않는 ID
        } else if (error.response?.status === 401) {
          setPasswordError('비밀번호가 일치하지 않습니다.'); // 3-2. 비밀번호 불일치
        } else {
          console.error('로그인 중 오류 발생:', error);
        }
      }
    }
      */
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="w-[20.5rem] flex flex-col gap-4">
        <div>
          <p className="py-2 px-1 text-sm font-normal text-[#171719]">ID</p>
          <Input
            inputType="TEXT"
            placeholder="Enter ID"
            value={idValue}
            onChange={handleIdChange}
            canDelete={false}
            isInvalid={!!idError} // 오류가 있으면 Input 컴포넌트에 반영
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
            value={passwordValue}
            onChange={handlePasswordChange}
            canDelete={false}
            isInvalid={!!passwordError} // 오류가 있으면 Input 컴포넌트에 반영
          />
          {passwordError && (
            <p className="text-[#FF6F61] text-xs p-2">{passwordError}</p>
          )}
        </div>
        {/* TODO: 비밀번호 찾기 화면 이동 */}
        <button className="w-full text-end text-[#1E1926] text-xs font-normal">
          Forgot Password?
        </button>
      </div>
      <div className="py-6 flex flex-col items-center gap-2">
        <Button
          type="large"
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          isBorder={false}
          title="Sign In"
          onClick={handleSubmit}
        />
        <div className="flex items-center justify-center gap-2">
          <p className="text-[#7D8A95] text-sm font-normal">
            Don't have an account?
          </p>
          {/* 회원가입 화면 이동 */}
          <button
            className="text-[#1E1926] text-sm font-semibold"
            onClick={() => navigate('/signup')}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninInputSection;
