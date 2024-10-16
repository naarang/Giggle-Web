import { useEffect, useState } from 'react';
import SearchIcon from '@/assets/icons/MagnifyGlassIcon.svg?react';
import CloseIcon from '@/assets/icons/CloseIcon.svg?react';
import VisibleIcon from '@/assets/icons/Hide.svg?react';

type InputProps = {
  inputType: 'INPUT' | 'PASSWORD' | 'SEARCH';
  placeholder: string;
  onChange: (value: string) => void;
  canDelete: boolean;
  isInvalid: boolean;
  onDelete?: () => void;
  value: string;
};

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

const Input = ({
  inputType,
  placeholder,
  onChange,
  canDelete,
  onDelete,
  isInvalid,
  value,
}: InputProps) => {
  const [currentStatus, setCurrentStatus] = useState<
    'DISABLED' | 'TYPING' | 'INVALID'
  >(isInvalid ? 'INVALID' : 'DISABLED');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setCurrentStatus(isInvalid ? 'INVALID' : 'DISABLED');
  }, [isInvalid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      className={`w-full flex gap-2 items-center justify-between text-left text-sm font-[Pretendard] border rounded-xl ${inputStyler(currentStatus)} bg-white py-[10px] pl-4 pr-[14px]`}
    >
      {inputType === 'SEARCH' && <SearchIcon />}
      <input
        placeholder={placeholder}
        value={value}
        className={'w-full outline-none placeholder:text-[var(--input-color)]'}
        onClick={() => setCurrentStatus('TYPING')}
        onBlur={() => setCurrentStatus('DISABLED')}
        onChange={handleInputChange}
        type={inputType === 'PASSWORD' ? showPassword ? 'text' : 'password' : 'text'}
      />
      {/* TODO : 추후 아이콘 추가 되면 비밀번호 가시 여부에 따라서 다른 아이콘 적용*/}
      {inputType === 'PASSWORD' && <VisibleIcon onClick={() => setShowPassword(!showPassword)}/>}
      {canDelete && <CloseIcon onClick={onDelete} />}
    </div>
  );
};

export default Input;
