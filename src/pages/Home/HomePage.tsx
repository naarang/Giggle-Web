import HomeApplicationList from '@/components/Home/HomeApplicationList';
import HomeEmployerBanner from '@/components/Home/HomeEmployerBanner';
import HomeGuestBanner from '@/components/Home/HomeGuestBanner';
import HomeHeader from '@/components/Home/HomeHeader';
import HomeJobPostingList from '@/components/Home/HomeJobPostingList';
import HomeRecommendPost from '@/components/Home/HomeRecommendPost';

const HomePage = () => {
  return (
    <>
      <HomeHeader />
      {/* 고용주인 경우에 보여주는 배너 */}
      <HomeEmployerBanner />
      {/* 로그인을 안한 경우에 보여주는 배너 */}
      <HomeGuestBanner />
      {/* 로그인을 하고 이력서를 등록하면 보여주는 추천 공고 리스트 */}
      <HomeRecommendPost />
      {/* 현재 진행중인 서류가 있는 경우 */}
      <HomeApplicationList />
      <HomeJobPostingList />
    </>
  );
};

export default HomePage;
