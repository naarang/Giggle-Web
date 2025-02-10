import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import CompleteModal from '@/components/Common/CompleteModal';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import LoadingItem from '@/components/Common/LoadingItem';
import AgreeModalInner from '@/components/Employer/Signup/AgreeModalInner';
import AddressStep from '@/components/Information/AddressStep';
import InformationStep from '@/components/Information/InformationStep';
import LanguageStep from '@/components/Information/LanguageStep';
import PolicyViewer from '@/components/Information/PolicyViewer';
import StepIndicator from '@/components/Information/StepIndicator';
import { useGetPolicy, useSignUp } from '@/hooks/api/useAuth';
//import { useSignUp } from '@/hooks/api/useAuth';
import {
  initialUserInfoRequestBody,
  Language,
  TermType,
  UserInfoRequestBody,
} from '@/types/api/users';
import { getTemporaryToken } from '@/utils/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// funnel 패턴으로 구현한 추가정보 입력 페이지. 총 3 step으로 구성
const InformationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfoRequestBody>(
    initialUserInfoRequestBody,
  );
  const [isAgreeModal, setIsAgreeModal] = useState(true);
  const [isPolicyPreview, setIsPolicyPreview] = useState(false);
  const [policy, setPolicy] = useState('');
  const [devIsModal, setDevIsModal] = useState(false);
  const [marketingAllowed, setMarketAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSignUp(() => setDevIsModal(true));
  const { mutate: getPolicy } = useGetPolicy({
    onSuccess: (data) => {
      setPolicy(data.data.content);
      setIsPolicyPreview(true);
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
  const navigate = useNavigate();

  // 다음 step으로 넘어갈 때 호출되며, 각 step에서 입력한 정보를 userInfo에 저장, 다음 step으로 이동한다.
  const handleNext = (newInfo: UserInfoRequestBody) => {
    setUserInfo(newInfo);
    setCurrentStep((prev) => prev + 1);
  };
  // 최종 완료 시 호출, 서버 api 호출 및 완료 modal 표시
  const handleSubmit = (language: Language) => {
    const termTypes = [
      TermType.PERSONAL_SERVICE_TERMS,
      TermType.LOCATION_BASED_TERMS,
      TermType.PRIVACY_POLICY,
    ];
    mutate({
      ...userInfo,
      marketing_allowed: marketingAllowed,
      notification_allowed: false,
      temporary_token: String(getTemporaryToken()),
      language: language,
      term_types: termTypes,
    });
  };
  return (
    <div className="m-auto max-w-[500px] relative h-screen flex flex-col items-center justify-start overflow-y-scroll scrollbar-hide">
      {devIsModal ? (
        <CompleteModal
          title="Registration has been successfully completed"
          content="From now on, you can upload your resume and receive personalized job recommendations"
          onNext={() => navigate('/')}
        />
      ) : (
        <>
          <BaseHeader
            hasBackButton={true}
            hasMenuButton={false}
            title="Information"
            onClickBackButton={() => navigate('/signup')}
          />
          <div className="w-full flex flex-row px-4 py-8 items-center justify-between">
            <div
              className="relative w-full flex items-center justify-start head-2 text-[#1e1926]"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Information
            </div>
            <StepIndicator length={3} currentStep={currentStep} />
          </div>
          <div className="w-full flex justify-center px-4 pt-4">
            {currentStep === 1 && (
              <InformationStep userInfo={userInfo} onNext={handleNext} />
            )}
            {currentStep === 2 && (
              <AddressStep userInfo={userInfo} onNext={handleNext} />
            )}
            {currentStep === 3 && <LanguageStep onNext={handleSubmit} />}
          </div>
        </>
      )}
      {isAgreeModal && (
        <BottomSheetLayout
          hasHandlebar={true}
          isAvailableHidden={false}
          isShowBottomsheet={isAgreeModal}
        >
          <AgreeModalInner
            setMarketingAllowed={(value: boolean) => setMarketAllowed(value)}
            onPolicyPreview={(policy: TermType) => {
              getPolicy(policy);
            }}
            onNext={setIsAgreeModal}
            accountType="USER"
          />
        </BottomSheetLayout>
      )}
      {isPolicyPreview === true && (
        <PolicyViewer
          content={policy}
          onBack={() => setIsPolicyPreview(false)}
        />
      )}
      {isLoading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 overflow-hidden"
          style={{ touchAction: 'none' }}
          onClick={(e) => e.preventDefault()}
        >
          <LoadingItem />
        </div>
      )}
    </div>
  );
};

export default InformationPage;
