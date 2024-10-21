import { ReactNode } from 'react';

const BottomButtonPanel = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full fixed bottom-0 left-0 bg-gradient-to-b from-white/80 to-white flex flex-row items-start justify-start px-6 pb-[3.125rem] pt-3 box-border text-center text-base text-[#1e1926] font-[Pretendard]">
      <div className="w-full flex items-center justify-center">{children}</div>
    </div>
  );
};

export default BottomButtonPanel;
