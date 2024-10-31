import { ManageResumeType } from '@/constants/manageResume';
import EditIcon from '@/assets/icons/ManageResume/EditIcon.svg?react';
import DeleteIcon from '@/assets/icons/ManageResume/DeleteIcon.svg?react';
import {
  EducationType,
  LanguageListType,
  WorkExperienceType,
} from '@/types/postApply/resumeDetailItem';
import { formatDate } from '@/utils/editResume';
import { useNavigate } from 'react-router-dom';

type ResumeManageBoxProps = {
  type: ManageResumeType;
  data: string | WorkExperienceType[] | EducationType[] | LanguageListType;
  onDelete: (id?: number) => void;
};

const ResumeManageBox = ({ type, data, onDelete }: ResumeManageBoxProps) => {
  const navigate = useNavigate();

  // Introduction 타입의 카드
  const IntroductionManageCard = () => (
    <div className="px-3 py-4 flex justify-between items-start bg-[#F4F4F9] rounded-xl">
      <div className="text-[#656565] flex flex-col gap-4">
        <p className="caption-1-sb">{data.toString()}</p>
      </div>
      <div className="flex justify-center items-center gap-2.5 ml-1">
        <EditIcon
          onClick={() => navigate('/resume/introduction', { state: { data } })}
          className="cursor-pointer"
        />
        {onDelete && (
          <DeleteIcon onClick={() => onDelete()} className="cursor-pointer" />
        )}
      </div>
    </div>
  );

  // WorkExperience 타입의 카드
  const WorkExperienceManageCard = () => (
    <>
      {(data as WorkExperienceType[]).map((work) => (
        <div
          key={work.id}
          className="px-3 py-4 flex justify-between items-start bg-[#F4F4F9] rounded-xl"
        >
          <div className="text-[#656565] flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="head-3">{work.title}</p>
              <p className="body-3">{work.work_place}</p>
            </div>
            <p className="caption-1">
              {formatDate(work.start_date)} ~{' '}
              {work.end_date ? `${formatDate(work.end_date)}• ` : '현재 • '}
              {(work.duration / 30).toFixed(0)} months
            </p>
            <p className="body-3">{work.description}</p>
          </div>
          <div className="flex justify-center items-center gap-2.5 ml-1">
            <EditIcon
              onClick={() =>
                navigate(`/resume/work-experience/edit/${work.id}`)
              }
              className="cursor-pointer"
            />
            {onDelete && (
              <DeleteIcon
                onClick={() => onDelete(work.id)}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      ))}
    </>
  );

  // Education 타입의 카드
  const EducationManageCard = () => (
    <>
      {(data as EducationType[]).map((education) => (
        <div
          key={education.id}
          className="relative px-3 py-4 flex justify-between items-start bg-[#F4F4F9] rounded-xl"
        >
          <div className="text-[#656565]">
            <p className="head-3 mb-1">{education.education_level}</p>
            <div className="flex gap-1 body-3 mb-4 mr-4 justify-between">
              <p className="max-w-[50%]">{education.school_name}</p>
              <p>•</p>
              <p className="max-w-[50%]">{education.major}</p>
            </div>
            <p className="caption-1">
              {formatDate(education.start_date)} ~{' '}
              {formatDate(education.end_date)}
            </p>
          </div>
          <div className="absolute top-4 right-3 flex justify-center items-center gap-2.5 ml-1">
            <EditIcon
              onClick={() => navigate(`/resume/education/edit/${education.id}`)}
              className="cursor-pointer"
            />
            {onDelete && (
              <DeleteIcon
                onClick={() => onDelete(education.id)}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      ))}
    </>
  );

  // Language 타입의 카드
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
      {type === ManageResumeType.LANGUAGE && <LanguageManageCard />}
      {type === ManageResumeType.INTRODUCTION && <IntroductionManageCard />}
      {type === ManageResumeType.WORKEXPERIENCE && <WorkExperienceManageCard />}
      {type === ManageResumeType.EDUCATION && <EducationManageCard />}
    </>
  );
};

export default ResumeManageBox;
