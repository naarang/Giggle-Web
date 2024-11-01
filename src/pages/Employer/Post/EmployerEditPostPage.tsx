import CompleteModal from '@/components/Common/CompleteModal';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import Step1 from '@/components/Employer/PostCreate/Step1';
import Step2 from '@/components/Employer/PostCreate/Step2';
import Step3 from '@/components/Employer/PostCreate/Step3';
import Step4 from '@/components/Employer/PostCreate/Step4';
import Step5 from '@/components/Employer/PostCreate/Step5';
import StepIndicator from '@/components/Information/StepIndicator';
import { useEditPost } from '@/hooks/api/usePost';
import {
  initialJobPostingState,
  JobPostingForm,
} from '@/types/postCreate/postCreate';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const EmployerEditPostPage = () => {
  const location = useLocation();
  const { isEdit } = location.state || {};
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [postInfo, setPostInfo] = useState<JobPostingForm>(
    initialJobPostingState,
  );

  const { mutate: editPost } = useEditPost(); //  공고 수정 시 호출하는 훅
  const [devIsModal, setDevIsModal] = useState(false);

  // 다음 step으로 넘어갈 때 호출되며, 각 step에서 입력한 정보를 userInfo에 저장, 다음 step으로 이동한다.
  const handleNext = (newInfo: JobPostingForm) => {
    setPostInfo(newInfo);
    setCurrentStep((prev) => prev + 1);
  };
  // 최종 완료 시 호출, 서버 api 호출 및 완료 modal 표시
  const handleSubmit = (newPost: FormData) => {
    if (isEdit) {
      editPost({ newPost: newPost, id: Number(id) });
      setDevIsModal(true);
    }
  };
  return (
    <div>
      <BaseHeader hasBackButton hasMenuButton={false} title="공고등록" />
      {devIsModal ? (
        <CompleteModal
          title="공고 등록이 완료되었습니다."
          onNext={() => {}} // 생성한 공고에 대한 공고 상세 페이지로 이동 요망
        />
      ) : (
        <>
          <div className="w-full flex flex-row p-6 items-center justify-between">
            <div className="relative w-full flex items-center justify-start title-1 text-[#1e1926] text-left">
              {isEdit ? "공고수정" : "공고등록"}
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
            {currentStep === 2 && (
              <Step2
                postInfo={postInfo}
                onNext={handleNext}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
            {currentStep === 3 && (
              <Step3
                postInfo={postInfo}
                onNext={handleNext}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
            {currentStep === 4 && (
              <Step4
                postInfo={postInfo}
                onNext={handleNext}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
            {currentStep === 5 && (
              <Step5
                postInfo={postInfo}
                onNext={handleNext}
                onSubmit={(newPost) => handleSubmit(newPost)}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EmployerEditPostPage;
