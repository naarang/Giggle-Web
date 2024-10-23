import GoogleIcon from '@/assets/icons/Google.svg?react';
import AppleIcon from '@/assets/icons/Apple.svg?react';
import FacebookIcon from '@/assets/icons/Facebook.svg?react';
import Divider from '@/assets/icons/DividerLine.svg?react';

const SigninSocialButtons = () => {
  const iconsMap = [
    {
      svg: GoogleIcon,
      url: '/', // 추후 변경
    },
    {
      svg: AppleIcon,
      url: '/', // 추후 변경
    },
    {
      svg: FacebookIcon,
      url: '/', // 추후 변경
    },
  ];
  return (
    <div className="flex flex-col gap-3 pt-3">
      <div className="flex items-center justify-center gap-4 text-[#7D8A95] text-sm">
        <Divider />
        <p>Or</p>
        <Divider />
      </div>
      <div className="flex justify-center gap-6">
        {iconsMap.map((icon, index) => {
          const IconComponent = icon.svg;
          return (
            <div
              key={index}
              className="flex justify-center items-center w-[3.5rem] h-[3.5rem] bg-[#F4F4F6] rounded-full"
            >
              <IconComponent />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SigninSocialButtons;
