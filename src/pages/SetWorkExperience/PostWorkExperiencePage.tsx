import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import WorkExperiencePost from '@/components/WorkExperience/WorkExperiencePost';
import { buttonTypeKeys } from '@/constants/components';
import useNavigateBack from '@/hooks/useNavigateBack';
import { PostWorkExperienceType } from '@/types/postResume/postWorkExperience';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostWorkExperiencePage = () => {
  const initialData = {
    title: '',
    workplace: '',
    start_date: '',
    end_date: '',
    description: '',
  };

  const handleBackButtonClick = useNavigateBack();
  const navigate = useNavigate();

  const [workExperienceData, setWorkExperienceData] =
    useState<PostWorkExperienceType>(initialData);
  // 초기 값에서 수정된 내용이 있는지 확인
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSubmit = () => {
    // TODO: API - 7.5 경력 생성하기
    navigate('/profile/manage-resume');
  };

  useEffect(() => {
    // 편집 중인지 여부 확인
    if (workExperienceData == initialData) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [workExperienceData]);

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
          bgColor={isEditing ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
          fontColor={isEditing ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
          title="Save"
          isBorder={false}
          onClick={isEditing ? handleSubmit : undefined}
        />
      </div>
    </div>
  );
};

export default PostWorkExperiencePage;
