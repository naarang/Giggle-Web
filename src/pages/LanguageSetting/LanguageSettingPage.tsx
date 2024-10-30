import { useNavigate } from 'react-router-dom';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import Button from '@/components/Common/Button';
import Dropdown from '@/components/Common/Dropdown';
import { languageList } from '@/constants/information';
import { useState } from 'react';
import useNavigateBack from '@/hooks/useNavigateBack';
import { usePatchUserLanguage } from '@/hooks/api/useSetting';
import { UserLanguageRequest } from '@/types/api/mypage';

const LanguageSettingPage = () => {
  const [language, setLanguage] = useState<string>('Select Language');

  const { mutate } = usePatchUserLanguage();

  const handleBackButtonClick = useNavigateBack();

  const handleSaveButton = () => {
    // API - 3.8 (유학생) 앱 내 언어 수정
    mutate({ language: language.toUpperCase() } as UserLanguageRequest);
  };

  return (
    <div className="w-full h-[100vh] flex flex-col">
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
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

export default LanguageSettingPage;
