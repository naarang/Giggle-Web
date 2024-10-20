import Button from '@/components/Common/Button';
import SubHeader from '@/components/SubHeader';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Button
        type="signIn"
        bgColor="bg-[#FEF387]"
        fontColor="text-[#1E1926]"
        borderColor="border-none"
        title="Sign In"
      />
      <Button
        type="smallRound"
        bgColor="bg-[#F3F3FA]"
        fontColor="text-[#1E1926]"
        borderColor="border-[#C3BDE4]"
        title="btn_sm"
      />
      <Button
        type="smallSquare"
        bgColor=""
        fontColor="text-[#1E1926]"
        borderColor="border-[#1E1926]"
        title="btn_sm"
      />
      <Button
        type="applyNow"
        bgColor=""
        fontColor=""
        borderColor=""
        title="Apply Now"
      />
      <div className="flex bg-black">
        <Button
          type="back"
          bgColor="bg-grayGradient"
          fontColor="text-[#1E1926]"
          borderColor="border-none"
          title="Back"
        />
        <Button
          type="continue"
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          borderColor="border-none"
          title="Continue"
        />
      </div>
      <SubHeader type="normal" placeHolder="서브헤더" />
    </div>
  );
};

export default HomePage;
