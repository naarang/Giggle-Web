import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import CompleteModal from '@/components/Common/CompleteModal';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import AgreeModalInner from '@/components/Employer/Signup/AgreeModalInner';
import InformationInputSection from '@/components/Employer/Signup/InformationInputSection';
import { useSignupEmployer } from '@/hooks/api/useAuth';
import {
  EmployerRegistrationRequestBody,
  initialEmployerRegistration,
} from '@/types/api/employ';
import { isValidEmployerRegistration } from '@/utils/signup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerSignupInfoPage = () => {
  const [newEmployData, setNewEmployData] =
    useState<EmployerRegistrationRequestBody>(initialEmployerRegistration);
  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);
  const [devIsModal, setDevIsModal] = useState(false);
  const [isAgreeModal, setIsAgreeModal] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const { mutate } = useSignupEmployer(() => setDevIsModal(true));
  const navigate = useNavigate();

  useEffect(() => {
    setIsValid(isValidEmployerRegistration(newEmployData));
  }, [newEmployData]);

  // 최종 완료 시 호출, 서버 api 호출 및 완료 modal 표시
  const handleSubmit = () => {
    if (isValidEmployerRegistration(newEmployData)) {
      const formData = new FormData();

      // 이미지 파일이 있는 경우에만 추가
      if (logoFile) {
        formData.append('image', logoFile);
      }

      // JSON 데이터를 Blob으로 변환하여 추가
      formData.append(
        'body',
        new Blob([JSON.stringify(newEmployData)], {
          type: 'application/json',
        }),
      );

      // mutate 호출로 서버에 전송
      mutate(formData);
    }
  };

  return (
    <div className="last:pb-[10rem]">
      <BaseHeader
        hasBackButton={true}
        hasMenuButton={false}
        onClickBackButton={() => navigate('/signup')}
      />
      {devIsModal ? (
        <CompleteModal
          title="가입이 성공적으로 완료되었습니다"
          onNext={() => navigate('/')}
        />
      ) : (
        <InformationInputSection
          newEmployData={newEmployData}
          setNewEmployData={setNewEmployData}
          setLogoFile={(file: File | undefined) => setLogoFile(file)}
        />
      )}
      <BottomButtonPanel>
        {isValid ? (
          <Button
            type="large"
            isBorder={false}
            bgColor="bg-[#FEF387]"
            fontColor="text-[#1E1926]"
            title="완료"
            onClick={() => {
              handleSubmit();
            }}
          />
        ) : (
          <Button
            type="large"
            isBorder={false}
            bgColor="bg-[#F4F4F9]"
            fontColor="text-[#1E1926]"
            title="완료"
          />
        )}
      </BottomButtonPanel>
      {isAgreeModal && (
        <BottomSheetLayout
          hasHandlebar={true}
          isAvailableHidden={false}
          isShowBottomsheet={isAgreeModal}
        >
          <AgreeModalInner
            setMarketingAllowed={(value: boolean) =>
              setNewEmployData({
                ...newEmployData,
                marketing_allowed: value,
              })
            }
            onNext={setIsAgreeModal}
          />
        </BottomSheetLayout>
      )}
    </div>
  );
};
export default EmployerSignupInfoPage;
