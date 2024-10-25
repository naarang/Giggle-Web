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

  const iconAndPath = {
    [ManageResumeType.VISA]: { icon: <ProfileIcon />, path: '' },
    [ManageResumeType.PERSONALINFORMATION]: { icon: <ProfileIcon />, path: '' },
    [ManageResumeType.INTRODUCTION]: {
      icon: <ProfileIcon />,
      path: '/resume/introduction',
    },
    [ManageResumeType.WORKEXPERIENCE]: {
      icon: <WorkIcon />,
      path: '/resume/work-experience/write',
    },
    [ManageResumeType.EDUCATION]: {
      icon: <EducationIcon />,
      path: '/resume/education/write',
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

  // 공통 렌더링 헤더 컴포넌트
  const renderHeader = () => (
    <>
      <div className="w-full flex justify-between items-center px-2 pt-2 pb-4 border-b-[0.5px] border-solid border-[#DCDCDC] gap-3">
        <div className="flex gap-3 items-center">
          <div onClick={handleClick} className="cursor-pointer">
            {iconAndPath[type].icon}
          </div>
          <div className="head-3 text-[#1E1926]">{type}</div>
        </div>
        {/* Visa, personal informaion은 Cta 버튼 제외 */}
        {type !== ManageResumeType.VISA &&
        type !== ManageResumeType.PERSONALINFORMATION &&
        type !== ManageResumeType.INTRODUCTION ? (
          // Language는 Cta 버튼 디자인 분리
          type === ManageResumeType.LANGUAGE ? (
            <BigEditIcon onClick={handleClick} />
          ) : (
            <BlackCtaIcon onClick={handleClick} />
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );

  // 조건부 스타일
  // VISA와 PERSONALINFORMATION의 렌더링 내용
  const renderInformations = () => (
    <>
      {informations?.map((info, index) => (
        <div key={index} className="px-3 py-4 flex flex-col gap-1">
          <div className="head-3 text-[#1E1926]">{info.title}</div>
          <div className="body-3 text-[#656565]">{info.description}</div>
        </div>
      ))}
    </>
  );

  // 수정 가능한 정보 조건부 렌더링
  const renderEditSection = () => {
    if (data) {
      if (isEmptyData(data)) {
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
      } else {
        return (
          <div className="flex flex-col w-full p-4 justify-center gap-4 rounded-[1.125rem] border-[0.5px] border-solid border-[#DCDCDC]">
            {renderHeader()}
            <ResumeManageBox
              type={type}
              data={data}
              onDelete={() => onDelete}
            />
          </div>
        );
      }
    }
  };

  return (
    <>
      {/* visa, personal informaion은 다른 스타일의 헤더 랜더링 */}
      {type === ManageResumeType.VISA ||
      type === ManageResumeType.PERSONALINFORMATION ? (
        <>
          <div className="flex flex-col w-full p-4 justify-center gap-4 rounded-[1.125rem] border-[0.5px] border-solid border-[#DCDCDC]">
            {renderHeader()}
            {renderInformations()}
          </div>
        </>
      ) : (
        renderEditSection()
      )}
    </>
  );
};

export default MypageCard;
