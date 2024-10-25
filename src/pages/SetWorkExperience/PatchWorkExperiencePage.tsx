import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import WorkExperiencePatch from '@/components/WorkExperience/WorkExperiencePatch';
import { buttonTypeKeys } from '@/constants/components';
import useNavigateBack from '@/hooks/useNavigateBack';
import { PostWorkExperienceType } from '@/types/postResume/postWorkExperience';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatchWorkExperiencePage = () => {
  const handleBackButtonClick = useNavigateBack();
  const navigate = useNavigate();

  // reset 버튼을 대비하여 초기 데이터를 저장하는 상태
  const [initialData, setInitialData] = useState<PostWorkExperienceType>({
    title: '',
    workplace: '',
    start_date: '',
    end_date: '',
    description: '',
  });

  const [workExperienceData, setWorkExperienceData] =
    useState<PostWorkExperienceType>(initialData);

  const handleSubmit = () => {
    // TODO: API - 7.5 경력 생성하기
    navigate('/profile/manage-resume');
  };

  const handleReset = () => {
    // Reset 버튼 클릭 시 초기 데이터로 되돌리기
    setWorkExperienceData(initialData);
  };

  useEffect(() => {
    // TODO: API - 7.9 (유학생) 경력 수정하기
    const fetchData = {
      title: 'Restaurant Work',
      workplace: 'Some Restaurant',
      start_date: '2021-03-01',
      end_date: '2023-05-15',
      description: 'Task1, Task2...',
    };

    setWorkExperienceData(fetchData);
    setInitialData(fetchData);
  }, []);

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Introduction"
      />
      {/* input 영역 */}
      <WorkExperiencePatch
        workExperienceData={workExperienceData}
        setWorkExperienceData={setWorkExperienceData}
      />
      <div className="pb-[3.125rem] px-6 mt-3 w-full flex gap-2">
        {/* 리셋 버튼 */}
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#F4F4F9]"
          fontColor="text-[#BDBDBD]"
          title="Reset"
          isBorder={false}
          onClick={handleReset}
        />
        {/* patch 버튼 */}
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

export default PatchWorkExperiencePage;
