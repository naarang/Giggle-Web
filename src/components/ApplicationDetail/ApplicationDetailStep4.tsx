import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import ApplicationDetailBottomSheet from '@/components/ApplicationDetail/ApplicationDetailBottomSheet';
import ContactCoordinatorModal from '@/components/ApplicationDetail/ContactCoordinatorModal';
import { ApplicationCoordinaterItemType } from '@/types/application/applicationItem';
import {
  useGetSchoolInfo,
  usePatchContactCoordinator,
} from '@/hooks/api/useApplication';

const ApplicationDetailStep4 = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { refetch } = useGetSchoolInfo(false);
  const { mutate } = usePatchContactCoordinator();

  const [isShowBottomsheet, setIsShowBottomSheet] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [coordinatorData, setCoordinatorData] =
    useState<ApplicationCoordinaterItemType>();

  const onClickBlackButton = async () => {
    const { data } = await refetch();
    if (!data?.success) return;

    setCoordinatorData(data?.data);
    setIsShowModal(true);
    setIsShowBottomSheet(false);
  };

  const onClickYellowButton = () => {
    if (isNaN(Number(id))) return;
    mutate(Number(id));
  };

  const onClickContact = () => {
    // TODO: 전화연결 활성화
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
      {isShowModal && coordinatorData && (
        <ContactCoordinatorModal
          onClickClose={() => setIsShowModal(false)}
          onClickContact={onClickContact}
          coordinatorData={coordinatorData}
        />
      )}
    </>
  );
};

export default ApplicationDetailStep4;
