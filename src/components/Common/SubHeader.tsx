import SearchIcon from '@/assets/icons/SubHeaderSearchIcon.svg?react';
import MoreInfoIcon from '@/assets/icons/MoreInfoIcon.svg?react';
import {
  subHeaderStatusKeys,
  SubHeaderStatusUnion,
} from '@/constants/components';

type SubHeaderProps = {
  status: SubHeaderStatusUnion;
  title?: string;
  body?: string;
  placeHolder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
  onClickMenu?: () => void;
};

const SubHeader = ({
  status,
  title,
  body,
  placeHolder,
  value = '',
  onChange,
  onSearch,
  onClickMenu,
}: SubHeaderProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const SearchHeader = () => {
    return (
      <div className="h-fit w-[90%]">
        <div className="flex justify-between items-center pt-2.5 pr-3 pb-2 pl-5">
          <div className="h-9 w-full flex items-end">
            <input
              type="text"
              placeholder={placeHolder}
              value={value}
              onChange={handleInputChange}
              className="w-[90%] outline-none font-semibold text-base"
            />
          </div>
          <div className="flex justify-center items-center gap-[0.125rem]">
            <button
              onClick={onSearch}
              className="flex justify-center items-center w-9 h-9"
            >
              <SearchIcon />
            </button>
            <button
              onClick={onClickMenu}
              className="flex justify-center items-center w-9 h-9"
            >
              <MoreInfoIcon />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const NormalHeader = () => {
    return (
      <div className="h-fit w-[90%]">
        <div className="flex justify-start pt-2.5 pr-3 pb-2 pl-5">
          <div className="h-9 flex items-end font-semibold text-base">
            {title}
          </div>
        </div>
      </div>
    );
  };

  const InfoHeader = () => (
    <div className="w-full px-8 pt-6 pb-7 rounded-b-lg shadow-sm">
      <h1 className="w-[70%] text-[1.25rem] font-semibold">{title}</h1>
      <p className="w-[70%] text-[0.625rem] font-normal">{body}</p>
    </div>
  );

  return (
    <>
      {status === subHeaderStatusKeys.SEARCH && <SearchHeader />}
      {status === subHeaderStatusKeys.STATIC && <NormalHeader />}
      {status === subHeaderStatusKeys.DETAIL && <InfoHeader />}
    </>
  );
};

export default SubHeader;
