import { useEffect, useState } from 'react';
import LanguageCard from '@/components/Language/LanguageCard';
import { LanguagesSummariesResponse } from '@/types/api/resumes';
import AddIcon from '@/assets/icons/Language/AddIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { useGetLanguagesSummaries } from '@/hooks/api/useResume';

const LanguageSection = () => {
  const { data } = useGetLanguagesSummaries();
  const navigage = useNavigate();

  // 언어 레벨 리스트 상태 관리
  const [languageData, setLanguageData] =
    useState<LanguagesSummariesResponse>();

  // 7.4 (유학생) 언어 요약 조회하기
  useEffect(() => {
    if (data) {
      setLanguageData(data.data);
    }
  }, [data]);

  return (
    <>
      {languageData && (
        <div className="px-6">
          <h1 className="head-2 text-[#1e1926 py-6">Language</h1>
          <div className="w-full flex justify-end gap-3 items-center pb-6 pr-2">
            <div className="body-2 text-[#1e1926">Add</div>
            {/* 언어 추가 화면 이동 */}
            <AddIcon
              onClick={() => navigage('/resume/language/add')}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-4 mb-14">
            {/* TOPIK */}
            <LanguageCard
              title="TOPIK"
              description="default"
              level={languageData.topik_level}
              isAdditionalLanguage={false}
              maxLevel={6}
            />
            {/* Social Program */}
            <LanguageCard
              title="Social integration program"
              description="default"
              level={languageData.social_integration_level}
              isAdditionalLanguage={false}
              maxLevel={5}
            />
            {/* Sejong */}
            <LanguageCard
              title="Sejong Institute"
              description="default"
              level={languageData.sejong_institute}
              isAdditionalLanguage={false}
              maxLevel={6}
            />
            {/* 별도의 언어 추가 카드 */}
            {languageData.additional_language?.length > 0 &&
              languageData.additional_language.map((language) => (
                <div key={language.id}>
                  <LanguageCard
                    title={language.language_name}
                    description="add"
                    level={language.level}
                    isAdditionalLanguage={true}
                    maxLevel={10}
                    etcLanguageId={language.id}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LanguageSection;
