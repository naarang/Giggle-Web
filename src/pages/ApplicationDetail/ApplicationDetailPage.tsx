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

// TODO: enum에 따라서 몇번째 step인지 숫자로 반환하도록 하기! 그에 따른 step과 하단 버튼 구현하기
const ApplicationDetailPage = () => {
  const navigate = useNavigate();
  const step = 4; // 1 ~6

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
        <ApplicationDetailCard />
        <ApplicationDetailInfo />
        <ApplicationDetailSteps />
      </div>
      {showCurrentStepButton(step)}
    </>
  );
};

export default ApplicationDetailPage;
