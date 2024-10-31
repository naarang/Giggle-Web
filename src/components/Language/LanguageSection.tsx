import { useEffect, useState } from 'react';
import LanguageCard from '@/components/Language/LanguageCard';
import { LanguagesSummariesResponse } from '@/types/api/resumes';
import AddIcon from '@/assets/icons/Language/AddIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { useGetLanguagesSummaries } from '@/hooks/api/useResume';

const LanguageSection = () => {
  const { data } = useGetLanguagesSummaries();
  const navigage = useNavigate();
  const [languageData, SetLanguageData] =
    useState<LanguagesSummariesResponse>();

  useEffect(() => {
    SetLanguageData(data);
  }, [data]);

  return (
    <>
      {languageData ? (
        <div className="px-6">
          <h1 className="head-2 text-[#1e1926 py-6">Language</h1>
          <div className="w-full flex justify-end gap-3 items-center pb-6 pr-2">
            <div className="body-2 text-[#1e1926">Add</div>
            <AddIcon
              onClick={() => navigage('/resume/language/add')}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-4 mb-14">
            {/* TOPIC */}
            <LanguageCard
              title="TOPIC"
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
            {languageData.additional_language.map((language) => (
              <div key={language.id}>
                <LanguageCard
                  title={language.language_name}
                  description="add"
                  level={language.level}
                  isAdditionalLanguage={true}
                  maxLevel={10}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>로딩 중</div>
      )}
    </>
  );
};

export default LanguageSection;
