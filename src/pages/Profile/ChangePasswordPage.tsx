import { useState } from 'react';
import { useGetPolicy } from '@/hooks/api/useAuth';
import LoadingItem from '@/components/Common/LoadingItem';
import CurrentPasswordStep from '@/components/Profile/Password/CurrentPasswordStep';
import NewPasswordStep from '@/components/Profile/Password/NewPasswordStep';
import SuccessStep from '@/components/Profile/Password/SuccessStep';

type PasswordFieldType = 'currentPassword' | 'newPassword' | 'confirmPassword';

const ChangePasswordPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const { mutate: getPolicy } = useGetPolicy({
    onSuccess: () => {},
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handlePasswordChange = (field: PasswordFieldType, value: string) => {
    // 값 변경
    switch (field) {
      case 'currentPassword':
        setCurrentPassword(value);
        setPasswordError(null);
        break;
      case 'newPassword':
        setNewPassword(value);
        setNewPasswordError(null);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        setConfirmPasswordError(null);
        break;
    }
  };

  const handleCurrentPasswordSubmit = () => {
    // 비밀번호 확인 api 호출
    // onSuccess
    setCurrentStep(2);
  };

  const handleChangePasswordSubmit = () => {
    // 비밀번호 변경 api 호출
    // onSuccess
    setCurrentStep(3);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CurrentPasswordStep
            password={currentPassword}
            onPasswordChange={(value) =>
              handlePasswordChange('currentPassword', value)
            }
            onSubmit={handleCurrentPasswordSubmit}
            error={passwordError}
          />
        );
      case 2:
        return (
          <NewPasswordStep
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            onNewPasswordChange={(value) =>
              handlePasswordChange('newPassword', value)
            }
            onConfirmPasswordChange={(value) =>
              handlePasswordChange('confirmPassword', value)
            }
            onSubmit={handleChangePasswordSubmit}
            newPasswordError={newPasswordError}
            confirmPasswordError={confirmPasswordError}
          />
        );
      case 3:
        return <SuccessStep />;
    }
  };

  return (
    <>
      {isLoading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 overflow-hidden"
          style={{ touchAction: 'none' }}
          onClick={(e) => e.preventDefault()}
        >
          <LoadingItem />
        </div>
      )}
      {renderStep()}
    </>
  );
};

export default ChangePasswordPage;
