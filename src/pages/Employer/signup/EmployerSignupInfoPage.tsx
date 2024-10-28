import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import CompleteModal from '@/components/Common/CompleteModal';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import InformationInputSection from '@/components/Employer/Signup/InformationInputSection';
import {
  EmployerRegistrationRequest,
  initialEmployerRegistration,
} from '@/types/api/employ';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerSignupInfoPage = () => {
  const [newEmployData, setNewEmployData] =
    useState<EmployerRegistrationRequest>(initialEmployerRegistration);
  //const { mutate } = useSignUp();
  const [devIsModal, setDevIsModal] = useState(false);
  const navigate = useNavigate();

  // 최종 완료 시 호출, 서버 api 호출 및 완료 modal 표시
  const handleSubmit = () => {
    //mutate({...userInfo, marketing_allowed: false, notification_allowed: false, temporary_token: "", });
    setDevIsModal(true);
  };
  return (
    <div className="last:pb-[10rem]">
      <BaseHeader
        hasBackButton={false}
        hasMenuButton={true}
        onClickBackButton={() => navigate('/signup')}
      />
      {devIsModal ? (
        <CompleteModal
          title="가입이 성공적으로 완료되었습니다"
          onNext={() => navigate('/')}
        />
      ) : (
        <InformationInputSection
          newEmployData={newEmployData}
          setNewEmployData={setNewEmployData}
        />
      )}
      <BottomButtonPanel>
      <Button
          type="large"
          isBorder={false}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          title="완료"
          onClick={() => {
           //sendRequest({ id: 1, reason: reasonInput });
          }}
        />
      </BottomButtonPanel>
    </div>
  );
};
export default EmployerSignupInfoPage;
