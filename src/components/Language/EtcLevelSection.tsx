import { Dispatch, SetStateAction, useState } from 'react';
import LevelBottomSheet from '@/components/Language/LevelBottomSheet';

type EtcLevelSectionProps = {
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
};

const EtcLevelSection = ({ level, setLevel }: EtcLevelSectionProps) => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  return (
    <>
      <div
        className="flex flex-col gap-3 px-4 py-3 mt-6 rounded-xl border border-[#E2E5EB] shadow-inputFieldShadow"
        onClick={() => setBottomSheetOpen(true)}
      >
        <div className="head-3 text-[#222]">Level</div>
        <div className="body-2 text-[#656565]">level {level}</div>
      </div>
      <p className="body-3 text-[#656565] px-1.5 py-[0.375rem]">
        Proficiency level : 0 - Poor, 10 - Very good
      </p>
      {/* 레벨 선택 바텀시트 */}
      {bottomSheetOpen && (
        <LevelBottomSheet
          level={level}
          setLevel={setLevel}
          setBottomSheetOpen={setBottomSheetOpen}
        />
      )}
    </>
  );
};

export default EtcLevelSection;
