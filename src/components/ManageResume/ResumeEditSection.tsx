import {
  EducationType,
  LanguageListType,
  WorkExperienceType,
} from '@/types/postApply/resumeDetailItem';
import { ManageResumeType } from '@/constants/manageResume';
import MypageCard from './components/MypageCard';
import { ResumeDataState } from '@/types/manageResume/manageResume';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

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
  // const queryClient = useQueryClient();

  // 데이터 상태 관리
  const resumeData: ResumeDataState = {
    introductionData,
    workexperienceData,
    educationData,
    languageData,
  };

  // 삭제 핸들러 (데이터 삭제 시 해당 필드를 null로 설정)
  const handleDeleteIntroduction = () => {
    console.log('introductio delete');
  };

  // TODO : Education 삭제 API
  const handleDeleteEducation = (id: number) => {
    console.log('education delete : ' + id);
  };
  /*
  const deleteEducation = async (id: number): Promise<AxiosResponse> => {
    return await axios.delete(`/api/v1/users/resumes/educations/${id}`);
  };

  const { mutate: handleDeleteEducation } = useMutation<
    AxiosResponse,
    Error,
    number
  >(deleteEducation, {
    onSuccess: (_, id) => {
      setResumeData((prevData) => ({
        ...prevData,
        educationData:
          prevData.educationData?.filter((education) => education.id !== id) ||
          null,
      }));
      queryClient.invalidateQueries(['resumeData']);
    },
    onError: (error) => {
      console.error('Error deleting education:', error);
    },
  });
  */

  // TODO : Work Experience 삭제 API
  const handleDeleteWorkExperience = (id: number) => {
    console.log('work experience delete : ' + id);
  };
  /*
  const deleteWorkExperience = async (id: number): Promise<AxiosResponse> => {
    return await axios.delete(`/api/v1/users/resumes/work-experiences/${id}`);
  };

  const { mutate: handleDeleteWorkExperience } = useMutation<
    AxiosResponse,
    Error,
    number
  >(deleteWorkExperience, {
    onSuccess: (_, id) => {
      setResumeData((prevData) => ({
        ...prevData,
        workexperienceData:
          prevData.workexperienceData?.filter((work) => work.id !== id) || null,
      }));
      queryClient.invalidateQueries(['resumeData']);
    },
    onError: (error) => {
      console.error('Error deleting work experience:', error);
    },
  });
  */

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
