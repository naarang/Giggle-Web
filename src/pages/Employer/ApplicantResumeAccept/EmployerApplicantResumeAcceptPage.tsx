import BaseHeader from '@/components/Common/Header/BaseHeader';
import EmployerApplicantResumeButton from '@/components/Employer/ApplicantResumeAccept/EmployerApplicantResumeButton';
import PostApplyResume from '@/components/PostApply/PostApplyResume';
import { useNavigate } from 'react-router-dom';

const EmployerApplicantResumeAcceptPage = () => {
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
      <EmployerApplicantResumeButton />
    </>
  );
};

export default EmployerApplicantResumeAcceptPage;
