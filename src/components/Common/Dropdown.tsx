import { Dispatch, SetStateAction, useState } from 'react';
import ArrowIcon from '@/assets/icons/ArrowUp.tsx';
import DatePicker from './DatePicker';

type DropDownProps = {
  title?: string;
  value: string;
  placeholder: string;
  options: Array<string>;
  isCalendar?: boolean;
  setValue: Dispatch<SetStateAction<string>>;
};

const DropdownModal = ({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string;
  onSelect: (option: string) => void;
}) => {
  return (
    <div className="w-full relative shadow rounded-2xl bg-white border border-[#dcdcdc] flex flex-row items-start justify-start p-2 text-left text-sm text-[#656565] font-['Pretendard']">
      <div className="flex-1 flex flex-col items-start justify-start gap-[5px]">
        {options.map((option) => (
          <div
            className={`self-stretch overflow-hidden ${value == option && 'bg-[#f4f4f9] text-[#1e1926]'} rounded-lg flex flex-row items-center justify-start p-2.5`}
            onClick={() => onSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

const Dropdown = ({
  title,
  value,
  placeholder,
  options,
  isCalendar,
  setValue,
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (option: string) => {
    setValue(option);
    setIsOpen(false);
  };
  return (
    <div className="w-full flex flex-col">
      {/* dropdown 제목 */}
      {title && (
        <div className="w-full relative flex flex-row items-center justify-start px-1 py-1.5 box-border text-left text-xs text-[#222] font-[Pretendard]">
          <div className="flex-1 overflow-hidden flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-row items-center justify-start">
              <div className="relative leading-4">{title}</div>
            </div>
          </div>
        </div>
      )}
      {/* dropdown input */}
      <div className="w-full flex flex-col gap-2">
        <div className="w-full relative shadow rounded-lg bg-white border border-[#eae9f6] box-border h-11 flex flex-row items-center justify-center px-4 py-2.5 pl-4 text-left text-sm text-[#656565] font-[Pretendard]">
          <div className="flex-1 h-5 flex flex-row items-center justify-between">
            <input
              className="w-full relative leading-5 outline-none bg-white"
              value={value}
              placeholder={placeholder}
              disabled
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-fu transition-colors"
            >
              <div
                className={`flex items-center justify-center w-6 h-6 transition-transform duration-300 ${
                  isOpen ? '' : 'rotate-180'
                }`}
              >
                <ArrowIcon isMarked={value !== ''} />
              </div>
            </button>
          </div>
        </div>
        {/* dropdown 선택지 모달 */}
        {isOpen ? (
          isCalendar ? (
            <DatePicker setSelectedDate={handleSelect} />
          ) : (
            <DropdownModal
              value={value}
              options={options}
              onSelect={handleSelect}
            />
          )
        ) : null}
      </div>
    </div>
  );
};

export default Dropdown;
