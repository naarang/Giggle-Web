import ApplicationDetailSteps from '@/components/ApplicationDetail/ApplicationDetailSteps';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import EmployerApplicantDetailButton from '@/components/Employer/ApplicantDetail/EmployerApplicantDetailButton';
import EmployerApplicantDetailCard from '@/components/Employer/ApplicantDetail/EmployerApplicantDetailCard';
import { APPLICANT_DETAIL_DATA } from '@/constants/application';
import { ApplicantDetailItemType } from '@/types/application/applicationItem';
import { findCurrentStep } from '@/utils/application';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerApplicantDetailPage = () => {
  const navigate = useNavigate();

  const [applicantData, setApplicantData] = useState<ApplicantDetailItemType>();

  useEffect(() => {
    setApplicantData(APPLICANT_DETAIL_DATA);
  }, []);

  if (!applicantData) return <></>;

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate(-1)}
        hasMenuButton={false}
        title="서류 신청 관리하기"
      />
      <div className="w-full flex flex-col gap-[2.25rem] p-[1.5rem]">
        <EmployerApplicantDetailCard applicantData={applicantData} />
        <ApplicationDetailSteps
          step={findCurrentStep(applicantData.step)}
          isKorean={true}
        />
      </div>
      <EmployerApplicantDetailButton step={applicantData.step} />
    </>
  );
};

export default EmployerApplicantDetailPage;
