import CheckIcon from '@/assets/icons/CheckOfBoxIcon.svg?react';
import ArrowIcon from '@/assets/icons/RightArrowIcon.svg?react';
import Button from '@/components/Common/Button';
import { Dispatch, SetStateAction, useState } from 'react';

type AgreeModalInnerProps = {
  setMarketingAllowed: (value: boolean) => void;
  onNext: Dispatch<SetStateAction<boolean>>;
};

const AgreeModalInner = ({
  setMarketingAllowed,
  onNext,
}: AgreeModalInnerProps) => {
  const [essentialAgreeList, setEssentialAgreeList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const handleCheckboxChange = (index: number) => {
    setEssentialAgreeList((prev) => {
      const newList = [...prev];
      newList[index] = !newList[index];
      return newList;
    });
  };
  const handleNext = () => {
    setMarketingAllowed(essentialAgreeList[3]);
    onNext(false);
  };
  return (
    <div className="w-full flex flex-col items-center justify-start gap-[2.5rem] text-left body-1">
      <div className="relative w-full flex flex-col items-start justify-start gap-y-6 text-left text-[#33384b] head-2">
        <div className="w-full flex flex-col items-start justify-start px-1.5">
          <div className="w-full flex items-center ">약관동의*</div>
        </div>
        <div className="w-full border-b border-[#F4F4F6]"></div>
      </div>
      <div className="w-full flex flex-col items-start justify-start gap-6 text-left body-2">
        <div className="w-full relative flex flex-col items-start justify-center gap-2 pb-2 text-left body-1 border-b border-[#F4F4F6]">
          <div className="flex items-start justify-center gap-3">
            <div className="flex items-center justify-start py-0.5">
              <div
                className={`w-6 h-6 relative flex items-center justify-center border ${essentialAgreeList.includes(false) ? 'bg-white' : 'bg-[#1e1926]'} border-[#F4F4F9]`}
                onClick={() => {
                  setEssentialAgreeList(
                    essentialAgreeList.includes(false)
                      ? [true, true, true, true]
                      : [false, false, false, false],
                  );
                }}
              >
                <CheckIcon />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <div className="w-full flex items-center">전체동의</div>
              <div className="w-full body-3 text-[#bdbdbd] flex items-center">
                선택항목 포함 모든 약관에 동의합니다.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-4 text-left body-2">
          <div className="w-full flex items-center justify-center gap-3">
            <div className="flex items-center justify-start py-0.5">
              <div
                className={`w-6 h-6 relative flex items-center justify-center border ${essentialAgreeList[0] ? 'bg-[#1e1926]' : 'bg-white'} border-[#F4F4F9]`}
                onClick={() => handleCheckboxChange(0)}
              >
                <CheckIcon />
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-1">
              <div className="w-full flex items-center">
                (필수) 서비스 이용약관동의
              </div>
              <ArrowIcon />
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-3">
            <div className="flex items-center justify-start py-0.5">
              <div
                className={`w-6 h-6 relative flex items-center justify-center border ${essentialAgreeList[1] ? 'bg-[#1e1926]' : 'bg-white'} border-[#F4F4F9]`}
                onClick={() => handleCheckboxChange(1)}
              >
                <CheckIcon />
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-1">
              <div className="w-full flex items-center">
                (필수) 개인정보 수집 및 이용 동의
              </div>
              <ArrowIcon />
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-3">
            <div className="flex items-center justify-start py-0.5">
              <div
                className={`w-6 h-6 relative flex items-center justify-center border ${essentialAgreeList[2] ? 'bg-[#1e1926]' : 'bg-white'} border-[#F4F4F9]`}
                onClick={() => handleCheckboxChange(2)}
              >
                <CheckIcon />
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-1">
              <div className="w-full flex items-center">
                (필수) 위치정보 이용동의
              </div>
              <ArrowIcon />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-3">
          <div className="w-full flex items-center justify-center gap-3">
            <div className="flex items-center justify-start py-0.5">
              <div
                className={`w-6 h-6 relative flex items-center justify-center border ${essentialAgreeList[3] ? 'bg-[#1e1926]' : 'bg-white'} border-[#F4F4F9]`}
                onClick={() => handleCheckboxChange(3)}
              >
                <CheckIcon />
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-1">
              <div className="w-full flex items-center">
                (선택) 마케팅 이용동의
              </div>
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
      {essentialAgreeList.slice(0, 3).includes(false) ? (
        <Button
          type="large"
          bgColor="bg-[#F4F4F9]"
          fontColor=""
          isBorder={false}
          title="Agree"
        />
      ) : (
        <Button
          type="large"
          bgColor="bg-[#fef387]"
          fontColor=""
          isBorder={false}
          title="Agree"
          onClick={handleNext}
        />
      )}
    </div>
  );
};

export default AgreeModalInner;
