import BackButtonIcon from '@/assets/icons/BackButtonIcon.svg?react';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    if (window.history.length > 1) {
      // 직전 히스토리가 있으면 뒤로 가기
      navigate(-1);
    } else {
      // 직전 히스토리가 없으면 홈으로 이동
      navigate('/');
    }
  };

  return (
    <section className="relative w-full h-[3.5rem] py-[0.5rem] flex justify-center items-center bg-[rgba(255,255,255,0.7)]">
      <button
        className="absolute left-3 p-[0.5rem] rounded-[0.75rem] border border-solid border-[#ECECEC]"
        onClick={handleBackButtonClick}
      >
        <BackButtonIcon />
      </button>

      <span className="head-3 text-[#464646]">Profile</span>
    </section>
  );
};

export default ProfileHeader;
