import { ManageResumeType } from '@/constants/manageResume';
import EditIcon from '@/assets/icons/ManageResume/EditIcon.svg?react';
import DeleteIcon from '@/assets/icons/ManageResume/DeleteIcon.svg?react';
import {
  EducationType,
  LanguageListType,
  WorkExperienceType,
} from '@/types/postApply/resumeDetailItem';
import { formatDate } from '@/utils/manageresume';

type ResumeManageBoxProps = {
  type: ManageResumeType;
  data: string | WorkExperienceType[] | EducationType[] | LanguageListType;
  onDelete: () => void;
};

const ResumeManageBox = ({ type, data, onDelete }: ResumeManageBoxProps) => {
  const IntroductionManageCard = () => (
    <p className="caption-1-sb">{data.toString()}</p>
  );

  const WorkExperienceManageCard = () => (
    <div>
      {(data as WorkExperienceType[]).map((work) => (
        <div key={work.id} className="text-[#656565] flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="head-3">{work.title}</p>
            <p className="body-3">{work.description}</p>
          </div>
          <p className="caption-1">
            {formatDate(work.start_date)} ~{' '}
            {work.end_date && formatDate(work.end_date)} •{' '}
            {(work.duration / 30).toFixed(0)} months
          </p>
          {/* TODO : API - Task property 추가 */}
          <p className="body-3">Task1</p>
        </div>
      ))}
    </div>
  );

  const EducationManageCard = () => (
    <div>
      {(data as EducationType[]).map((education) => (
        <div key={education.id} className="text-[#656565]">
          <p className="head-3 mb-1">{education.education_level}</p>
          <div className="flex gap-1 body-3 mb-4">
            <p>{education.school_name}</p>
            <p>•</p>
            <p>{education.major}</p>
          </div>
          <p className="caption-1">
            {formatDate(education.start_date)} ~{' '}
            {formatDate(education.end_date)}
          </p>
        </div>
      ))}
    </div>
  );

  const LanguageManageCard = () => (
    <div className="flex flex-wrap gap-2">
      <p className="bg-[#FEF387] rounded-md px-4 py-1.5 text-[#1E1926] caption-1">
        TOPIK Level {(data as LanguageListType).topik}
      </p>

      <p className="bg-[#FEF387] rounded-md px-4 py-1.5 text-[#1E1926] caption-1">
        Social Intergration Level{' '}
        {(data as LanguageListType).social_integration}
      </p>

      <p className="bg-[#FEF387] rounded-md px-4 py-1.5 text-[#1E1926] caption-1">
        Sejong Institute Level {(data as LanguageListType).sejong_institute}
      </p>
      {(data as LanguageListType).etc.length > 0 &&
        (data as LanguageListType).etc.map((lang) => (
          <p
            key={lang.id}
            className="bg-[#FEF387] rounded-md px-4 py-1.5 text-[#1E1926] caption-1"
          >
            {lang.laguage_name} Level {lang.level}
          </p>
        ))}
    </div>
  );

  return (
    <>
      {/* Language 컴포넌트 디자인 예외처리 */}
      {type === ManageResumeType.LANGUAGE ? (
        <LanguageManageCard />
      ) : (
        <div className="px-3 py-4 flex justify-between items-start bg-[#F4F4F9] rounded-xl">
          {type === ManageResumeType.INTRODUCTION && <IntroductionManageCard />}
          {type === ManageResumeType.WORKEXPERIENCE && (
            <WorkExperienceManageCard />
          )}
          {type === ManageResumeType.EDUCATION && <EducationManageCard />}
          <div className="flex justify-center items-center gap-2.5 ml-1">
            <EditIcon />
            <DeleteIcon onClick={onDelete} className="cursor-pointer" />
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeManageBox;
