import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ApplicationDetailBottomSheet from '@/components/ApplicationDetail/ApplicationDetailBottomSheet';
import ContactCoordinatorModal from '@/components/ApplicationDetail/ContactCoordinatorModal';

const ApplicationDetailStep4 = () => {
  const navigate = useNavigate();

  const [isShowBottomsheet, setIsShowBottomSheet] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const onClickBlackButton = () => {
    // TODO: 9.2 조회
    setIsShowModal(true);
    setIsShowBottomSheet(false);
  };

  const onClickYellowButton = () => {
    // TODO: 6.13 조회
    // 서류 상태? 페이지가 어디임?
  };

  const onClickContact = () => {
    // TODO: 전화연결 활성화...
    setIsShowModal(false);
  };

  return (
    <>
      <section className="flex flex-col gap-[0.5rem] w-full px-[1.5rem] pt-[0.75rem] pb-[3.125rem]">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          isBorder={false}
          title="Continue"
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
        blackButtonTitle="Find Coordinator"
        onClickBlackButton={onClickBlackButton}
        yellowButtonTitle="Completed"
        onClickYellowButton={onClickYellowButton}
      />
      {isShowModal && (
        <ContactCoordinatorModal
          onClickClose={() => setIsShowModal(false)}
          onClickContact={onClickContact}
          name={'name'}
          phoneNumber={'010-0000-0000'}
        />
      )}
    </>
  );
};

export default ApplicationDetailStep4;
