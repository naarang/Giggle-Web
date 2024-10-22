import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import Tag from '@/components/Common/Tag';
import { buttonTypeKeys } from '@/constants/components';

type PostSearchFilterBottomSheetType = {
  currentRegion: (string | null)[];
  setCurrentRegion: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  onClickSubmit: () => void;
};

const PostSearchFilterBottomSheet = ({
  currentRegion,
  setCurrentRegion,
  onClickSubmit,
}: PostSearchFilterBottomSheetType) => {
  const onClickDelete = () => {
    setCurrentRegion([null, null, null]);
  };

  const formatRegionArrayToString = (region: (string | null)[]) => {
    return `${region[0] ?? ''} ${region[1] ?? ''} ${region[2] ?? ''}`;
  };

  return (
    <BottomSheetLayout
      hasHandlebar={false}
      isAvailableHidden={false}
      isShowBottomsheet={true}
    >
      <div className="w-full flex flex-col gap-[1.5rem]">
        <h3 className="w-full px-[0.75rem] head-3 text-black">
          Selected Areas
        </h3>
        <div className="w-full px-[0.5rem] flex flex-wrap gap-[0.5rem]">
          {currentRegion[0] && (
            <Tag
              value={formatRegionArrayToString(currentRegion)}
              padding="0.313rem 0.625rem 0.313rem 0.75rem"
              isRounded={true}
              hasCheckIcon={false}
              backgroundColor={'#FEF387'}
              color="#1E1926"
              fontStyle="body-3"
              onDelete={onClickDelete}
            />
          )}
        </div>
        <div className="w-full flex justify-center items-center gap-[0.5rem]">
          <Button
            type={buttonTypeKeys.BACK}
            bgColor={'bg-[#F4F4F9]'}
            fontColor="text-[#BDBDBD] button-1"
            title="Reset"
            isBorder={false}
            onClick={onClickDelete}
          />
          <Button
            type={buttonTypeKeys.CONTINUE}
            bgColor={'bg-[#FEF387]'}
            fontColor="text-[#1E1926] button-1"
            title="Continue"
            isBorder={false}
            onClick={onClickSubmit}
          />
        </div>
      </div>
    </BottomSheetLayout>
  );
};

export default PostSearchFilterBottomSheet;
