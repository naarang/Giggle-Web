import {
  EducationType,
  LanguageListType,
  WorkExperienceType,
} from '@/types/postApply/resumeDetailItem';
import { ManageResumeType } from '@/constants/manageResume';
import MypageCard from '@/components/ManageResume/components/MypageCard';
import { ResumeDataState } from '@/types/manageResume/manageResume';
import {
  useDeleteEducation,
  useDeleteWorkExperience,
  useDeleteIntroduction,
} from '@/hooks/api/useResume';

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
  const resumeData: ResumeDataState = {
    introductionData,
    workexperienceData,
    educationData,
    languageData,
  };

  // API 훅 적용
  const deleteIntroductionMutation = useDeleteIntroduction();
  const deleteEducationMutation = useDeleteEducation();
  const deleteWorkExperienceMutation = useDeleteWorkExperience();

  // 삭제 핸들러 (데이터 삭제 시 해당 API 호출)
  const handleDeleteIntroduction = () => {
    deleteIntroductionMutation.mutate(undefined, {
      onSuccess: () => {
        console.log('Introduction 삭제');
        // 필요 시 상태 업데이트나 추가 로직 실행
      },
      onError: (error) => {
        console.error('Introduction 삭제 실패', error);
      },
    });
  };

  const handleDeleteEducation = (id: number) => {
    deleteEducationMutation.mutate(id, {
      onSuccess: () => {
        console.log(`Education 삭제: ${id}`);
      },
      onError: (error) => {
        console.error(`Education 삭제 실패: ${id}`, error);
      },
    });
  };

  const handleDeleteWorkExperience = (id: number) => {
    deleteWorkExperienceMutation.mutate(id, {
      onSuccess: () => {
        console.log(`Work experience 삭제: ${id}`);
        // 필요 시 상태 업데이트나 추가 로직 실행
      },
      onError: (error) => {
        console.error(`Work experience 삭제 실패: ${id}`, error);
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <MypageCard
        type={ManageResumeType.INTRODUCTION}
        data={resumeData.introductionData}
        onDelete={() => handleDeleteIntroduction()}
      />
      <MypageCard
        type={ManageResumeType.WORKEXPERIENCE}
        data={resumeData.workexperienceData}
        onDelete={(id) => id !== undefined && handleDeleteWorkExperience(id)}
      />
      <MypageCard
        type={ManageResumeType.EDUCATION}
        data={resumeData.educationData}
        onDelete={(id) => id !== undefined && handleDeleteEducation(id)}
      />
      <MypageCard
        type={ManageResumeType.LANGUAGE}
        data={resumeData.languageData}
      />
    </div>
  );
};

export default ResumeEditSection;
