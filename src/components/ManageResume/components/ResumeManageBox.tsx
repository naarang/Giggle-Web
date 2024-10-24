import { ManageResumeType } from '@/constants/manageResume';
import {
  EducationType,
  LanguageListType,
  WorkExperienceType,
} from '@/types/postApply/resumeDetailItem';

type ResumeManageBoxProps = {
  type: ManageResumeType;
  data: string | WorkExperienceType[] | EducationType[] | LanguageListType;
};

const ResumeManageBox = ({ type, data }: ResumeManageBoxProps) => {
  const IntroductionManageCard = () => {
    return <div>{data.toString()}</div>;
  };

  const WorkExperienceManageCard = () => {
    return (
      <div>
        {(data as WorkExperienceType[]).map((work) => (
          <div key={work.id}>
            <p>{work.title}</p>
            <p>{work.description}</p>
            <p>{work.start_date}</p>
            <p>{work.end_date}</p>
            <p>{work.duration}</p>
          </div>
        ))}
      </div>
    );
  };

  const EducationManageCard = () => {
    return (
      <div>
        {(data as EducationType[]).map((education) => (
          <div key={education.id}>
            <p>{education.education_level}</p>
            <p>{education.school_name}</p>
            <p>{education.major}</p>
            <p>{education.grade}</p>
            <p>{education.start_date}</p>
            <p>{education.end_date}</p>
          </div>
        ))}
      </div>
    );
  };

  const LanguageManageCard = () => {
    return (
      <div>
        <p>TOPIK {(data as LanguageListType).topik}</p>
        <p>
          Social Intergration {(data as LanguageListType).social_integration}
        </p>
        <p>
          Sejong Insititue Level {(data as LanguageListType).sejong_institute}
        </p>
        <p>
          {(data as LanguageListType).etc?.map((lang) => (
            <p key={lang.id}>
              {lang.laguage_name} {lang.level}
            </p>
          ))}
        </p>
      </div>
    );
  };

  return (
    <div className="relative px-3 py-4 flex flex-col items-center bg-[#F4F4F9]">
      <div className="absolute right-3 top-3 flex justify-center items-center gap-2.5">
        <div>수정</div>
        <div>휴지통</div>
      </div>
      {type === ManageResumeType.INTRODUCTION && <IntroductionManageCard />}
      {type === ManageResumeType.WORKEXPERIENCE && <WorkExperienceManageCard />}
      {type === ManageResumeType.EDUCATION && <EducationManageCard />}
      {type === ManageResumeType.LANGUAGE && <LanguageManageCard />}
    </div>
  );
};

export default ResumeManageBox;
