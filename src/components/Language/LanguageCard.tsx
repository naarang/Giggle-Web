import ArrowIcon from '@/assets/icons/Language/ArrowIcon.svg?react';
import EditIcon from '@/assets/icons/Language/EditIcon.svg?react';
import TrashcanIcon from '@/assets/icons/Language/TrashcanIcon.svg?react';
import KoreanFlag from '@/assets/images/koreanFlag.png';

type LanguageCardProps = {
  title: string;
  description: string;
  level: number;
  isAdditionalLanguage: boolean;
};

const LanguageCard = ({
  title,
  description,
  level,
  isAdditionalLanguage,
}: LanguageCardProps) => {
  return (
    <div className="flex flex-col p-4 gap-2 rounded-[1.125rem] border-[0.5px] border-[#DCDCDC] border-solid">
      <div className="flex justify-between">
        <div className="flex gap-4 justify-center items-center">
          <div className="w-9 h-9">
            <img
              src={KoreanFlag}
              alt="Korean Flag"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="body-3 text-[#464646]">{description}</div>
            <div className="head-3 text-[#1E1926]">{title}</div>
          </div>
        </div>
        <div className="flex gap-2 justify-center items-start">
          {!isAdditionalLanguage && <ArrowIcon />}
          <EditIcon />
          {isAdditionalLanguage && <TrashcanIcon />}
        </div>
      </div>
      <div className="body-3 text-[#464646]">Level: {level}</div>
    </div>
  );
};

export default LanguageCard;
