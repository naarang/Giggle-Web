import Input from '@/components/Common/Input';
import { useState } from 'react';

const TestPage = () => {
  const [input, setInput] = useState('');
  return (
    <>
      홈 페이지임
      {input}
      <div className="w-[500px]">
        <Input
          inputType="INPUT"
          placeholder="값을 입력해주세요"
          onChange={setInput}
          canDelete={true}
        />
      </div>
    </>
  );
};

export default TestPage;
