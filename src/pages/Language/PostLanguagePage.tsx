import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import EtcLanguageCard from '@/components/Language/EtcLanguageCard';
import EtcLanguageSection from '@/components/Language/EtcLanguageSection';
import EtcLevelSection from '@/components/Language/EtcLevelSection';
import { buttonTypeKeys } from '@/constants/components';
import { LanguageList } from '@/constants/language';
import { EtcLanguageData } from '@/types/manageResume/manageResume';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 초기 값
const initialLanguage = {
  id: 0,
  language: '',
  img_url: '',
};

const PostLanguagePage = () => {
  const navigate = useNavigate();
  // 추후 언어 리스트 json으로 전달 받아 업데이트 예정
  const languageList = LanguageList;
  // 선택한 언어 상태 관리
  const [selectedLanguage, setSelectedLanguage] =
    useState<EtcLanguageData>(initialLanguage);
  // 언어 선택 여부 상태 관리(선택 이후 레벨 선택 가능)
  const [isSelected, setIsSelected] = useState(false);
  // 선택한 언어 레벨 상태 관리
  const [level, setLevel] = useState(0);

  const handleSubmit = () => {
    // TODO: API - 7.7 언어 - ETC 생성하기
    navigate('/resume/language');
  };

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate('/resume/language')}
        hasMenuButton={false}
        title="Add Language"
      />
      <div className="px-6 mb-32">
        <h1 className="pt-6 pb-12 head-1 text-[#1E1926]">Add Language</h1>
        {/* 언어가 선택 되었는지 여부 */}
        {isSelected ? (
          // 2단계: 레벨 선택
          <>
            {/* 2단계에도 언어를 재설정할 수 있음 */}
            <div onClick={() => setIsSelected(false)}>
              <EtcLanguageCard language={selectedLanguage} isSelected={false} />
            </div>
            <EtcLevelSection level={level} setLevel={setLevel} />
          </>
        ) : (
          // 1단계: 언어 선택
          <EtcLanguageSection
            languageList={languageList}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        )}
      </div>
      <div className="pb-[2.5rem] px-6 pt-3 w-full fixed bottom-0 bg-grayGradient">
        {/* 언어가 선택 되었는지 여부 */}
        {isSelected ? (
          // 2단계: submit 버튼(레벨 선택)
          <Button
            type={buttonTypeKeys.LARGE}
            bgColor="bg-[#FEF387]"
            fontColor="text-[#1E1926]"
            title="Done"
            isBorder={false}
            onClick={handleSubmit}
          />
        ) : (
          // 1단계: 언어 선택 버튼
          <Button
            type={buttonTypeKeys.LARGE}
            bgColor={selectedLanguage ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
            fontColor={selectedLanguage ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
            title="Select"
            isBorder={false}
            onClick={() => setIsSelected(true)}
          />
        )}
      </div>
    </div>
  );
};

export default PostLanguagePage;
