import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SuccessIcon from '@/assets/icons/Successful.svg?react';
import { signInputTranclation } from '@/constants/translation';
import { checkEmployerPage } from '@/utils/checkUserPage';
import { isEmployer } from '@/utils/signup';

const VerificationSuccessful = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(
        checkEmployerPage(pathname)
          ? '/employer/signup/information'
          : '/information',
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-4">
      <SuccessIcon />
      <div className="head-2">
        {signInputTranclation.successVerify[isEmployer(pathname)]}
      </div>
    </div>
  );
};

export default VerificationSuccessful;
