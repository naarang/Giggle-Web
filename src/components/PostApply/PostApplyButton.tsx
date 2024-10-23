import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import CompleteButtonModal from '@/components/Common/CompleteButtonModal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const PostApplyButton = () => {
  const navigate = useNavigate();

  const [isComplete, setIsComplete] = useState<boolean>(false);

  return (
    <>
      <section className="fixed bottom-0 left-0 w-full flex justify-center items-center gap-[0.5rem] pt-[0.75rem] pb-[2.5rem] px-[1.5rem] bg-white">
        {/* TODO: 마이페이지 - 이력서 관리로 이동하기 */}
        <Button
          type={buttonTypeKeys.BACK}
          bgColor={'bg-[#F4F4F9]'}
          fontColor="text-[#BDBDBD] button-1"
          title="Edit"
          isBorder={false}
        />
        <Button
          type={buttonTypeKeys.APPLY}
          bgColor={'bg-[#FEF387]'}
          fontColor="text-[#1E1926] button-1"
          title="Apply Now"
          isBorder={false}
          onClick={() => setIsComplete(true)}
        />
      </section>
      {isComplete && (
        <CompleteButtonModal
          title="Application Completed"
          content="You can check the status of your documents"
          buttonContent="Check Now"
          // TODO: 추후에 지원상태 - 상세 페이지로 이동시키기
          onClick={() => navigate('/')}
        />
      )}
    </>
  );
};

export default PostApplyButton;
