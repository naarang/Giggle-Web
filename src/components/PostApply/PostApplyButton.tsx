import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import CompleteButtonModal from '@/components/Common/CompleteButtonModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { usePostApplyPost } from '@/hooks/api/useApplication';
import PostApplyErrorBottomSheet from '@/components/PostApply/PostApplyErrorBottomSheet';
import { AxiosError } from 'axios';

const PostApplyButton = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [postId, setPostId] = useState<number | undefined>();
  const [isShowBottomsheet, setIsShowBottomSheet] = useState<boolean>(false);

  const { mutateAsync } = usePostApplyPost();

  const onClickApply = async () => {
    if (isNaN(Number(id))) return;
    try {
      const result = await mutateAsync(Number(id));

      if (result?.success) {
        setPostId(result?.data?.id);
        setIsComplete(true);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ error: { code: number } }>;

      if (axiosError.response?.data.error.code === 40011) {
        setIsShowBottomSheet(true);
      }
    }
  };

  return (
    <>
      <section className="fixed bottom-0 left-0 w-full flex justify-center items-center gap-[0.5rem] pt-[0.75rem] pb-[2.5rem] px-[1.5rem] bg-white">
        {/* TODO: 마이페이지 - 이력서 관리로 이동하기 */}
        <Button
          type={buttonTypeKeys.BACK}
          bgColor={'bg-[#F4F4F9]'}
          fontColor="text-[#BDBDBD]"
          title="Edit"
          isBorder={false}
          onClick={() => navigate('/profile/manage-resume')}
        />
        <Button
          type={buttonTypeKeys.APPLY}
          bgColor={'bg-[#FEF387]'}
          fontColor="text-[#1E1926]"
          title="Apply Now"
          isBorder={false}
          onClick={onClickApply}
        />
      </section>
      {isComplete && (
        <CompleteButtonModal
          title="Application Completed"
          content="You can check the status of your documents"
          buttonContent="Check Now"
          // TODO: 추후에 지원상태 - 상세 페이지로 이동시키기
          onClick={() => navigate(`/application/${postId}`)}
        />
      )}
      <PostApplyErrorBottomSheet
        isShowBottomsheet={isShowBottomsheet}
        setIsShowBottomSheet={setIsShowBottomSheet}
      />
    </>
  );
};

export default PostApplyButton;
