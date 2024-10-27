import ArrowIcon from '@/assets/icons/Language/ArrowIcon.svg?react';
import EditIcon from '@/assets/icons/Language/EditIcon.svg?react';
import TrashcanIcon from '@/assets/icons/Language/TrashcanIcon.svg?react';
import KoreanFlag from '@/assets/images/koreanFlag.png';
import BottomSheetLayout from '../Common/BottomSheetLayout';
import { useState } from 'react';
import Button from '../Common/Button';
import { usePatchLanguagesLevel } from '@/hooks/api/useResume';
import NumberRadioButton from './NumberRadioButton';

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
  const [levelBottomSheet, setLevelBottomSheet] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(level);

  const { mutate: patchLanguagesLevel } = usePatchLanguagesLevel({
    type: title.toLowerCase().replace(/\s+/g, '-'),
    level: selectedLevel,
  });

  const handleLevelChange = () => {
    patchLanguagesLevel();
    setLevelBottomSheet(false);
  };

  const goToWebSite = [
    {
      language: 'TOPIC',
      site: 'https://www.topik.go.kr/TWMAIN/TWMAIN0010.do',
    },
    {
      language: 'Social integration program',
      site: 'https://www.socinet.go.kr/soci/main/main.jsp?MENU_TYPE=S_TOP_SY',
    },
    {
      language: 'Sejong Institute',
      site: 'https://nuri.iksi.or.kr/front/main/main.do',
    },
  ];

  // 현재 title과 일치하는 사이트 URL 찾기
  const siteInfo = goToWebSite.find((item) => item.language === title);

  return (
    <>
      {/* 언어 레벨 선택 바텀 시트 */}
      {levelBottomSheet && (
        <BottomSheetLayout
          hasHandlebar={true}
          isAvailableHidden={true}
          isShowBottomsheet={true}
          setIsShowBottomSheet={setLevelBottomSheet}
        >
          <div className="w-full flex flex-col py-2">
            <div className="head-2 text-[#1E1926] py-3 pb-8 text-center">
              Choose your {title} Grade
            </div>
            {/* 언어 등급 선택 - 사회통합프로그램 0~5, 그외 0~6 */}
            <div className="w-full mb-8">
              {[
                ...Array(title === 'Social integration program' ? 6 : 7).keys(),
              ].map((grade) => (
                <div
                  key={grade}
                  className="w-full flex items-center justify-between px-2.5 py-3"
                >
                  <div className="ml-2 body-1 text-[#656565]">
                    Grade {grade}
                  </div>
                  <NumberRadioButton
                    value={grade}
                    setValue={() => setSelectedLevel(grade)}
                    isOn={selectedLevel === grade}
                  />
                </div>
              ))}
            </div>
            <Button
              type="large"
              title="Select"
              isBorder={false}
              bgColor="bg-[#FEF387]"
              fontColor="text-[#1E1926]"
              onClick={handleLevelChange}
            />
          </div>
        </BottomSheetLayout>
      )}
      {/* 컴포넌트 시작 */}
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
            {/* 정의된 언어 이외의 언어는 사이트 이동되지 않음 */}
            {!isAdditionalLanguage && siteInfo && (
              <a href={siteInfo.site} target="_blank" rel="noopener noreferrer">
                <ArrowIcon className="cursor-pointer" />
              </a>
            )}
            <EditIcon
              onClick={() => setLevelBottomSheet(true)}
              className="cursor-pointer"
            />
            {isAdditionalLanguage && (
              <TrashcanIcon className="cursor-pointer" />
            )}
          </div>
        </div>
        <div className="body-3 text-[#464646]">Level: {level}</div>
      </div>
    </>
  );
};

export default LanguageCard;
