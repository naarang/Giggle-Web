import { useEffect, useState } from 'react';
import SearchIcon from '@/assets/icons/MagnifyGlassIcon.svg?react';
import CloseIcon from '@/assets/icons/CloseIcon.svg?react';
import VisibleIcon from '@/assets/icons/Hide.svg?react';

// InputProps 타입 정의: Input 컴포넌트의 props 타입을 지정합니다.
type InputProps = {
  inputType: 'INPUT' | 'PASSWORD' | 'SEARCH'; // 입력 필드의 타입
  placeholder: string; // 플레이스홀더 텍스트
  onChange: (value: string) => void; // 입력값 변경 시 호출될 함수
  canDelete: boolean; // 삭제 버튼 표시 여부
  isInvalid: boolean; // 유효하지 않은 입력 상태 여부
  onDelete?: () => void; // 삭제 버튼 클릭 시 호출될 함수 (선택적)
  value: string; // 입력 필드의 현재 값
};

// inputStyler 함수: 입력 필드의 상태에 따른 스타일을 반환합니다.
const inputStyler = (status: string) => {
  switch (status) {
    case 'DISABLED':
      return 'shadow-sm border-[#eae9f6] [--input-color:#bdbdbd]';
    case 'TYPING':
      return 'shadow-sm border-black text-black';
    case 'INVALID':
      return 'shadow-sm border-[#FF6F61] text-[#FF6F61] [--input-color:#FF6F61]';
  }
};

// Input 컴포넌트: 재사용 가능한 입력 필드를 렌더링합니다.
const Input = ({
  inputType,
  placeholder,
  onChange,
  canDelete,
  onDelete,
  isInvalid,
  value,
}: InputProps) => {
  // 현재 입력 필드의 상태를 관리합니다.
  const [currentStatus, setCurrentStatus] = useState<
    'DISABLED' | 'TYPING' | 'INVALID'
  >(isInvalid ? 'INVALID' : 'DISABLED');

  // 비밀번호 표시/숨김 상태를 관리합니다.
  const [showPassword, setShowPassword] = useState(false);

  // isInvalid prop이 변경될 때 상태를 업데이트합니다.
  useEffect(() => {
    setCurrentStatus(isInvalid ? 'INVALID' : 'DISABLED');
  }, [isInvalid]);

  // 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      className={`w-full flex gap-2 items-center justify-between text-left text-sm font-[Pretendard] border rounded-xl ${inputStyler(currentStatus)} bg-white py-[10px] pl-4 pr-[14px]`}
    >
      {/* 검색 타입일 경우 검색 아이콘을 표시합니다. */}
      {inputType === 'SEARCH' && <SearchIcon />}
      <input
        placeholder={placeholder}
        value={value}
        className={'w-full outline-none placeholder:text-[var(--input-color)]'}
        onClick={() => setCurrentStatus('TYPING')}
        onBlur={() => setCurrentStatus('DISABLED')}
        onChange={handleInputChange}
        type={
          inputType === 'PASSWORD'
            ? showPassword
              ? 'text'
              : 'password'
            : 'text'
        }
      />
      {/* 비밀번호 타입일 경우 표시/숨김 토글 아이콘을 표시합니다. */}
      {/* TODO : 추후 아이콘 추가 되면 비밀번호 가시 여부에 따라서 다른 아이콘 적용*/}
      {inputType === 'PASSWORD' && (
        <VisibleIcon onClick={() => setShowPassword(!showPassword)} />
      )}
      {/* 입력값 삭제 가능한 경우 삭제 아이콘을 표시합니다. */}
      {canDelete && <CloseIcon onClick={onDelete} />}
    </div>
  );
};

export default Input;
