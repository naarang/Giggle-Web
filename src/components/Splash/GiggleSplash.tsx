import GiggleIcon from '@/assets/icons/GiggleSplash.svg?react';
import Button from '../Common/Button';

const GiggleSplash = () => {
  return (
    <div className="relative w-[100vw] h-[100vh] bg-[#FEF387] flex flex-col justify-center items-center">
      <GiggleIcon />
      <div className="fixed bottom-[32%] text-[1.5rem] font-semibold">
        Let’s giggle
      </div>
      <div className="fixed bottom-[22%]">
        <Button
          type="large"
          bgColor="bg-[#1E1926]"
          fontColor="text-[#FEF387]"
          isBorder={false}
          title="Continue"
        />
      </div>
    </div>
  );
};

export default GiggleSplash;
