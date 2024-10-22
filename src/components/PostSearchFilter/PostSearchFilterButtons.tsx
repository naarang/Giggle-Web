import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { FILTER_CATEGORY } from '@/constants/postSearch';

type PostSearchFilterButtonsType = {
  setFilterList: React.Dispatch<React.SetStateAction<PostSearchFilterItemType>>;
};

const PostSearchFilterButtons = ({
  setFilterList,
}: PostSearchFilterButtonsType) => {
  const onClickReset = () => {
    setFilterList({
      [FILTER_CATEGORY.REGION_1DEPTH]: [],
      [FILTER_CATEGORY.REGION_2DEPTH]: [],
      [FILTER_CATEGORY.REGION_3DEPTH]: [],
      [FILTER_CATEGORY.INDUSTRY]: [],
      [FILTER_CATEGORY.WORK_PERIOD]: [],
      [FILTER_CATEGORY.WORK_DAYS_PER_WEEK]: [],
      [FILTER_CATEGORY.WORKING_DAY]: [],
      [FILTER_CATEGORY.WORKING_HOURS]: [],
      [FILTER_CATEGORY.RECRUITMENT_PERIOD]: [],
      [FILTER_CATEGORY.EMPLOYMENT_TYPE]: [],
      [FILTER_CATEGORY.VISA]: [],
    });
  };

  return (
    <section className="w-full flex justify-center items-center gap-[0.5rem] pt-[0.75rem] pb-[2.5rem] px-[1.5rem]">
      <Button
        type={buttonTypeKeys.BACK}
        bgColor={'bg-[#F4F4F9]'}
        fontColor="text-[#BDBDBD] button-1"
        title="Reset"
        isBorder={false}
        onClick={onClickReset}
      />
      <Button
        type={buttonTypeKeys.CONTINUE}
        bgColor={'bg-[#FEF387]'}
        fontColor="text-[#1E1926] button-1"
        title="Apply"
        isBorder={false}
      />
    </section>
  );
};

export default PostSearchFilterButtons;
