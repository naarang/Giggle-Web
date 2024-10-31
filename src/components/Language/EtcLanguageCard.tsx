import { EtcLanguageData } from '@/types/manageResume/manageResume';
import { Dispatch, SetStateAction } from 'react';

type EtcLanguageCardProps = {
  language: EtcLanguageData;
  isSelected: boolean; // 선택된 카드의 css 스타일 적용을 위함
  setSelectedLanguage?: Dispatch<SetStateAction<EtcLanguageData>>;
};

const EtcLanguageCard = ({
  language,
  isSelected,
  setSelectedLanguage,
}: EtcLanguageCardProps) => {
  return (
    // 언어 카드
    <div
      className={`border-[0.5px] ${isSelected && 'bg-[#F4F4F9]'} border-[#DCDCDC] rounded-[1.125rem] flex items-center gap-4 p-4 cursor-pointer`}
      onClick={() => setSelectedLanguage && setSelectedLanguage(language)}
    >
      <div className={'w-9 h-9 rounded-full overflow-hidden'}>
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
