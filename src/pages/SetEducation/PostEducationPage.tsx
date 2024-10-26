import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import Button from '@/components/Common/Button';
import EducationPost from '@/components/SetEducation/EducationPost';
import { buttonTypeKeys } from '@/constants/components';
import useNavigateBack from '@/hooks/useNavigateBack';
import { InitailEducationType } from '@/types/postResume/postEducation';
import { formatGpa, isPostEducationType } from '@/utils/introduction';

// input 기본값 설정
const InitailEducation = (): InitailEducationType => ({
  education_level: '',
  school_id: 0,
  major: '',
  gpa: 0.0,
  start_date: '',
  end_date: '',
  grade: 0,
});

const PostEducationPage = () => {
  const handleBackButtonClick = useNavigateBack();
  const navigate = useNavigate();
  const [educationData, setEducationData] =
    useState<InitailEducationType>(InitailEducation());
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleSubmit = () => {
    // TODO: API - 7.6 학력 생성하기
    navigate('/profile/manage-resume');
  };

  useEffect(() => {
    setIsValid(isPostEducationType(educationData));
    console.log(educationData);
  }, [educationData]);

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Introduction"
      />
      <EducationPost
        educationData={educationData}
        setEducationData={setEducationData}
      />
      <div className="pb-[3.125rem] px-6 mt-3 w-full">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={isValid ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
          fontColor={isValid ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
          title="Save"
          isBorder={false}
          onClick={isValid ? handleSubmit : undefined}
        />
      </div>
    </div>
  );
};

export default PostEducationPage;
