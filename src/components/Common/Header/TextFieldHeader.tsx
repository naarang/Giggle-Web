import BackButtonIcon from '@/assets/icons/BackButtonIcon.svg?react';
import SearchIcon from '@/assets/icons/SearchIcon.svg?react';
import FilterIcon from '@/assets/icons/FilterIcon.svg?react';
import CircleDeleteIcon from '@/assets/icons/CircleDeleteIcon.svg?react';
import { useState } from 'react';

type HeaderProps = {
  onClickBackButton: () => void;
  onClickSearchButton: (value: string) => void;
  onClickFilterButton?: () => void;
  placeholder: string;
};

const TextFieldHeader = ({
  onClickBackButton,
  onClickSearchButton,
  onClickFilterButton,
  placeholder,
}: HeaderProps) => {
  const [value, setValue] = useState<string>('');

  const onClickDeleteButton = () => {
    setValue('');
  };

  return (
    <section className="w-full h-[3.5rem] px-[0.5rem] flex justify-between items-center bg-white border-b border-solid border-[#1E1926]">
      <button
        className="p-[0.5rem] rounded-[0.75rem] border border-solid border-[#ECECEC]"
        onClick={onClickBackButton}
      >
        <BackButtonIcon />
      </button>
      <div className="flex-1 flex items-center">
        <input
          className="flex-1 p-[0.5rem] body-3 text-[#1E1926]"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
        {value && (
          <button onClick={onClickDeleteButton}>
            <CircleDeleteIcon />
          </button>
        )}
      </div>
      <div className="flex items-center">
        {onClickFilterButton && (
          <button className="px-[0.5rem]" onClick={onClickFilterButton}>
            <FilterIcon />
          </button>
        )}
        <button
          className="px-[0.5rem]"
          onClick={() => onClickSearchButton(value)}
        >
          <SearchIcon />
        </button>
      </div>
    </section>
  );
};

export default TextFieldHeader;
