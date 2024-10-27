import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import EtcLanguageCard from '@/components/Language/EtcLanguageCard';
import EtcLanguageSection from '@/components/Language/EtcLanguageSection';
import EtcLevelSection from '@/components/Language/EtcLevelSection';
import { buttonTypeKeys } from '@/constants/components';
import { LanguageList } from '@/constants/language';
import useNavigateBack from '@/hooks/useNavigateBack';
import { EtcLanguageData } from '@/types/manageResume/manageResume';
import { useState } from 'react';

const PostLanguagePage = () => {
  const handleBackButtonClick = useNavigateBack();
  // 추후 언어 리스트 json으로 전달 받아 업데이트 예정
  const languageList = LanguageList;
  // 선택한 언어 상태 관리
  const [selectedLanguage, setSelectedLanguage] = useState<EtcLanguageData>({
    id: 1,
    language: '',
    img_url: '',
  });
  // 언어 선택 여부 상태 관리(선택 이후 레벨 선택 가능)
  const [isSelected, setIsSelected] = useState(false);
  // 선택한 언어 레벨 상태 관리
  const [level, setLevel] = useState(0);

  const handleSubmit = () => {
    console.log(selectedLanguage, level);
  };

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Add Language"
      />
      <div className="px-6 mb-32">
        <h1 className="pt-6 pb-12 head-1 text-[#1E1926]">Add Language</h1>
        {isSelected ? (
          <>
            <EtcLanguageCard language={selectedLanguage} isSelected={false} />
            <EtcLevelSection level={level} setLevel={setLevel} />
          </>
        ) : (
          <EtcLanguageSection
            languageList={languageList}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        )}
      </div>
      <div className="pb-[2.5rem] px-6 pt-3 w-full fixed bottom-0 bg-grayGradient">
        {isSelected ? (
          // 레벨 선택 버튼
          <Button
            type={buttonTypeKeys.LARGE}
            bgColor={level ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
            fontColor={level ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
            title="Done"
            isBorder={false}
            onClick={level ? handleSubmit : undefined}
          />
        ) : (
          // 언어 선택 버튼
          <Button
            type={buttonTypeKeys.LARGE}
            bgColor={selectedLanguage ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
            fontColor={selectedLanguage ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
            title="Select"
            isBorder={false}
            onClick={() => selectedLanguage && setIsSelected(true)}
          />
        )}
      </div>
    </div>
  );
};

export default PostLanguagePage;
