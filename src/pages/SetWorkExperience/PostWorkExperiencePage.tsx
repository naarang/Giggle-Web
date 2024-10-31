import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import WorkExperiencePost from '@/components/WorkExperience/WorkExperiencePost';
import { buttonTypeKeys } from '@/constants/components';
import { usePostWorkExperience } from '@/hooks/api/useResume';
import useNavigateBack from '@/hooks/useNavigateBack';
import { WorkExperienctRequest } from '@/types/api/resumes';
import { useEffect, useState } from 'react';

const PostWorkExperiencePage = () => {
  const { mutate } = usePostWorkExperience();
  const handleBackButtonClick = useNavigateBack();

  const initialData = {
    title: '',
    workplace: '',
    start_date: '',
    end_date: '',
    description: '',
  };

  const [workExperienceData, setWorkExperienceData] =
    useState<WorkExperienctRequest>(initialData);
  // 초기 값에서 수정된 내용이 있는지 확인
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSubmit = () => {
    // API - 7.5 경력 생성하기
    mutate(workExperienceData);
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
      <div className="mb-24">
        <BaseHeader
          hasBackButton={true}
          onClickBackButton={handleBackButtonClick}
          hasMenuButton={false}
          title="Work Experience"
        />
        {/* input 컴포넌트 */}
        <WorkExperiencePost
          workExperienceData={workExperienceData}
          setWorkExperienceData={setWorkExperienceData}
        />
      </div>
      <div className="pb-[2.5rem] px-6 w-full fixed bottom-0 bg-grayGradient">
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
