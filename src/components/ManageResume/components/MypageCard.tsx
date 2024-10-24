import { MypageCardType } from '@/types/manageResume/manageResume';
import ProfileIcon from '@/assets/icons/ManageResume/Profile.svg?react';

type MypageCardProps = {
  title: string;
  informations: MypageCardType[];
};

const MypageCard = ({ title, informations }: MypageCardProps) => {
  return (
    <div className="flex flex-col w-full p-4 justify-center  gap-4 rounded-[1.125rem] border-[0.5px] border-solid border-[#DCDCDC]">
      <div className="w-11/12 flex pl-2 pt-2 pb-4 border-b-[0.5px] border-solid border-[#DCDCDC] gap-3">
        <ProfileIcon />
        <div className="head-3 text-[#1E1926]">{title}</div>
      </div>
      {informations.map((info, index) => (
        <div key={index} className="px-3 py-4 flex flex-col gap-1">
          <div className="head-3 text-[#1E1926]">{info.title}</div>
          <div className="body-3 text-[#656565]">{info.description}</div>
        </div>
      ))}
    </div>
  );
};

export default MypageCard;
