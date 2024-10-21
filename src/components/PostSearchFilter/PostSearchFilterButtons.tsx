import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';

const PostSearchFilterButtons = () => {
  return (
    <section className="w-full flex justify-center items-center gap-[0.5rem] pt-[0.75rem] pb-[2.5rem] px-[1.5rem]">
      <Button
        type={buttonTypeKeys.BACK}
        bgColor={'bg-[#F4F4F9]'}
        fontColor="text-[#BDBDBD] button-1"
        title="Reset"
        isBorder={false}
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
