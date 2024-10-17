/*
 *
 * type
 * - SignIn
 * - SmallRound
 * - SmallSquare
 * - ApplyNow
 * - Back
 * - Continue
 *
 * button color - css 코드로 전달받음
 * - bgYellow
 * - bgGgray
 * - bgBlack
 * - bgWhite
 *
 * font color - css 코드로 전달받음
 * - textYellow
 * - textGray
 * - testBlack
 * - textWhite
 *
 */

type buttonType = {
  type: string;
  bgColor: string;
  fontColor: string;
};

const Button = ({ type, bgColor, fontColor }: buttonType) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'SignIn':
        return 'w-[327px] h-[52px] flex justify-center items-center rounded-[32px] text-[16px]';
      case 'SmallRound':
        return 'w-[89px0 h-[40px] flex justify-center items-center rounded-[20px] text-[12px]';
      case 'SmallSquare':
        return 'w-[89px0 h-[36px] flex justify-center items-center rounded-[8px] text-[12px]';
      case 'ApplyNow':
        return 'w-[327px] h-[52px] flex justify-center items-center rounded-[32px] bg-blue text-[16px] text-SecondaryGrey';
      case 'Back':
        return 'w-[119px] h-[52px] flex justify-center items-center rounded-[32px] text-[16px]';
      case 'Continue':
        return 'w-[200px] h-[52px] flex justify-center items-center rounded-[32px] text-[16px]';
      default:
        return 'w-[327px] h-[52px] flex justify-center items-center rounded-[32px] text-[16px]';
    }
  };

  return (
    <button className={`${getButtonStyle()} ${bgColor} ${fontColor}`}>
      Button
    </button>
  );
};

export default Button;
