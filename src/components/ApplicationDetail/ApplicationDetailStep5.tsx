import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ApplicationDetailBottomSheet from '@/components/ApplicationDetail/ApplicationDetailBottomSheet';

const ApplicationDetailStep5 = () => {
  const navigate = useNavigate();

  const [isShowBottomsheet, setIsShowBottomSheet] = useState<boolean>(false);

  const onClickBlackButton = () => {
    // TODO: 하이코리아 전자민원 신청으로 이동
  };

  const onClickYellowButton = () => {
    // 6.14 api -> 성공 시 현재 페이지 새로 고침
    window.location.reload();
  };

  return (
    <>
      <section className="flex flex-col gap-[0.5rem] w-full px-[1.5rem] pt-[0.75rem] pb-[3.125rem]">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          isBorder={false}
          title="Apply through HiKorea"
          onClick={() => setIsShowBottomSheet(true)}
        />
        <Button
          type={buttonTypeKeys.APPLY}
          bgColor=""
          fontColor="text-[#F4F4F9]"
          isBorder={false}
          title="Check the application documents"
          onClick={() => navigate('/application-documents')}
        />
      </section>
      <ApplicationDetailBottomSheet
        isShowBottomsheet={isShowBottomsheet}
        setIsShowBottomSheet={setIsShowBottomSheet}
        blackButtonTitle="Go Hikorea"
        onClickBlackButton={onClickBlackButton}
        yellowButtonTitle="Completed"
        onClickYellowButton={onClickYellowButton}
      />
    </>
  );
};

export default ApplicationDetailStep5;
