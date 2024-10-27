import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import WorkExperiencePatch from '@/components/WorkExperience/WorkExperiencePatch';
import { buttonTypeKeys } from '@/constants/components';
import useNavigateBack from '@/hooks/useNavigateBack';
import { PostWorkExperienceType } from '@/types/postResume/postWorkExperience';
import { formatDateToDash } from '@/utils/editResume';
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

  // 초기 값에서 수정된 내용이 있는지 확인
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSubmit = () => {
    // 날짜 형식 서버 데이터와 통일
    const formattedData = {
      ...workExperienceData,
      start_date: formatDateToDash(workExperienceData.start_date),
      end_date: formatDateToDash(workExperienceData.end_date),
    };
    if (formattedData) true; //추후 로직 추가

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
          title="Introduction"
        />
        {/* input 영역 */}
        <WorkExperiencePatch
          workExperienceData={workExperienceData}
          setWorkExperienceData={setWorkExperienceData}
        />
      </div>
      <div className="fixed bottom-0 flex gap-2 pb-[2.5rem] px-6 w-full bg-grayGradient">
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

export default PatchWorkExperiencePage;
