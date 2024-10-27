import { EtcLanguageData } from '@/types/manageResume/manageResume';
import { Dispatch, SetStateAction } from 'react';

type EtcLanguageCardProps = {
  language: EtcLanguageData;
  isSelected: boolean;
  setSelectedLanguage?: Dispatch<SetStateAction<EtcLanguageData>>;
};

const EtcLanguageCard = ({
  language,
  isSelected,
  setSelectedLanguage,
}: EtcLanguageCardProps) => {
  return (
    <div
      className={`border-[0.5px] ${isSelected && 'bg-[#F4F4F9]'} border-[#DCDCDC] rounded-[1.125rem] flex items-center gap-4 p-4 cursor-pointer`}
      onClick={() => setSelectedLanguage && setSelectedLanguage(language)}
    >
      <div className="w-9 h-9 rounded-full overflow-hidden">
        <img
          src={language.img_url}
          alt="flag"
          className="w-full h-full object-cover"
        />
      </div>
      <div>{language.language}</div>
    </div>
  );
};

export default EtcLanguageCard;
