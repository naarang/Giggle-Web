import ApplicationDetailCard from '@/components/ApplicationDetail/ApplicationDetailCard';
import ApplicationDetailInfo from '@/components/ApplicationDetail/ApplicationDetailInfo';
import ApplicationDetailSteps from '@/components/ApplicationDetail/ApplicationDetailSteps';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { useNavigate } from 'react-router-dom';

// TODO: enum에 따라서 몇번째 step인지 숫자로 반환하도록 하기! 그에 따른 step과 하단 버튼 구현하기
const ApplicationDetailPage = () => {
  const navigate = useNavigate();
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
    </>
  );
};

export default ApplicationDetailPage;
