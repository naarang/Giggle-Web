import { useNavigate } from 'react-router-dom';
import ResumeManageBox from '@/components/ManageResume/components/ResumeManageBox';
import {
  MypageCardData,
  MypageCardType,
} from '@/types/manageResume/manageResume';
import { ManageResumeType } from '@/constants/manageResume';

import CtaIcon from '@/assets/icons/ManageResume/CtaIcon.svg?react';
import BlackCtaIcon from '@/assets/icons/ManageResume/BlackCtaIcon.svg?react';
import ProfileIcon from '@/assets/icons/ManageResume/Profile.svg?react';
import WorkIcon from '@/assets/icons/ManageResume/WorkIcon.svg?react';
import EducationIcon from '@/assets/icons/ManageResume/EducationIcon.svg?react';
import LanguageIcon from '@/assets/icons/ManageResume/LanguageIcon.svg?react';
import BigEditIcon from '@/assets/icons/ManageResume/BigEditIcon.svg?react';
import { isEmptyData } from '@/utils/editResume';

type MypageCardProps = {
  type: ManageResumeType;
  informations?: MypageCardType[];
  data?: MypageCardData;
  onDelete?: (id?: number) => void;
};

const MypageCard = ({
  type,
  informations,
  data,
  onDelete,
}: MypageCardProps) => {
  const navigate = useNavigate();

  // '+' CTA를 눌렀을 떄 이동되는 경로와 아이콘을 매칭
  const iconAndPath = {
    [ManageResumeType.VISA]: { icon: <ProfileIcon />, path: '' },
    [ManageResumeType.PERSONALINFORMATION]: { icon: <ProfileIcon />, path: '' },
    [ManageResumeType.INTRODUCTION]: {
      icon: <ProfileIcon />,
      path: '/resume/introduction',
    },
    [ManageResumeType.WORKEXPERIENCE]: {
      icon: <WorkIcon />,
      path: '/resume/work-experience',
    },
    [ManageResumeType.EDUCATION]: {
      icon: <EducationIcon />,
      path: '/resume/education',
    },
    [ManageResumeType.LANGUAGE]: {
      icon: <LanguageIcon />,
      path: '/resume/language',
    },
  };

  // 클릭 시 path가 있으면 해당 경로로 이동
  const handleClick = () => {
    const { path } = iconAndPath[type];
    if (path) navigate(path);
  };

  // 공통 헤더 컴포넌트
  const renderHeader = () => (
    <>
      <div className="w-full flex justify-between items-center px-2 pt-2 pb-4 border-b-[0.5px] border-solid border-[#DCDCDC] gap-3">
        <div className="flex gap-3 items-center">
          <div onClick={handleClick} className="cursor-pointer">
            {iconAndPath[type].icon}
          </div>
          <div className="head-3 text-[#1E1926]">{type}</div>
        </div>
        {/* Language 수정 페이지 이동 */}
        {type === ManageResumeType.LANGUAGE && (
          <BigEditIcon onClick={handleClick} />
        )}
        {/* Education 추가 페이지 이동 */}
        {type === ManageResumeType.EDUCATION && (
          <BlackCtaIcon onClick={handleClick} />
        )}
        {/* Work experience 추가 페이지 이동 */}
        {type === ManageResumeType.WORKEXPERIENCE && (
          <BlackCtaIcon onClick={handleClick} />
        )}
      </div>
    </>
  );

  // -------- 조건부 스타일 --------
  // 이력서 관리 페이지에서 수정 불가한 정보 렌더링
  // server 데이터 : title, description 구조
  const renderInformations = () => (
    <div className="flex flex-col w-full p-4 justify-center gap-4 rounded-[1.125rem] border-[0.5px] border-solid border-[#DCDCDC]">
      {renderHeader()}
      {informations?.map((info, index) => (
        <div key={index} className="px-3 py-4 flex flex-col gap-1">
          <div className="head-3 text-[#1E1926]">{info.title}</div>
          <div className="body-3 text-[#656565]">
            {info.description.length == 2
              ? `${info.description[0]}, ${info.description[1]}` // 상세주소
              : info.description[0]}
          </div>
        </div>
      ))}
    </div>
  );

  // 이력서 관리 페이지에서 수정 가능한 정보 렌더링
  // server 데이터 : Json 구조
  const renderEditSection = () => {
    // 데이터가 있을 경우
    if (data && !isEmptyData(data)) {
      return (
        <div className="flex flex-col w-full p-4 justify-center gap-4 rounded-[1.125rem] border-[0.5px] border-solid border-[#DCDCDC]">
          {renderHeader()}
          <ResumeManageBox type={type} data={data} onDelete={() => onDelete} />
        </div>
      );
    }
    // 데이터가 없을 경우
    else {
      return (
        <div className="flex flex-col">
          <div className="bg-profileMenuGradient bg-cover bg-no-repeat bg-center rounded-[1.375rem] py-7 px-6 flex justify-between items-center cursor-pointer">
            <div className="flex items-center gap-3">
              <div>{iconAndPath[type].icon}</div>
              <div className="head-3 text-[#1E1926]">{type}</div>
            </div>
            <CtaIcon onClick={handleClick} />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {/* 이력서 관리 페이지 내, 수정 가능 여부에 따른 스타일 분리 */}
      {type === ManageResumeType.VISA ||
      type === ManageResumeType.PERSONALINFORMATION
        ? renderInformations()
        : renderEditSection()}
    </>
  );
};

export default MypageCard;
