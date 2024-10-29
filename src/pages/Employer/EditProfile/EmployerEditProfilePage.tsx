import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import EmployerEditInputSection from '@/components/Employer/EditProfile/EmployerEditInputSection';
import {
  useGetOwnerProfile,
  usePatchOwnerProfile,
} from '@/hooks/api/useProfile';
import {
  EmployerProfileDetailResponse,
  EmployerProfileRequestBody,
  initialEmployerProfile,
} from '@/types/api/profile';
import { transformToEmployerProfileRequest } from '@/utils/editProfileData';
import { isValidEmployerProfile } from '@/utils/employerProfile';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerEditProfilePage = () => {
  const navigate = useNavigate();
  const [originalData, setOriginalData] =
    useState<EmployerProfileDetailResponse>();
  const [newEmployData, setNewEmployData] =
    useState<EmployerProfileRequestBody>(initialEmployerProfile);
  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);
  const [isValid, setIsValid] = useState(false);

  // 수정을 위한 Response 데이터
  const { data } = useGetOwnerProfile();
  // 수정하기 훅
  const { mutate } = usePatchOwnerProfile();

  useEffect(() => {
    if (data && data.success) {
      setOriginalData(data.data); // 수정 전 데이터

      // get 타입에서 patch 타입으로 변환
      setNewEmployData(transformToEmployerProfileRequest(data.data)); // 수정 데이터
    }
  }, []);

  useEffect(() => {
    setIsValid(isValidEmployerProfile(newEmployData));
  }, [newEmployData]);

  const handleSubmit = () => {
    if (isValidEmployerProfile(newEmployData)) {
      // 로고 이미지 변경 여부
      if (originalData?.logo_img_url === logoFile) {
        setNewEmployData({ ...newEmployData, is_icon_img_changed: false });
      } else {
        setNewEmployData({ ...newEmployData, is_icon_img_changed: true });
      }
      // patch 훅 호출
      mutate({
        image: logoFile,
        body: {
          ...newEmployData,
        },
      });
    }
  };

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate('/employer/profile')}
        hasMenuButton={false}
        title="회사/점포 정보 수정"
      />
      <EmployerEditInputSection
        newEmployData={newEmployData}
        setNewEmployData={setNewEmployData}
        setLogoFile={(file: File | undefined) => setLogoFile(file)}
      />
      <BottomButtonPanel>
        <Button
          type="large"
          isBorder={false}
          bgColor={isValid ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
          fontColor={isValid ? 'text-[#1E1926]' : 'text-[#1E1926]'}
          title="수정 완료"
          onClick={handleSubmit}
        />
      </BottomButtonPanel>
    </div>
  );
};

export default EmployerEditProfilePage;
