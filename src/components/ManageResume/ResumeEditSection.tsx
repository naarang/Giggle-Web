import {
  EducationType,
  LanguageListType,
  WorkExperienceType,
} from '@/types/postApply/resumeDetailItem';
import { ManageResumeType } from '@/constants/manageResume';
import { useState } from 'react';
import MypageCard from './components/MypageCard';
import { ResumeDataState } from '@/types/manageResume/manageResume';

type ResumeEditSectionProps = {
  introductionData: string;
  workexperienceData: WorkExperienceType[];
  educationData: EducationType[];
  languageData: LanguageListType;
};

const ResumeEditSection = ({
  introductionData,
  workexperienceData,
  educationData,
  languageData,
}: ResumeEditSectionProps) => {
  // 데이터 상태 관리
  const [resumeData, setResumeData] = useState<ResumeDataState>({
    introductionData,
    workexperienceData,
    educationData,
    languageData,
  });

  // 삭제 핸들러 (데이터 삭제 시 해당 필드를 null로 설정)
  const handleDelete = (type: ManageResumeType) => {
    setResumeData((prevData) => ({
      ...prevData,
      [type.toLowerCase() + 'Data']: null,
    }));
    // TODO:
  };

  return (
    <>
      {resumeData ? (
        <div className="flex flex-col gap-4">
          <MypageCard
            type={ManageResumeType.INTRODUCTION}
            data={resumeData.introductionData}
            onDelete={() => handleDelete(ManageResumeType.INTRODUCTION)}
          />
          <MypageCard
            type={ManageResumeType.WORKEXPERIENCE}
            data={resumeData.workexperienceData}
            onDelete={() => handleDelete(ManageResumeType.WORKEXPERIENCE)}
          />
          <MypageCard
            type={ManageResumeType.EDUCATION}
            data={resumeData.educationData}
            onDelete={() => handleDelete(ManageResumeType.EDUCATION)}
          />
          <MypageCard
            type={ManageResumeType.LANGUAGE}
            data={resumeData.languageData}
            onDelete={() => handleDelete(ManageResumeType.LANGUAGE)}
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default ResumeEditSection;
