import { useNavigate } from 'react-router-dom';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import Button from '@/components/Common/Button';
import Dropdown from '@/components/Common/Dropdown';
import { languageList } from '@/constants/information';
import { useState } from 'react';

const LanguageSetting = () => {
  const [language, setLanguage] = useState<string>('English');
  const navigate = useNavigate();

  const handleBackButton = () => {
    if (window.history.length > 1) {
      // 직전 히스토리가 있으면 뒤로 가기
      navigate(-1);
    } else {
      // 직전 히스토리가 없으면 홈으로 이동
      navigate('/');
    }
  };

  const handleSaveButton = () => {};

  return (
    <div className="w-full h-[100vh] flex flex-col">
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButton}
        hasMenuButton={false}
        title="Language"
      />
      <div className="grow flex px-6 items-center justify-center">
        <Dropdown
          title="Language"
          value={language}
          placeholder="Select Visa Status"
          options={languageList}
          setValue={(value: string) => setLanguage(value)}
        />
      </div>
      <div className="pt-3 pb-[3.125rem] px-6 w-full flex justify-between items-center">
        <Button
          type="large"
          bgColor="bg-[#FEF387]"
          fontColor="text-[##1E1926]"
          title="Save"
          isBorder={false}
          onClick={handleSaveButton}
        />
      </div>
    </div>
  );
};

export default LanguageSetting;
