import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import EducationPost from '@/components/SetEducation/EducationPost';
import { buttonTypeKeys } from '@/constants/components';
import useNavigateBack from '@/hooks/useNavigateBack';
import { PostEducationType } from '@/types/postResume/postEducation';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatchEducationPage = () => {
  const initialData: PostEducationType = {
    education_level: 'BACHELOR', // Enum(BACHELOR, ASSOCIATE, HIGHSCHOOL),
    school_id: 1,
    major: 'Department of Computer Engineering',
    gpa: 3.5,
    start_date: '2021-03-01', // yyyy-MM-dd
    end_date: '2026-03-01', // yyyy-MM-dd
    grade: 4,
  };

  const handleBackButtonClick = useNavigateBack();
  const navigate = useNavigate();

  const [educationData, setEducationData] =
    useState<PostEducationType>(initialData);
  // 초기 값에서 수정된 내용이 있는지 확인
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSubmit = () => {
    // TODO: API - 7.6 학력 생성하기
    navigate('/profile/manage-resume');
  };

  useEffect(() => {
    // 편집 중인지 여부 확인
    if (educationData == initialData) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [educationData]);

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Introduction"
      />
      {/* input 컴포넌트 */}
      <EducationPost
        educationData={educationData}
        setEducationData={setEducationData}
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

export default PatchEducationPage;
