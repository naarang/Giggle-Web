import BaseHeader from '@/components/Common/Header/BaseHeader';
import EmployerPostDetailButton from '@/components/Employer/PostDetail/EmployerPostDetailButton';
import PostDetailCompanyImageList from '@/components/PostDetail/PostDetailCompanyImageList';
import PostDetailContent from '@/components/PostDetail/PostDetailContent';
import PostDetailTitle from '@/components/PostDetail/PostDetailTitle';
import { POST_DETAIL_DATA } from '@/constants/postDetail';
import { useNavigate } from 'react-router-dom';

const EmployerPostDetailPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate(-1)}
        hasMenuButton={false}
        title="Detail"
      />
      <PostDetailCompanyImageList
        companyImageData={POST_DETAIL_DATA.company_img_url_list}
      />
      <PostDetailTitle postDetailData={POST_DETAIL_DATA} />
      <PostDetailContent postDetailData={POST_DETAIL_DATA} />
      <EmployerPostDetailButton />
    </>
  );
};

export default EmployerPostDetailPage;
