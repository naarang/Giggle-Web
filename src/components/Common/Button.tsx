import CallIcon from '@/assets/icons/CallIcon.svg?react';
import { buttonTypeKeys, buttonTypeUnion } from '@/constants/components';

type buttonProps = {
  type: buttonTypeUnion; // 정의된 버튼을 5가지 타입으로 나누었습니다.
  bgColor: string; // 버튼의 배경색
  fontColor: string; // 버튼 글자색
  isCallIcon?: boolean; // 전화기 아이콘 여부 (optional)
  isBorder: boolean; // 버튼 테두리 여부
  title: string; // 버튼에 포함되는 글자
  onClick?: () => void; // 클릭 이벤트 핸들러 (optional)
};

const Button = ({
  type,
  bgColor,
  fontColor,
  isCallIcon = false, // 기본값 false 설정
  isBorder,
  title,
  onClick,
}: buttonProps) => {
  const getButtonStyle = () => {
    switch (type) {
      case buttonTypeKeys.LARGE:
        return 'w-[327px] h-[52px] flex justify-center items-center rounded-[32px] text-[16px]';
      case buttonTypeKeys.SMALL:
        return 'w-[89px] h-[40px] flex justify-center items-center rounded-[20px] text-[12px]';
      case buttonTypeKeys.APPLY:
        return `w-[327px] h-[52px] flex justify-center items-center rounded-[32px] bg-applyBtn bg-cover bg-center text-[16px] text-[#F4F4F9]`;
      case buttonTypeKeys.BACK:
        return 'w-[119px] h-[52px] flex justify-center items-center rounded-[32px] text-[16px]';
      case buttonTypeKeys.CONTINUE:
        return 'w-[200px] h-[52px] flex justify-center items-center rounded-[32px] text-[16px]';
      default: // 기본값으로 large type 적용
        return 'w-[327px] h-[52px] flex justify-center items-center rounded-[32px] text-[16px]';
    }
  };

  return (
    <button
      className={`${getButtonStyle()} ${bgColor} ${fontColor}  ${isBorder && 'border-solid border-[0.5px] border-[#1E1926]'}`}
      onClick={onClick}
    >
      {isCallIcon ? (
        <div className="flex justify-center items-center gap-1.5">
          <CallIcon />
          <div className="text-semibold">{title}</div>
        </div>
      ) : (
        <div className="text-semibold">{title}</div>
      )}
    </button>
  );
};

export default Button;
