import BaseHeader from '@/components/Common/Header/BaseHeader';
import EmployerApplicantListTitle from '@/components/Employer/ApplicantList/EmployerApplicantListTitle';
import EmployerApplicantList from '@/components/Employer/ApplicantList/EmployerApplicantList';
import { useNavigate } from 'react-router-dom';
import { PostSummaryItemType } from '@/types/post/postSummaryItem';
import { useEffect, useState } from 'react';
import { POST_SUMMARY_ITEM } from '@/constants/post';

const EmployerApplicantListPage = () => {
  const navigate = useNavigate();

  const [postData, setPostData] = useState<PostSummaryItemType>();

  useEffect(() => {
    // TODO: 4.7로 조회하기
    setPostData(POST_SUMMARY_ITEM);
  }, []);

  if (!postData) return <></>;

  return (
    <>
      <div className="w-full bg-[#FEF387] rounded-b-[1.5rem]">
        <BaseHeader
          hasBackButton={true}
          onClickBackButton={() => navigate('/employer/post')}
          hasMenuButton={false}
          title="지원자 조회"
        />
        <EmployerApplicantListTitle postData={postData} />
      </div>
      <EmployerApplicantList title={postData?.title} />
    </>
  );
};

export default EmployerApplicantListPage;
