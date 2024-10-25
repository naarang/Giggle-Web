import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';

const ApplicationDetailStep1 = () => {
  return (
    <section className="w-full px-[1.5rem] pt-[0.75rem] pb-[3.125rem]">
      <Button
        type={buttonTypeKeys.LARGE}
        bgColor={'bg-[#F4F4F9]'}
        fontColor="text-[#BDBDBD]"
        title="The employer must approve the resume"
        isBorder={false}
      />
    </section>
  );
};

export default ApplicationDetailStep1;
