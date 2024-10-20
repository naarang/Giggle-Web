/*
 *
 * type
 * - signIn
 * - smallRound
 * - smallSquare
 * - applyNow
 * - back
 * - continue
 *
 * button color - css 코드로 전달받음
 * font color - css 코드로 전달받음
 * border color - css 코드로 전달 받음
 *
 */

type buttonType = {
  type: string;
  bgColor: string | null;
  fontColor: string | null;
  borderColor: string | null;
  title: string;
};

const Button = ({
  type,
  bgColor,
  fontColor,
  borderColor,
  title,
}: buttonType) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'signIn':
        return 'w-[327px] h-[52px] flex justify-center items-center rounded-[32px] text-[16px]';
      case 'smallRound':
        return 'w-[89px] h-[40px] flex justify-center items-center rounded-[20px] text-[12px]';
      case 'smallSquare':
        return 'w-[89px] h-[36px] flex justify-center items-center rounded-[8px] text-[12px]';
      case 'applyNow':
        return `w-[327px] h-[52px] flex justify-center items-center rounded-[32px] bg-applyBtn bg-cover bg-center text-[16px] text-[#F4F4F9]`;
      case 'back':
        return 'w-[119px] h-[52px] flex justify-center items-center rounded-[32px] text-[16px]';
      case 'continue':
        return 'w-[200px] h-[52px] flex justify-center items-center rounded-[32px] text-[16px]';
      default:
        return 'w-[327px] h-[52px] flex justify-center items-center rounded-[32px] text-[16px]';
    }
  };

  return (
    <button
      className={`${getButtonStyle()} ${bgColor} ${fontColor} border-solid border-[0.5px] ${borderColor}`}
    >
      {title}
    </button>
  );
};

export default Button;
