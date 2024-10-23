import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostApplyButton from '@/components/PostApply/PostApplyButton';
import { useNavigate } from 'react-router-dom';
import PostApplyResume from '@/components/PostApply/PostApplyResume';
import PostApplyTitle from '@/components/PostApply/PostApplyTitle';

const PostApplyPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate(-1)}
        hasMenuButton={false}
        title="Resume"
      />
      <PostApplyTitle />
      <PostApplyResume />
      <PostApplyButton />
    </>
  );
};

export default PostApplyPage;
