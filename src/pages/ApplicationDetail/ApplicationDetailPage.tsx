import ApplicationDetailStep1 from '@/components/ApplicationDetail/ApplicationDetailStep1';
import ApplicationDetailStep2 from '@/components/ApplicationDetail/ApplicationDetailStep2';
import ApplicationDetailStep3 from '@/components/ApplicationDetail/ApplicationDetailStep3';
import ApplicationDetailStep4 from '@/components/ApplicationDetail/ApplicationDetailStep4';
import ApplicationDetailStep5 from '@/components/ApplicationDetail/ApplicationDetailStep5';
import ApplicationDetailStep6 from '@/components/ApplicationDetail/ApplicationDetailStep6';
import ApplicationDetailCard from '@/components/ApplicationDetail/ApplicationDetailCard';
import ApplicationDetailInfo from '@/components/ApplicationDetail/ApplicationDetailInfo';
import ApplicationDetailSteps from '@/components/ApplicationDetail/ApplicationDetailSteps';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { useNavigate } from 'react-router-dom';
import ApplicationDetailStep7 from '@/components/ApplicationDetail/ApplicationDetailStep7';
import { ApplicationDetailItemType } from '@/types/application/applicationItem';
import { findCurrentStep } from '@/utils/application';

// 더미데이터
const APPICATION_DETAIL_DATA: ApplicationDetailItemType = {
  title: 'Job Opportunity',
  icon_img_url: 'https://example.com/icon.png',
  address_name: '123 Example Street, City, Country',
  duration_of_days: 30,
  job_info: {
    hourly_rate: 15,
    work_period: 'ONE_MONTH_TO_THREE_MONTHS',
    work_day_times: [
      {
        day_of_week: 'MONDAY',
        work_start_time: '09:00',
        work_end_time: '17:00',
      },
      {
        day_of_week: 'WEDNESDAY',
        work_start_time: '10:00',
        work_end_time: '16:00',
      },
      {
        day_of_week: 'FRIDAY',
        work_start_time: '09:30',
        work_end_time: '18:00',
      },
    ],
  },
  step: 'APPLICATION_SUCCESS',
};

// TODO: enum에 따라서 몇번째 step인지 숫자로 반환하도록 하기! 그에 따른 step과 하단 버튼 구현하기
const ApplicationDetailPage = () => {
  const navigate = useNavigate();

  const showCurrentStepButton = (step: number) => {
    switch (step) {
      case 1:
        return <ApplicationDetailStep1 />;
      case 2:
        return <ApplicationDetailStep2 />;
      case 3:
        return <ApplicationDetailStep3 />;
      case 4:
        return <ApplicationDetailStep4 />;
      case 5:
        return <ApplicationDetailStep5 />;
      case 6:
        return <ApplicationDetailStep6 />;
      case 7:
        return <ApplicationDetailStep7 result={APPICATION_DETAIL_DATA.step} />;
    }
  };

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate('/application')}
        hasMenuButton={false}
        title="Applicants"
      />
      <div className="w-full flex flex-col gap-[2.25rem] p-[1.5rem]">
        <ApplicationDetailCard applicationData={APPICATION_DETAIL_DATA} />
        <ApplicationDetailInfo applicationData={APPICATION_DETAIL_DATA} />
        <ApplicationDetailSteps
          step={findCurrentStep(APPICATION_DETAIL_DATA.step)}
        />
      </div>
      {showCurrentStepButton(findCurrentStep(APPICATION_DETAIL_DATA.step))}
    </>
  );
};

export default ApplicationDetailPage;
