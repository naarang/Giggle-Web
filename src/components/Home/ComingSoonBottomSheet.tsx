import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';

type CommingSoonBottomSheetPropsType = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
};

const CommingSoonBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: CommingSoonBottomSheetPropsType) => {
  return (
    <BottomSheetLayout
      hasHandlebar={false}
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <div className="w-full pt-2 px-2 pb-6 flex flex-col gap-6 items-center text-center">
        <h3 className="head-3 text-[#252525]">
          Smart Job Matches? Almost there! 🚀
        </h3>
        <p className="body-2 text-[#252525]">
          This feature isn’t available yet,
          <br />
          but it’s coming soon!
        </p>
      </div>
      <div className="w-full pt-3">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          isBorder={false}
          title="Okay"
          onClick={() => setIsShowBottomSheet(false)}
        />
      </div>
    </BottomSheetLayout>
  );
};

export default CommingSoonBottomSheet;
