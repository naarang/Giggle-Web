import React, { useState, useRef, useEffect } from 'react';
import Button from '../Common/Button';
import { validateCode } from '@/utils/signin';

type SignupVerificationProps = {
  email: string;
  id: string;
  authenticationCode: string;
  onAuthCodeChange: (code: string) => void;
  onSubmit: () => void;
};

const SignupVerification = ({
  email,
  id,
  authenticationCode,
  onAuthCodeChange,
  onSubmit,
}: SignupVerificationProps) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [resendMessage, setResendMessage] = useState<string>(''); // 재전송 메시지 상태
  const [resendDisabled, setResendDisabled] = useState<boolean>(false); // 재전송 비활성화 여부
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 첫 인증코드 필드에 자동 포커스
  useEffect(() => {
    if (authenticationCode === '') {
      inputRefs.current[0]?.focus();
    }
  }, [authenticationCode]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    let newCodeArray = authenticationCode.split('');

    // 입력 코드 유효성 검사(1자리 숫자)
    if (validateCode(value)) {
      newCodeArray[index] = value;
      onAuthCodeChange(newCodeArray.join(''));

      // 다음 인증코드로 포커스를 이동
      if (index < inputRefs.current.length - 1 && value) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    // 전체 인증 코드가 입력되었는지 확인
    if (newCodeArray.join('').length === 6) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  // 백스페이스 처리 - 현재 값 삭제 후 이전 필드로 포커스 이동
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace') {
      let newCodeArray = authenticationCode.split('');

      // 현재 필드 값이 있으면 먼저 값을 지움
      if (newCodeArray[index]) {
        newCodeArray[index] = ''; // 현재 필드 값 삭제
        onAuthCodeChange(newCodeArray.join(''));
      }

      // 현재 필드가 비어있고, 이전 필드가 있으면 이전 필드 값을 지움
      if (!newCodeArray[index] && index > 0) {
        newCodeArray[index - 1] = ''; // 이전 필드 값 삭제
        onAuthCodeChange(newCodeArray.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerifyClick = () => {
    if (isValid) {
      onSubmit();
    }
  };

  // 이메일 인증코드 재전송 API 호출
  const handleResendClick = async () => {
    // 임시 코드 - API 연결 후 삭제
    onAuthCodeChange('');
    setIsValid(false);
    setResendMessage('Verification code has been resent.');
    console.log(id, email);

    // 추후 이메일 재요청 횟수 API 적용
    const try_cnt = 0;
    if (try_cnt >= 5) {
      setResendMessage(
        'You have reached the limit. Please try again in 24 hours.',
      ); // 5회 이상인 경우 메시지
      setResendDisabled(true); // 재전송 버튼 비활성화
    }

    /*
    try {
      const response = await axios.patch(
        '/api/v1/auth/validations/resend-code',
        {
          id: id,
          email: email,
        },
      );

      if (response.status === 200 && response.data.success) {
        onAuthCodeChange('');
        setIsValid(false);
        const { try_cnt } = response.data.data;

        if (try_cnt >= 5) {
          setResendMessage(
            'You have reached the limit. Please try again in 24 hours.',
          ); // 5회 이상인 경우 메시지
          setResendDisabled(true); // 재전송 버튼 비활성화
        } else {
          setResendMessage('Verification code has been resent.'); // 성공 메시지
        }
      } else {
        console.error('인증 코드 재전송 실패:', response.statusText);
      }
    } catch (error) {
      console.error('인증 코드 재전송 중 오류 발생:', error);
    }
      */
  };

  return (
    <div>
      <div className="title-1 text-center pt-6 pb-2">Verification</div>
      <div className="body-2 text-[#656565] text-center">
        Enter the code from the email
        <br />
        we sent you
      </div>
      <div className="py-[3.125rem] flex flex-col gap-8">
        <div className="flex gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="title-2 bg-[#F4F4F9] text-center flex justify-center items-center w-11 h-14 rounded-2xl"
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleInputChange(e, index)} // 값 변경 처리
              onKeyDown={(e) => handleKeyDown(e, index)} // Backspace 처리
              value={authenticationCode[index] || ''}
            />
          ))}
        </div>
        <div className="body-3 text-center text-[#7D8A95]">
          We will resend the code in 5 mins
        </div>
      </div>
      <div className="py-6 flex flex-col items-center gap-2 absolute bottom-[30%]">
        {resendMessage && (
          <div className="button-2 text-[#7872ED]">{resendMessage}</div>
        )}
        <Button
          type="large"
          bgColor={isValid ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
          fontColor={isValid ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
          isBorder={false}
          title="Verify"
          onClick={isValid ? handleVerifyClick : undefined}
        />
        {/* 5회 이내 이메일 재발송 가능 */}
        {!resendDisabled && (
          <div className="flex items-center justify-center gap-2">
            <p className="text-[#7D8A95] text-sm font-normal">
              Didn’t get a response?
            </p>
            <button
              className="text-[#695F96] text-sm font-semibold"
              onClick={handleResendClick} // 이메일 인증코드 재전송 API 호출
            >
              Resend
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupVerification;
