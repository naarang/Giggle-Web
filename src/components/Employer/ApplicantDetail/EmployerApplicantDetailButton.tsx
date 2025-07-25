import { useNavigate } from 'react-router-dom';
import Button from '@/components/Common/Button';
import { useState } from 'react';
import EmployerApplicantContactBottomSheet from '@/components/Employer/ApplicantDetail/EmployerApplicantContactBottomSheet';
import { findCurrentStep } from '@/utils/application';
import { ApplicationStepType } from '@/types/application/applicationItem';
import { APPLICATION_STEP } from '@/constants/application';

type EmployerApplicantDetailButtonPropsType = {
  applicant_id: number;
  step: ApplicationStepType;
};

const EmployerApplicantDetailButton = ({
  applicant_id,
  step,
}: EmployerApplicantDetailButtonPropsType) => {
  const navigate = useNavigate();
  const [isShowBottomsheet, setIsShowBottomSheet] = useState<boolean>(false);

  const renderCurrentStepButton = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return (
          <Button
            type={Button.Type.PRIMARY}
            size={Button.Size.LG}
            isFullWidth
            title="이력서 확인하기"
            onClick={() =>
              navigate(`/employer/applicant/${applicant_id}/resume/accept`)
            }
          />
        );
      case 2:
        return (
          <>
            <Button
              type={Button.Type.PRIMARY}
              size={Button.Size.LG}
              isFullWidth
              title="면접 일정 조율하기"
              onClick={() => setIsShowBottomSheet(true)}
            />
            <EmployerApplicantContactBottomSheet
              isShowBottomsheet={isShowBottomsheet}
              setIsShowBottomSheet={setIsShowBottomSheet}
            />
          </>
        );
      case 3:
        return (
          <Button
            type={Button.Type.PRIMARY}
            size={Button.Size.LG}
            isFullWidth
            title="신청 서류 확인하기"
            onClick={() =>
              navigate(`/employer/applicant/document-detail/${applicant_id}`)
            }
          />
        );
      case 4:
        return (
          <Button
            type={Button.Type.PRIMARY}
            size={Button.Size.LG}
            isFullWidth
            title="신청 서류 확인하기"
            onClick={() =>
              navigate(`/employer/applicant/document-detail/${applicant_id}`)
            }
          />
        );
      case 5:
        return (
          <Button
            type={Button.Type.PRIMARY}
            size={Button.Size.LG}
            isFullWidth
            title="신청 서류 확인하기"
            onClick={() =>
              navigate(`/employer/applicant/document-detail/${applicant_id}`)
            }
          />
        );
      case 6:
        return (
          <Button
            type={Button.Type.PRIMARY}
            size={Button.Size.LG}
            isFullWidth
            title="신청 서류 확인하기"
            onClick={() =>
              navigate(`/employer/applicant/document-detail/${applicant_id}`)
            }
          />
        );
      case 7:
        return (
          <Button
            type={Button.Type.PRIMARY}
            size={Button.Size.LG}
            isFullWidth
            title="신청 서류 확인하기"
            onClick={() =>
              navigate(`/employer/applicant/document-detail/${applicant_id}`)
            }
          />
        );
      default:
        return (
          <Button
            type={Button.Type.NEUTRAL}
            size={Button.Size.LG}
            isFullWidth
            title={
              step === APPLICATION_STEP.PENDING
                ? '2주 이상 대기 중입니다.'
                : '이력서를 거절했습니다.'
            }
          />
        );
    }
  };

  return (
    <section className="w-full px-[1.5rem] pt-[0.75rem] pb-[3.125rem]">
      {renderCurrentStepButton(findCurrentStep(step))}
    </section>
  );
};

export default EmployerApplicantDetailButton;
