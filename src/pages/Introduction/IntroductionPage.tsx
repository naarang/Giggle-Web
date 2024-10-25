import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import IntroductionInput from '@/components/Introduction/IntroductionInput';
import { buttonTypeKeys } from '@/constants/components';
import useNavigateBack from '@/hooks/useNavigateBack';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const IntroductionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleBackButtonClick = useNavigateBack();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initialData = location.state?.data || '';
  const [data, setData] = useState<string>(initialData);

  // 입력창을 감싸는 div 클릭 시 textarea에 포커스 설정
  const handleFocusTextArea = () => {
    textareaRef.current?.focus();
    const length = textareaRef.current!.value.length;
    textareaRef.current!.selectionStart = length;
    textareaRef.current!.selectionEnd = length;
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 200) {
      setData(event.target.value);
    }
  };

  const handleSubmit = () => {
    // TODO: API - 7.8 (유학생) 자기소개 수정하기
    // console.log('introduction : ' + data);
    navigate('/profile/manage-resume');
  };

  // textarea에 스크롤이 생기지 않도록 길이 자동 조정
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [data]);

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Introduction"
      />
      <IntroductionInput
        data={data}
        textareaRef={textareaRef}
        handleFocusTextArea={handleFocusTextArea}
        handleChange={handleChange}
      />
      <div className="fixed bottom-0 pb-[3.125rem] px-6 w-full">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          title="Save"
          isBorder={false}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default IntroductionPage;
