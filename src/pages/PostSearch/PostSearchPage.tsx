import TextFieldHeader from '@/components/Common/Header/TextFieldHeader';
import PostSearchFilterList from '@/components/PostSearch/PostSearchFilterList';
import PostSearchResult from '@/components/PostSearch/PostSearchResult';
import { usePostSearchStore } from '@/store/postSearch';
import { useNavigate } from 'react-router-dom';

const PostSearchPage = () => {
  const { searchText, updateSearchText } = usePostSearchStore();

  const navigate = useNavigate();
  // TODO: 여기서 검색어, 검색 필터 모두 전역변수로 관리하기
  const onClickSearch = (text: string) => {
    updateSearchText(text);
    // TODO : 검색 api 불러오기
  };

  return (
    <>
      <TextFieldHeader
        onClickBackButton={() => navigate('/')}
        onClickSearchButton={onClickSearch}
        placeholder="Search for job posting name"
        initialValue={searchText}
      />
      <PostSearchFilterList />
      <PostSearchResult />
    </>
  );
};

export default PostSearchPage;
