import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostDetailApplyButton from '@/components/PostDetail/PostDetailApplyButton';
import PostDetailCompanyImageList from '@/components/PostDetail/PostDetailCompanyImageList';
import PostDetailContent from '@/components/PostDetail/PostDetailContent';
import PostDetailTitle from '@/components/PostDetail/PostDetailTitle';
import { useNavigate } from 'react-router-dom';

const PostDetailPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate('/search')}
        hasMenuButton={false}
        title="Detail"
      />
      <PostDetailCompanyImageList />
      <PostDetailTitle />
      <PostDetailContent />
      <PostDetailApplyButton />
    </>
  );
};

export default PostDetailPage;
