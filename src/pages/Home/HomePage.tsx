import HomeApplicationList from '@/components/Home/HomeApplicationList';
import HomeEmployerBanner from '@/components/Home/HomeEmployerBanner';
import HomeGuestBanner from '@/components/Home/HomeGuestBanner';
import HomeHeader from '@/components/Home/HomeHeader';
import HomeJobPostingList from '@/components/Home/HomeJobPostingList';
import HomeRecommendPost from '@/components/Home/HomeRecommendPost';
import ChatIcon from '@/assets/icons/ChatIcon.svg?react';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const { account_type } = useUserStore();
  console.log(account_type);

  return (
    <>
      <HomeHeader />
      {/* 고용주인 경우에 보여주는 배너 */}
      {account_type === UserType.OWNER && <HomeEmployerBanner />}
      {/* 로그인을 안한 경우에 보여주는 배너 */}
      {!account_type && <HomeGuestBanner />}
      {account_type === UserType.USER && (
        <>
          {/* 로그인을 하고 이력서를 등록하면 보여주는 추천 공고 리스트 */}
          <HomeRecommendPost />
          {/* 현재 진행중인 서류가 있는 경우 */}
          <HomeApplicationList />
        </>
      )}
      <HomeJobPostingList />
      {/* 유학생인 경우에만 챗봇 표시 */}
      {account_type === UserType.USER && 
      <button
      className="fixed w-[3rem] h-[3rem] flex justify-center items-center rounded-full right-[1.5rem] bottom-[4.75rem] bg-[#FEF387]"
      onClick={() => navigate('/chatbot')}
    >
      <ChatIcon />
    </button>}
    </>
  );
};

export default HomePage;
