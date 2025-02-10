import { ReactNode } from 'react';

type InputLayOutProps = {
  title: string;
  isEssential: boolean;
  isOptional?: boolean; // isOptional 속성 추가
  width?: string; // width 속성 string 전달
  children: ReactNode;
};

const InputLayout = ({
  title,
  children,
  isEssential,
  isOptional,
  width,
}: InputLayOutProps) => {
  return (
    <div>
      <p className={`${width} button-2 text-[#1E1926] px-1 py-[6px]`}>
        {title}
        {isEssential && (
          <span className="text-[#EE4700] body-1 ml-[0.125rem]">*</span>
        )}
        {isOptional && (
          <span className="text-[#9397a1] body-3 pl-1">(optional)</span>
        )}
      </p>
      {children}
    </div>
  );
};
export default InputLayout;
