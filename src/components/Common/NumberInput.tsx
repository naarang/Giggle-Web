import { useEffect, useState } from 'react';
import CloseIcon from '@/assets/icons/CloseIcon.svg?react';

const INPUT_STATUS = {
  DISABLED: 'DISABLED',
  TYPING: 'TYPING',
  INVALID: 'INVALID',
} as const;

type InputStatus = (typeof INPUT_STATUS)[keyof typeof INPUT_STATUS];

// InputProps 타입 정의: Input 컴포넌트의 props 타입을 지정합니다.
type NumberInputProps = {
  maxLength?: number; // 소수점 자릿수
  placeholder: string; // 플레이스홀더 텍스트
  value: string | undefined; // 입력 필드의 현재 값
  onChange: (value: string) => void; // 입력값 변경 시 호출될 함수
  canDelete: boolean; // 삭제 버튼 표시 여부
  clearInvalid?: () => void; // 토글 시 invalid 상태를 해제할 함수 (선택적)
  isInvalid?: boolean; // 유효하지 않은 입력 상태 여부 (선택적)
  onDelete?: () => void; // 삭제 버튼 클릭 시 호출될 함수 (선택적)
};

// inputStyler 함수: 입력 필드의 상태에 따른 스타일을 반환합니다.
const inputStyler = (status: InputStatus) => {
  switch (status) {
    case INPUT_STATUS.DISABLED:
      return 'shadow-sm border-[#eae9f6] [--input-color:#bdbdbd]';
    case INPUT_STATUS.TYPING:
      return 'shadow-sm border-black text-black';
    case INPUT_STATUS.INVALID:
      return 'shadow-sm border-[#FF6F61] text-[#FF6F61] [--input-color:#FF6F61]';
  }
};

// number 타입의 input 컴포넌트
const NumberInput = ({
  maxLength,
  placeholder,
  onChange,
  canDelete,
  onDelete,
  clearInvalid,
  isInvalid,
  value,
}: NumberInputProps) => {
  // 현재 입력 필드의 상태를 관리합니다.
  const [currentStatus, setCurrentStatus] = useState<InputStatus>(
    isInvalid ? INPUT_STATUS.INVALID : INPUT_STATUS.DISABLED,
  );

  // isInvalid prop이 변경될 때 상태를 업데이트합니다.
  useEffect(() => {
    if (isInvalid) setCurrentStatus(INPUT_STATUS.INVALID);
  }, [isInvalid]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();

    // 소수점 자릿수를 제한하는 경우 (소수점 허용)
    if (maxLength) {
      // 숫자와 소수점만 허용하는 정규식
      if (/^-?\d*\.?\d*$/.test(inputValue)) {
        if (clearInvalid) clearInvalid();
        const parsedValue = parseFloat(inputValue);

        // 소수점 이하 자릿수 제한 (maxLength 기준)
        const formattedValue = Number(parsedValue.toFixed(maxLength));
        onChange(String(formattedValue));
      }
    }
    // 정수만 허용하는 경우
    else {
      // 숫자만 허용하는 정규식
      if (/^-?\d*$/.test(inputValue)) {
        if (clearInvalid) clearInvalid();
        onChange(inputValue);
      }
    }
  };

  const handleFocus = (type: string) => {
    if (clearInvalid) clearInvalid();
    if (type === 'click') {
      setCurrentStatus(INPUT_STATUS.TYPING);
      return;
    }
    setCurrentStatus(INPUT_STATUS.DISABLED);
  };

  return (
    <div
      className={`w-full flex gap-2 items-center justify-between text-left body-2 border rounded-xl ${inputStyler(currentStatus)} bg-white py-[10px] pl-4 pr-[14px]`}
    >
      <input
        placeholder={placeholder}
        value={value}
        className={'w-full outline-none placeholder:text-[var(--input-color)]'}
        onClick={() => handleFocus('click')}
        onBlur={() => handleFocus('blur')}
        onChange={handleInputChange}
        type="text" // type="text"로 설정하여 유연하게 입력을 처리
        inputMode="decimal" // 모바일 환경에서 숫자 키패드 표시
      />

      {/* 입력값 삭제 가능한 경우 삭제 아이콘을 표시합니다. */}
      {canDelete && <CloseIcon onClick={onDelete} />}
    </div>
  );
};

export default NumberInput;
