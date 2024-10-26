import BaseHeader from '@/components/Common/Header/BaseHeader';
import EmployerApplicantListTitle from '@/components/Employer/ApplicantList/EmployerApplicantListTitle';
import { useNavigate } from 'react-router-dom';

const EmployerApplicantListPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full bg-[#FEF387] rounded-b-[1.5rem]">
        <BaseHeader
          hasBackButton={true}
          onClickBackButton={() => navigate('/employer/post')}
          hasMenuButton={true}
          title="지원자 조회"
        />
        <EmployerApplicantListTitle />
      </div>
    </>
  );
};

export default EmployerApplicantListPage;
