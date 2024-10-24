import { useNavigate } from 'react-router-dom';
import CtaIcon from '@/assets/icons/ManageResume/CtaIcon.svg?react';
import ProfileIcon from '@/assets/icons/ManageResume/Profile.svg?react';
import WorkIcon from '@/assets/icons/ManageResume/WorkIcon.svg?react';
import EducationIcon from '@/assets/icons/ManageResume/EducationIcon.svg?react';
import LanguageIcon from '@/assets/icons/ManageResume/LanguageIcon.svg?react';
import { ManageResumeType } from '@/constants/manageResume';

type ResumeEditBoxProps = {
  title: ManageResumeType;
  children?: React.ReactNode;
};

const ResumeEditBox = ({ title, children }: ResumeEditBoxProps) => {
  const navigate = useNavigate();

  const iconAndPath = {
    [ManageResumeType.INTRODUCTION]: {
      icon: <ProfileIcon />,
      path: '/profile/manage-resume/introduction',
    },
    [ManageResumeType.WORKEXPERIENCE]: {
      icon: <WorkIcon />,
      path: '/profile/manage-resume/work-experience',
    },
    [ManageResumeType.EDUCATION]: {
      icon: <EducationIcon />,
      path: '/profile/manage-resume/education',
    },
    [ManageResumeType.LANGUAGE]: {
      icon: <LanguageIcon />,
      path: '/profile/manage-resume/language',
    },
  };

  const handleClick = () => {
    navigate(iconAndPath[title].path);
  };

  return (
    <div className="flex flex-col">
      <div className="bg-profileMenuGradient bg-cover bg-no-repeat bg-center rounded-[1.375rem] py-7 px-6 flex justify-between items-center cursor-pointer">
        <div className="flex items-center gap-3">
          <div>{iconAndPath[title].icon}</div>
          <div className="head-3 text-[#1E1926]">{title}</div>
        </div>
        <CtaIcon onClick={handleClick} />
      </div>
      {children}
    </div>
  );
};

export default ResumeEditBox;
