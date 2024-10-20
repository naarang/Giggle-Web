import SearchIcon from '@/assets/icons/search_icon.svg';
import MoreInfoIcon from '@/assets/icons/moreInfo_icon.svg';
import { useState } from 'react';

/**
 *
 * Action Button, Edit Mode 사용하지 않지만 확장성을 위해
 * 'type' props 를 추가하였습니다.
 *
 */

type SubHeaderType = {
  type: string;
  placeHolder: string;
};

const SubHeader = ({ type, placeHolder }: SubHeaderType) => {
  const [inputField, setInputField] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField(e.target.value);
  };

  const NormalType = () => {
    return (
      <div>
        <input
          type="text"
          placeholder={placeHolder}
          value={inputField}
          onChange={handleInputChange}
        />
        <div>
          {/* <SearchIcon />
          <MoreInfoIcon /> */}
        </div>
        <div>{inputField}</div>
      </div>
    );
  };

  return (
    <>{type === 'normal' ? <NormalType /> : <div>type을 확인해주세요.</div>}</>
  );
};

export default SubHeader;
