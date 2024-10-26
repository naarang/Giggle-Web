import { ReactNode } from 'react';

type InputLayOutProps = {
  title: string;
  children: ReactNode;
  isEssential?: boolean;
};
const InputLayout = ({ title, children, isEssential }: InputLayOutProps) => {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
        <div className="relative">
          {title}
          {isEssential && (
            <div className="w-1.5 absolute !m-0 top-[0rem] right-[-0.5rem] rounded-full text-[#ff6f61] h-1.5 z-[1]">
              *
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default InputLayout;
