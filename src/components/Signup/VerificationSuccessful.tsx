import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessIcon from '@/assets/icons/Successful.svg?react';

const VerificationSuccessful = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 2초 띄우고 information 화면으로 이동
    const timer = setTimeout(() => {
      navigate('/information');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-4">
      <SuccessIcon />
      <div className="head-2">Verification successful</div>
    </div>
  );
};

export default VerificationSuccessful;
