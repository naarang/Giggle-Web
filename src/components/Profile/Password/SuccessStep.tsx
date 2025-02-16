import { useUserStore } from '@/store/user';
import { useNavigate } from 'react-router-dom';
import { UserType } from '@/constants/user';
import {
  profileTranslation,
  signInputTranclation,
} from '@/constants/translation';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import CompleteModal from '@/components/Common/CompleteModal';

const SuccessStep = () => {
  const { account_type } = useUserStore();
  const userLanguage = account_type === UserType.USER ? 'en' : 'ko';
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-full min-h-[100vh]">
        <CompleteModal
          title={profileTranslation.completeTitle[userLanguage]}
          content={profileTranslation.completeContent[userLanguage]}
        />
        <BottomButtonPanel>
          <div className="w-full">
            <Button
              type="large"
              bgColor={
                'bg-surface-primary'
              }
              fontColor={
                'text-text-normal'
              }
              isBorder={false}
              title={signInputTranclation.continue[userLanguage]}
              onClick={() => navigate('/')}
            />
          </div>
        </BottomButtonPanel>
      </div>
    </>
  );
};

export default SuccessStep;
