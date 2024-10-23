import { useState } from 'react';
import DownArrowIcon from '@/assets/icons/PostSearch/DownArrowIcon.svg?react';

type DropdownProps = {
  options: string[];
  value: string | undefined;
  onSelect: (option: string) => void;
};

// DropdownModal 컴포넌트: 드롭다운 옵션을 표시하는 모달
const DropdownModal = ({ options, value, onSelect }: DropdownProps) => {
  return (
    <div className="w-min absolute top-[1.7rem] right-0 shadow rounded-2xl bg-white border border-[#dcdcdc] flex flex-row items-start justify-start p-2 text-left text-sm text-[#656565]">
      <div className="flex-1 flex flex-col items-start justify-start gap-[5px]">
        {options.map((option, index) => (
          <div
            key={index}
            className={`px-2 py-2 ${value == option && 'bg-[#f4f4f9] text-[#1e1926]'} rounded-lg  caption-1-sb`}
            onClick={() => onSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

const PostSearchSortDropdown = ({
  options,
  value,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSelectOption = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-[0.25rem] py-[0.25rem] px-[0.5rem] rounded-[0.25rem] border-[0.031rem] border-[#1E1926] text-[#1E1926] caption-1-sb"
      >
        {value}
        <div
          className={`transition-transform duration-300 ${
            isOpen && 'rotate-180'
          }`}
        >
          <DownArrowIcon />
        </div>
      </button>
      {isOpen && (
        <DropdownModal
          value={value}
          options={options}
          onSelect={onSelectOption}
        />
      )}
    </div>
  );
};
export default PostSearchSortDropdown;
