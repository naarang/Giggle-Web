import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import EducationPatch from '@/components/SetEducation/EducationPatch';
import { buttonTypeKeys } from '@/constants/components';
import { GetEducationData } from '@/constants/manageResume';
import useNavigateBack from '@/hooks/useNavigateBack';
import {
  GetEducationType,
  PostEducationType,
} from '@/types/postResume/postEducation';
import { transformToPatchEducation } from '@/utils/editResume';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatchEducationPage = () => {
  const handleBackButtonClick = useNavigateBack();
  const navigate = useNavigate();
  const [educationData, setEducationData] = useState<PostEducationType>({
    education_level: 'BACHELOR',
    school_id: 0,
    major: '',
    gpa: 0,
    start_date: '',
    end_date: '',
    grade: 2,
  });

  // get form의 학력 데이터
  const [fetchData, setFetchData] = useState<GetEducationType>();

  // reset 버튼을 대비하여 patch form 의 초기 데이터를 저장하는 상태
  const [initialData, setInitialData] = useState<PostEducationType>();

  // 초기 값에서 수정된 내용이 있는지 확인
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSubmit = () => {
    // TODO: API - 7.6 학력 생성하기
    navigate('/profile/manage-resume');
  };

  const handleReset = () => {
    // Reset 버튼 클릭 시 초기 데이터로 되돌리기
    if (initialData) setEducationData(initialData);
  };

  // TODO: API - 7.3 학력 상세 조회하기
  // Get API 연결
  useEffect(() => {
    const fetchDataFromApi = async () => {
      const data = GetEducationData;
      setFetchData(data);

      // patch 타입 initialData 설정
      const transformedData = transformToPatchEducation(data);
      setInitialData(transformedData);
    };

    fetchDataFromApi();
  }, []);

  // initialData가 설정된 후에 educationData를 설정
  useEffect(() => {
    if (initialData) {
      setEducationData(initialData);
    }
  }, [initialData]);

  // 편집 중인지 여부 확인
  useEffect(() => {
    if (educationData == initialData) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [educationData]);

  return (
    <>
      {fetchData ? (
        <>
          <div className="mb-24">
            <BaseHeader
              hasBackButton={true}
              onClickBackButton={handleBackButtonClick}
              hasMenuButton={false}
              title="Education"
            />
            <EducationPatch
              educationData={educationData}
              setEducationData={setEducationData}
              schoolData={fetchData.school}
            />
          </div>
          <div className="fixed bottom-0 flex gap-2 pb-[2.5rem] px-6 w-full bg-grayGradient">
            <Button
              type={buttonTypeKeys.LARGE}
              bgColor="bg-[#F4F4F9]"
              fontColor="text-[#BDBDBD]"
              title="Reset"
              isBorder={false}
              onClick={isEditing ? handleReset : undefined}
            />
            <Button
              type={buttonTypeKeys.LARGE}
              bgColor={isEditing ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
              fontColor={isEditing ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
              title="Save"
              isBorder={false}
              onClick={isEditing ? handleSubmit : undefined}
            />
          </div>
        </>
      ) : (
        <div>로딩 중</div>
      )}
    </>
  );
};

export default PatchEducationPage;
