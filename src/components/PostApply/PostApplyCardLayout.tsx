import PersonIcon from '@/assets/icons/PersonIcon.svg?react';
import { ReactNode } from 'react';

type PostApplyCardLayoutProps = {
  title: string;
  children: ReactNode;
};

const PostApplyCardLayout = ({ title, children }: PostApplyCardLayoutProps) => {
  return (
    <div className="flex flex-col gap-[1.5rem] w-full px-[1rem] pt-[1rem] pb-[1.25rem] rounded-[0.75rem] border-[0.031rem] border-[#DCDCDC]">
      <div className="flex items-center gap-[0.75rem] px-[0.25rem] pb-[0.75rem] border-b-[0.031rem] border-b-[#DCDCDC]">
        <PersonIcon />
        <h3 className="head-3 text-[#1E1926]">{title}</h3>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default PostApplyCardLayout;
