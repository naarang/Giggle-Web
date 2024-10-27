import { Dispatch, SetStateAction, useState } from 'react';
import EtcLanguageCard from '@/components/Language/EtcLanguageCard';
import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import { EtcLanguageData } from '@/types/manageResume/manageResume';

type EtcLanguageSectionProps = {
  languageList: EtcLanguageData[];
  selectedLanguage: EtcLanguageData;
  setSelectedLanguage: Dispatch<SetStateAction<EtcLanguageData>>;
};

const EtcLanguageSection = ({
  languageList,
  selectedLanguage,
  setSelectedLanguage,
}: EtcLanguageSectionProps) => {
  const [search, setSearch] = useState('');

  return (
    <>
      <Input
        inputType={InputType.SEARCH}
        placeholder="Search Language"
        value={search}
        onChange={(value) => setSearch(value)}
        canDelete={false}
      />
      <div className="mt-6 flex flex-col gap-3">
        {languageList.map((language) => (
          <EtcLanguageCard
            key={language.id}
            language={language}
            setSelectedLanguage={setSelectedLanguage}
            isSelected={selectedLanguage.id === language.id}
          />
        ))}
      </div>
    </>
  );
};

export default EtcLanguageSection;
