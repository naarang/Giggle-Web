import BaseHeader from '@/components/Common/Header/BaseHeader';
import EmployerApplicantListTitle from '@/components/Employer/ApplicantList/EmployerApplicantListTitle';
import EmployerApplicantList from '@/components/Employer/ApplicantList/EmployerApplicantList';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetPostSummary } from '@/hooks/api/usePost';

const EmployerApplicantListPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, refetch } = useGetPostSummary(
    Number(id),
    !isNaN(Number(id)) ? true : false,
  );

  useEffect(() => {
    if (!isNaN(Number(id))) refetch();
  }, [id, refetch]);

  if (!data?.success) return <></>;

  return (
    <>
      <div className="w-full bg-[#FEF387] rounded-b-[1.5rem]">
        <BaseHeader
          hasBackButton={true}
          onClickBackButton={() => navigate('/employer/post')}
          hasMenuButton={false}
          title="지원자 조회"
        />
        <EmployerApplicantListTitle postData={data?.data} />
      </div>
      <EmployerApplicantList title={data?.data?.title} />
    </>
  );
};

export default EmployerApplicantListPage;
