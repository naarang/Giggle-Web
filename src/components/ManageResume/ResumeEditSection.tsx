import {
  EducationType,
  LanguageListType,
  WorkExperienceType,
} from '@/types/postApply/resumeDetailItem';
import ResumeEditBox from './components/ResumeEditBox';
import ResumeManageBox from './components/ResumeManageBox';
import { ManageResumeType } from '@/constants/manageResume';

type ResumeEditSectionProps = {
  introData: string;
  workData: WorkExperienceType[];
  eduData: EducationType[];
  languageData: LanguageListType;
};

const ResumeEditSection = ({
  introData,
  workData,
  eduData,
  languageData,
}: ResumeEditSectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <ResumeEditBox title={ManageResumeType.INTRODUCTION}>
        {introData && (
          <ResumeManageBox
            type={ManageResumeType.INTRODUCTION}
            data={introData}
          />
        )}
      </ResumeEditBox>
      <ResumeEditBox title={ManageResumeType.WORKEXPERIENCE}>
        {workData && (
          <ResumeManageBox
            type={ManageResumeType.WORKEXPERIENCE}
            data={workData}
          />
        )}
      </ResumeEditBox>
      <ResumeEditBox title={ManageResumeType.EDUCATION}>
        {eduData && (
          <ResumeManageBox type={ManageResumeType.EDUCATION} data={eduData} />
        )}
      </ResumeEditBox>
      <ResumeEditBox title={ManageResumeType.LANGUAGE}>
        {languageData && (
          <ResumeManageBox
            type={ManageResumeType.LANGUAGE}
            data={languageData}
          />
        )}
      </ResumeEditBox>
    </div>
  );
};

export default ResumeEditSection;
