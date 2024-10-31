import { headerTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { useLocation } from 'react-router-dom';

const ProfileHeader = () => {
  const { pathname } = useLocation();
  return (
    <section className="w-full h-[3.5rem] flex justify-center items-center">
      <span className="head-3 text-[#464646]">
        {headerTranslation.profile[isEmployer(pathname)]}
      </span>
    </section>
  );
};

export default ProfileHeader;
