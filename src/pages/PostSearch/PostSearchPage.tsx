import TextFieldHeader from '@/components/Common/Header/TextFieldHeader';
import PostSearchFilterList from '@/components/PostSearch/PostSearchFilterList';
import PostSearchResult from '@/components/PostSearch/PostSearchResult';

const PostSearchPage = () => {
  return (
    <>
      <TextFieldHeader
        onClickBackButton={() => console.log('?')}
        onClickSearchButton={(value) => console.log(value)}
        placeholder="Search for job posting name"
      />
      <PostSearchFilterList />
      <PostSearchResult />
    </>
  );
};

export default PostSearchPage;
