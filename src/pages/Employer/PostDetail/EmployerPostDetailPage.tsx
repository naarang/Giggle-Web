import BaseHeader from '@/components/Common/Header/BaseHeader';
import EmployerPostDetailButton from '@/components/Employer/PostDetail/EmployerPostDetailButton';
import PostDetailCompanyImageList from '@/components/PostDetail/PostDetailCompanyImageList';
import PostDetailContent from '@/components/PostDetail/PostDetailContent';
import PostDetailTitle from '@/components/PostDetail/PostDetailTitle';
import { UserType } from '@/constants/user';
import { useGetPostDetail } from '@/hooks/api/usePost';
import { useUserStore } from '@/store/user';
import { useNavigate, useParams } from 'react-router-dom';

const EmployerPostDetailPage = () => {
  const { account_type } = useUserStore();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useGetPostDetail(
    Number(id),
    account_type === UserType.OWNER && !isNaN(Number(id)) ? true : false,
  );

  if (!data?.success) return <></>;

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate(-1)}
        hasMenuButton={false}
        title="Detail"
      />
      <PostDetailCompanyImageList
        companyImageData={data.data?.company_img_url_list}
      />
      <PostDetailTitle postDetailData={data.data} />
      <PostDetailContent postDetailData={data.data} />
      <EmployerPostDetailButton />
    </>
  );
};

export default EmployerPostDetailPage;
