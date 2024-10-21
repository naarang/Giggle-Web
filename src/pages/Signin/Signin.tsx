import SigninInputSection from '@/components/Signin/SigninInputSection';
import SigninSocialButtons from '@/components/Signin/SigninSocialButtons';

const Signin = () => {
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center px-7">
      <div className="text-[#1E1926] text-[1.75rem] font-semibold">Sign In</div>
      <SigninInputSection />
      <SigninSocialButtons />
    </div>
  );
};

export default Signin;
