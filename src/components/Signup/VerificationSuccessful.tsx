import SuccessIcon from '@/assets/icons/Successful.svg?react';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';

interface VerificationSuccessfulProps {
  title: string;
  content: string;
  buttonText: string;
  onNext: () => void;
}

const VerificationSuccessful = ({
  title,
  content,
  buttonText,
  onNext,
}: VerificationSuccessfulProps) => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-4">
      <SuccessIcon />
      <div className="head-2 whitespace-pre-line text-center">{title}</div>
      <p className="body-2 text-text-alternative whitespace-pre-line text-center">
        {content}
      </p>
      <BottomButtonPanel>
        <div className="w-full">
          <Button
            type="large"
            bgColor={'bg-surface-primary'}
            fontColor={'text-text-normal'}
            isBorder={false}
            title={buttonText}
            onClick={onNext}
          />
        </div>
      </BottomButtonPanel>
    </div>
  );
};

export default VerificationSuccessful;
