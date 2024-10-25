import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import WorkExperiencePost from '@/components/WorkExperience/WorkExperiencePost';
import { buttonTypeKeys } from '@/constants/components';
import useNavigateBack from '@/hooks/useNavigateBack';
import { PostWorkExperienceType } from '@/types/postResume/postWorkExperience';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostWorkExperiencePage = () => {
  const handleBackButtonClick = useNavigateBack();
  const navigate = useNavigate();

  const [workExperienceData, setWorkExperienceData] =
    useState<PostWorkExperienceType>({
      title: '',
      workplace: '',
      start_date: '',
      end_date: '',
      description: '',
    });

  const handleSubmit = () => {
    // TODO: API - 7.5 경력 생성하기
    navigate('/profile/manage-resume');
  };

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Introduction"
      />
      {/* input 컴포넌트 */}
      <WorkExperiencePost
        workExperienceData={workExperienceData}
        setWorkExperienceData={setWorkExperienceData}
      />
      <div className="pb-[3.125rem] px-6 mt-3 w-full">
        {/* post 버튼 */}
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          title="Save"
          isBorder={false}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default PostWorkExperiencePage;
