import { Language } from '@/types/api/users';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { useState } from 'react';
import Dropdown from '@/components/Common/Dropdown';
import { languageList } from '@/constants/information';
import Button from '@/components/Common/Button';

type LanguageStepProps = {
  onNext: (language: Language) => void;
};

const LanguageStep = ({ onNext }: LanguageStepProps) => {
  const [language, setLanguage] = useState('English');
  return (
    <div className="w-full mx-auto">
      <div className="w-full flex flex-col gap-[1.125rem]">
        {/* 언어 선택 작성 */}
        <div className="w-full">
          <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            Language
          </div>
          <Dropdown
            value={language}
            placeholder="Select Language"
            options={languageList}
            setValue={(value: string) => setLanguage(value)}
          />
        </div>
      </div>
      {/* 다음 step 이동 버튼 포함한 Bottom Panel */}
      <BottomButtonPanel>
        <Button
          type="large"
          bgColor={language === '' ? 'bg-[#F4F4F9]' : 'bg-[#fef387]'}
          fontColor={language === '' ? '' : 'text-[#222]'}
          isBorder={false}
          title="Next"
          onClick={
            language === ''
              ? undefined
              : () => onNext(language.toUpperCase() as Language)
          }
        />
      </BottomButtonPanel>
    </div>
  );
};

export default LanguageStep;
