import LevelIcon from '@/assets/icons/Profile/LevelIcon.svg?react';
import { LanguageLevelType, MetaDataType } from '@/types/api/profile';
import { useNavigate } from 'react-router-dom';

type LicenseCardProps = {
  languageData: LanguageLevelType;
  metaData: MetaDataType;
};

const LicenseCard = ({ languageData, metaData }: LicenseCardProps) => {
  const navigate = useNavigate();
  const handleEnterButton = () => {
    navigate('/profile/language');
  };
  const emptyLevel = (): boolean => {
    return (
      languageData.kiip_level === 0 &&
      languageData.sejong_level === 0 &&
      languageData.topik_level === 0
    );
  };

  const LevelSection = ({ title, level }: { title: string; level: number }) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="head-2 text-[#1E1926] text-center">{title}</div>
          <div className="caption-2 text-[#464646] text-center">
            {title} description description
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <LevelIcon />
          <div className="absolute flex flex-col justify-center items-center gap-1">
            <div className="text-center body-3 text-[#1E1926]">Level</div>
            <div className="text-center head-3 text-[#1E1926]">{level}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="w-[327px] p-8 flex flex-col gap-4 bg-[#FEF387] rounded-2xl"
      style={{
        boxShadow:
          '0px 218px 61px 0px rgba(152, 147, 81, 0.00), 0px 139px 56px 0px rgba(152, 147, 81, 0.01), 0px 78px 47px 0px rgba(152, 147, 81, 0.05), 0px 35px 35px 0px rgba(152, 147, 81, 0.09), 0px 9px 19px 0px rgba(152, 147, 81, 0.10)',
      }}
    >
      <div className="flex gap-6 justify-center items-center">
        <LevelSection title="TOPIK" level={languageData.topik_level} />
        <LevelSection title="KIIP" level={languageData.kiip_level} />
        <LevelSection title="Sejong" level={languageData.sejong_level} />
      </div>
      {/* 모든 언어 레벨이 0인 경우 */}
      {emptyLevel() ? (
        <button
          className="text-center py-2 bg-[#F4F4F9] rounded-md text-[#656565] caption-1"
          onClick={handleEnterButton}
        >
          Please enter your language level
        </button>
      ) : (
        // ------- 입력 레벨별 문장 -------
        <div>
          <div className="flex items-center gap-2">
            <div className="button-2 text-[#464646]">Industries</div>
            <div className="caption-1 text-[#656565]">
              {metaData.is_topik_4_or_more
                ? // 토픽 4급 이상
                  'Everywhere possible'
                : // 토픽 4급 이하
                  'All except manufacturing'}
            </div>
          </div>
          {/* 근무 시간 */}
          <div className="flex items-center gap-2">
            <div className="button-2 text-[#464646]">Hours</div>
            <div className="caption-1 text-[#656565]">
              {metaData.weekday_work_hour} hrs on weekdays,{' '}
              {metaData.weekend_work_hour} hrs on weekends
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="button-2 text-[#464646]">Location</div>
            <div className="caption-1 text-[#656565]">
              {metaData.is_metropolitan_area
                ? // 수도권
                  'Within 90 mins from home (Seoul metro area)'
                : // 비수도권
                  'Within 60 mins from university location (non-metropolitan area)'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LicenseCard;
