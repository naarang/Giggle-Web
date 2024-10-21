import React, { useState } from 'react';
import Input from '../Common/Input';
import Button from '../Common/Button';

const SigninInputSection = () => {
  const [idValue, setIdValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

  const handleIdChange = (value: string) => {
    setIdValue(value);
  };
  const handlePasswordChange = (value: string) => {
    setPasswordValue(value);
  };
  const handleSubmit = () => {
    console.log('Sign In : ' + idValue, passwordValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        <div>
          <p className="py-2 px-1 text-sm font-normal text-[#171719]">ID</p>
          <Input
            inputType="TEXT"
            placeholder="Enter ID"
            value={idValue}
            onChange={handleIdChange}
            canDelete={false}
          />
        </div>
        <div>
          <p className="py-2 px-1 text-sm font-normal text-[#171719]">
            Password
          </p>
          <Input
            inputType="PASSWORD"
            placeholder="Enter password"
            value={passwordValue}
            onChange={handlePasswordChange}
            canDelete={false}
            isInvalid={true}
          />
        </div>
        <button className="w-full text-end text-[#1E1926] text-xs font-normal">
          Forgot Password?
        </button>
      </div>
      <div className="py-6 flex flex-col items-center gap-2">
        <Button
          type="large"
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          isBorder={false}
          title="Sign In"
          onClick={handleSubmit}
        />
        <div className="w-full flex items-center justify-center gap-2">
          <p className="text-[#7D8A95] text-sm font-normal">
            Don't have an account?
          </p>
          <button className="text-[#1E1926] text-sm font-semibold">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninInputSection;
