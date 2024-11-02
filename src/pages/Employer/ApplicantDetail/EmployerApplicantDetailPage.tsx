import ApplicationDetailSteps from '@/components/ApplicationDetail/ApplicationDetailSteps';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import EmployerApplicantDetailButton from '@/components/Employer/ApplicantDetail/EmployerApplicantDetailButton';
import EmployerApplicantDetailCard from '@/components/Employer/ApplicantDetail/EmployerApplicantDetailCard';
import { useGetEmployerApplicationDetail } from '@/hooks/api/useApplication';
import { useRouteIdStore } from '@/store/route';
import { findCurrentStep } from '@/utils/application';
import { useNavigate } from 'react-router-dom';

const EmployerApplicantDetailPage = () => {
  const navigate = useNavigate();
  const { routeId } = useRouteIdStore();
  const { data } = useGetEmployerApplicationDetail(
    Number(routeId),
    !isNaN(Number(routeId)),
  );

  if (!data?.success) return <></>;

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate(-1)}
        hasMenuButton={false}
        title="서류 신청 관리하기"
      />
      <div className="w-full flex flex-col gap-[2.25rem] p-[1.5rem]">
        <EmployerApplicantDetailCard applicantData={data?.data} />
        <ApplicationDetailSteps
          step={findCurrentStep(data?.data.step)}
          isKorean={true}
        />
      </div>
      <EmployerApplicantDetailButton step={data?.data.step} />
    </>
  );
};

export default EmployerApplicantDetailPage;
