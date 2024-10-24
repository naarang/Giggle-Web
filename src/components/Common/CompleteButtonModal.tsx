import CheckIconLarge from '@/assets/icons/checkIconLarge.svg?react';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import { useEffect } from 'react';

type CompleteButtonModalProps = {
  title: string;
  content: string;
  buttonContent: string;
  onClick: () => void;
};

const CompleteButtonModal = ({
  title,
  content,
  buttonContent,
  onClick,
}: CompleteButtonModalProps) => {
  // 모달 열림 상태에 따라 body 스크롤 제어
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen px-14 flex flex-col gap-4 items-center justify-center text-center bg-white">
      <CheckIconLarge />
      <div className="head-2">{title}</div>
      <div className="body-2">{content}</div>
      <Button
        type={buttonTypeKeys.LARGE}
        bgColor="bg-[#FEF387]"
        fontColor="text-[#1E1926]"
        isBorder={false}
        title={buttonContent}
        onClick={onClick}
      />
    </div>
  );
};

export default CompleteButtonModal;
