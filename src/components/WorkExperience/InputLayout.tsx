import { ReactNode } from 'react';

type InputLayOutProps = {
  title: string;
  isEssential: boolean;
  width?: string; // width 속성 string 전달
  children: ReactNode;
};

const InputLayout = ({
  title,
  children,
  isEssential,
  width,
}: InputLayOutProps) => {
  return (
    <div>
      <p className={`${width} body-3 text-[#1E1926] px-1 py-2`}>
        {title}
        {isEssential && (
          <span className="text-[#EE4700] body-1 ml-[0.125rem]">*</span>
        )}
      </p>
      {children}
    </div>
  );
};
export default InputLayout;
