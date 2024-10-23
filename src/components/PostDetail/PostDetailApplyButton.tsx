import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';

const PostDetailApplyButton = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full pt-[0.75rem] px-[1.5rem] pb-[2.5rem] bg-white">
      <Button
        type={buttonTypeKeys.APPLY}
        bgColor=""
        fontColor="text-white"
        isBorder={false}
        title="Apply Now"
      />
    </footer>
  );
};

export default PostDetailApplyButton;
