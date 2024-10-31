import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostDetailApplyButton from '@/components/PostDetail/PostDetailApplyButton';
import PostDetailCompanyImageList from '@/components/PostDetail/PostDetailCompanyImageList';
import PostDetailContent from '@/components/PostDetail/PostDetailContent';
import PostDetailTitle from '@/components/PostDetail/PostDetailTitle';
import { useGetPostDetail, useGetPostDetailGuest } from '@/hooks/api/usePost';
import { useUserStore } from '@/store/user';
import { useNavigate, useParams } from 'react-router-dom';

const PostDetailPage = () => {
  const { account_type } = useUserStore();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: guestData } = useGetPostDetailGuest(
    Number(id),
    !account_type && !isNaN(Number(id)) ? true : false,
  );

  const { data: userData } = useGetPostDetail(
    Number(id),
    account_type && !isNaN(Number(id)) ? true : false,
  );

  const postDetailData = account_type ? userData : guestData;

  if (!postDetailData?.data) return <></>;

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate(-1)}
        hasMenuButton={false}
        title="Detail"
      />
      <PostDetailCompanyImageList
        companyImageData={postDetailData.data?.company_img_url_list}
      />
      <PostDetailTitle postDetailData={postDetailData.data} />
      <PostDetailContent postDetailData={postDetailData.data} />
      <PostDetailApplyButton
        isBookmarked={postDetailData.data?.is_book_marked ?? false}
      />
    </>
  );
};

export default PostDetailPage;
