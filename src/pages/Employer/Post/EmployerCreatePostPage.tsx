import CompleteModal from '@/components/Common/CompleteModal';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import Step1 from '@/components/Employer/PostCreate/Step1';
import StepIndicator from '@/components/Information/StepIndicator';
import { useCreatePost } from '@/hooks/api/usePost';
import {
  initialJobPostingState,
  JobPostingForm,
} from '@/types/postCreate/postCreate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerCreatePostPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [postInfo, setPostInfo] = useState<JobPostingForm>(
    initialJobPostingState,
  );
  const { mutate } = useCreatePost();
  const [devIsModal, setDevIsModal] = useState(false);
  const navigate = useNavigate();

  // 다음 step으로 넘어갈 때 호출되며, 각 step에서 입력한 정보를 userInfo에 저장, 다음 step으로 이동한다.
  const handleNext = (newInfo: JobPostingForm) => {
    setPostInfo(newInfo);
    setCurrentStep((prev) => prev + 1);
  };
  // 최종 완료 시 호출, 서버 api 호출 및 완료 modal 표시
  const handleSubmit = () => {
    mutate({
      ...postInfo,
    });
    setDevIsModal(true);
  };
  return (
    <div>
      <BaseHeader hasBackButton hasMenuButton title="공고등록" />
      {devIsModal ? (
        <CompleteModal
          title="공고 등록이 완료되었습니다."
          content="From now on, you can upload your resume and receive personalized job recommendations"
          onNext={() => navigate('/')} // 생성한 공고에 대한 공고 상세 페이지로 이동 요망
        />
      ) : (
        <>
          <div className="w-full flex flex-row p-6 items-center justify-between">
            <div
              className="relative w-full flex items-center justify-start title-1 text-[#1e1926] text-left"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              공고등록
            </div>
            <StepIndicator
              length={5}
              currentStep={currentStep}
              mainColor="#1E1926"
            />
          </div>
          <div className="w-full flex justify-center px-6">
            {currentStep === 1 && (
              <Step1 postInfo={postInfo} onNext={handleNext} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EmployerCreatePostPage;
