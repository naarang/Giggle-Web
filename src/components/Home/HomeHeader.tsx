import AlarmIcon from '@/assets/icons/Home/AlarmIcon.svg?react';
import { useNavigate } from 'react-router-dom';

const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full pt-[3.125rem] pb-[1rem] px-[1.5rem] bg-[#FEF387]">
      <p className="pb-[0.375rem] body-2 text-[#37383C9C]">Welcome!</p>
      <div className="w-full flex">
        <h1 className="flex-1 title-1 text-[#0A0909]">
          Find your <br />
          perfect job
        </h1>
        {/* TODO: 로그인 시에만 표시하기 */}
        <button
          className="w-[2rem] h-[2rem] flex justify-center items-center relative bg-[#FFFAEDCC] rounded-[1.25rem]"
          onClick={() => navigate('/alarm')}
        >
          <AlarmIcon />
          {/* TODO: 알람이 있을 때만 표시하기 */}
          <div className="absolute top-[0.3rem] right-[0.4rem] w-[0.438rem] h-[0.438rem] rounded-full bg-[#FF6F61]"></div>
        </button>
      </div>
    </section>
  );
};

export default HomeHeader;
