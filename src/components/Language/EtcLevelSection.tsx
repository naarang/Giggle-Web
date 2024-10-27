import { Dispatch, SetStateAction } from 'react';

type EtcLevelSectionProps = {
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
};

const EtcLevelSection = ({ level, setLevel }: EtcLevelSectionProps) => {
  return (
    <>
      <div className="flex flex-col gap-3 px-4 py-3 mt-6 rounded-xl border border-[#E2E5EB] shadow-inputFieldShadow">
        <div className="head-3 text-[#222]">Level</div>
        <div className="body-2 text-[#656565]">level {level}</div>
      </div>
      <p className="body-3 text-[#656565] px-1.5 py-[0.375rem]">
        Proficiency level : 0 - Poor, 10 - Very good
      </p>
    </>
  );
};

export default EtcLevelSection;
