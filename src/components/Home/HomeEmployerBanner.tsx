import PlusIcon from '@/assets/icons/PlusIcon.svg?react';
import { useNavigate } from 'react-router-dom';

const HomeEmployerBanner = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full px-[1.5rem] pb-[2.75rem] bg-[#FEF387]">
      <div className="flex flex-col justify-center items-center gap-[0.5rem] p-[1.5rem] rounded-[1.5rem] bg-cover bg-center bg-[url('/src/assets/images/yellowGradient.png')]">
        <h3 className="head-3 text-[#1E1926] text-center">
          Register your
          <br />
          new announcement
        </h3>
        {/* TODO: 공고 작성 페이지로 이동 필요 */}
        <button
          className="px-[1.5rem] py-[0.5rem] rounded-[1.313rem] bg-[#1B1B1B]"
          onClick={() => navigate(`/employer/post`)}
        >
          <PlusIcon />
        </button>
      </div>
    </section>
  );
};

export default HomeEmployerBanner;
