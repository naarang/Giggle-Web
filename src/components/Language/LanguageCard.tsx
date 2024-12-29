import ArrowIcon from '@/assets/icons/Language/ArrowIcon.svg?react';
import EditIcon from '@/assets/icons/Language/EditIcon.svg?react';
import TrashcanIcon from '@/assets/icons/Language/TrashcanIcon.svg?react';
import KoreanFlag from '@/assets/images/koreanFlag.png';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import { useState } from 'react';
import Button from '@/components/Common/Button';
import {
  useDeleteEtcLanguageLevel,
  usePatchEtcLanguageLevel,
  usePatchLanguagesLevel,
} from '@/hooks/api/useResume';
import NumberRadioButton from '@/components/Language/NumberRadioButton';
import { LanguagesLevelType } from '@/types/api/resumes';
import { LanguageList } from '@/constants/language_data';

type LanguageCardProps = {
  title: string;
  description: string;
  level: number;
  etcLanguageId?: number;
  isAdditionalLanguage: boolean;
  maxLevel: number;
};

const LanguageCard = ({
  title,
  description,
  level,
  etcLanguageId,
  isAdditionalLanguage,
  maxLevel,
}: LanguageCardProps) => {
  const [levelBottomSheet, setLevelBottomSheet] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(level);

  const { mutate: deleteEtcLanguage } = useDeleteEtcLanguageLevel();
  const { mutate: patchLanguagesLevel } = usePatchLanguagesLevel();
  const { mutate: patchEtcLanguageLevel } = usePatchEtcLanguageLevel();

  const handleLevelChange = () => {
    // 기타 언어 수정
    if (etcLanguageId) {
      patchEtcLanguageLevel({
        id: etcLanguageId,
        data: {
          language_name: title,
          level: selectedLevel,
        },
      });
    }
    // 기본 언어 수정
    else
      patchLanguagesLevel({
        type: title.toLowerCase().replace(/\s+/g, '-') as LanguagesLevelType,
        level: selectedLevel,
      });
    setLevelBottomSheet(false);
  };

  const mapLanguageImg = (title: string) => {
    const languageData = LanguageList.find(
      (language) => language.language === title,
    );

    // 일치하는 언어의 이미지가 없을 경우 undefined 반환
    return languageData ? languageData.img_url : undefined;
  };

  const goToWebSite = [
    {
      language: 'TOPIK',
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

  const handleEtcLanguageDelete = () => {
    if (etcLanguageId) {
      deleteEtcLanguage(etcLanguageId);
    }
  };

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
          <div className="head-2 text-[#1E1926] py-3 pb-8 text-center">
            Choose your {title} Grade
          </div>
          {/* 언어 등급 선택 (0 ~ maxLevel) */}
          <div className="w-full h-[48vh] overflow-x-scroll">
            {[...Array(maxLevel + 1).keys()].map((grade) => (
              <div
                key={grade}
                className="w-full flex items-center justify-between px-2.5 py-3"
              >
                <div className="ml-2 body-1 text-[#656565]">Grade {grade}</div>
                <NumberRadioButton
                  value={grade}
                  setValue={() => setSelectedLevel(grade)}
                  isOn={selectedLevel === grade}
                />
              </div>
            ))}
          </div>
          <div className="bg-grayGradient">
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
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <img
                src={mapLanguageImg(title) ? mapLanguageImg(title) : KoreanFlag}
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
              <TrashcanIcon
                className="cursor-pointer"
                onClick={handleEtcLanguageDelete}
              />
            )}
          </div>
        </div>
        <div className="body-3 text-[#464646]">Level: {level}</div>
      </div>
    </>
  );
};

export default LanguageCard;
