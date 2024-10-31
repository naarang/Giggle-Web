import { useState, useEffect } from 'react';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import Button from '@/components/Common/Button';
import EducationPost from '@/components/SetEducation/EducationPost';
import { buttonTypeKeys } from '@/constants/components';
import useNavigateBack from '@/hooks/useNavigateBack';
import {
  InitailEducationType,
  InitialEducationData,
} from '@/types/postResume/postEducation';
import { usePostEducation } from '@/hooks/api/useResume';
import { educationDataValidation } from '@/utils/editResume';
import { EducationRequest } from '@/types/api/resumes';

const PostEducationPage = () => {
  const { mutate } = usePostEducation();

  const handleBackButtonClick = useNavigateBack();
  const [educationData, setEducationData] =
    useState<InitailEducationType>(InitialEducationData);
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleSubmit = () => {
    // 유효성 검사
    if (!educationDataValidation(educationData)) return;
    // API - 7.6 학력 생성하기
    const formattedEducationData = {
      ...educationData,
      gpa: educationData.gpa ? parseFloat(String(educationData.gpa)) : 0, // gpa가 없을 경우 기본값 0 할당
      grade: educationData.grade ? Number(educationData.grade) : 0, // grade가 없을 경우 기본값 0 할당
    };

    mutate(formattedEducationData as EducationRequest);
  };

  useEffect(() => {
    setIsValid(educationDataValidation(educationData));
    console.log(educationData);
  }, [educationData]);

  return (
    <>
      <div className="mb-24">
        <BaseHeader
          hasBackButton={true}
          onClickBackButton={handleBackButtonClick}
          hasMenuButton={false}
          title="Education"
        />
        <EducationPost
          educationData={educationData}
          setEducationData={setEducationData}
        />
      </div>
      <div className="pb-[2.5rem] px-6 w-full fixed bottom-0 bg-grayGradient">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={isValid ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
          fontColor={isValid ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
          title="Save"
          isBorder={false}
          onClick={isValid ? handleSubmit : undefined}
        />
      </div>
    </>
  );
};

export default PostEducationPage;
