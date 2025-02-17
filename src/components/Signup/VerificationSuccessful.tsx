import { useLocation, useNavigate } from 'react-router-dom';
import SuccessIcon from '@/assets/icons/Successful.svg?react';
import { signInputTranclation } from '@/constants/translation';
import { checkEmployerPage } from '@/utils/checkUserPage';
import { isEmployer } from '@/utils/signup';
import BottomButtonPanel from '../Common/BottomButtonPanel';
import Button from '../Common/Button';

const VerificationSuccessful = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-4">
      <SuccessIcon />
      <div className="head-2 whitespace-pre-line text-center">
        {signInputTranclation.successVerify[isEmployer(pathname)]}
      </div>
      <p className="body-2 text-text-alternative whitespace-pre-line text-center">
        {signInputTranclation.successVerifyContent[isEmployer(pathname)]}
      </p>
      <BottomButtonPanel>
        <div className="w-full">
          <Button
            type="large"
            bgColor={'bg-surface-primary'}
            fontColor={'text-text-normal'}
            isBorder={false}
            title={signInputTranclation.successVerifyBtn[isEmployer(pathname)]}
            onClick={() => {
              navigate(
                checkEmployerPage(pathname)
                  ? '/employer/signup/information'
                  : '/information',
              );
            }}
          />
        </div>
      </BottomButtonPanel>
    </div>
  );
};

export default VerificationSuccessful;
