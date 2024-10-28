import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostApplyResume from '@/components/PostApply/PostApplyResume';
import { useNavigate } from 'react-router-dom';

const EmployerApplicantResumePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate(-1)}
        hasMenuButton={false}
        title="이력서 확인"
      />
      <PostApplyResume />
    </>
  );
};

export default EmployerApplicantResumePage;
