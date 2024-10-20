import BackButtonIcon from '@/assets/icons/BackButtonIcon.svg?react';
import RowMenuIcon from '@/assets/icons/RowMenuIcon.svg?react';

type HeaderProps = {
  hasBackButton: boolean; // 뒤로 가기 버튼 여부
  onClickBackButton?: () => void;
  hasMenuButton: boolean; // 메뉴 버튼 여부
  onClickMenuButton?: () => void;
  title?: string; // 페이지 제목
};

const BaseHeader = ({
  hasBackButton,
  onClickBackButton,
  hasMenuButton,
  onClickMenuButton,
  title,
}: HeaderProps) => {
  return (
    <section className="w-full h-[3.5rem] px-[0.75rem] py-[0.5rem] flex justify-between items-center bg-white">
      {hasBackButton ? (
        <button
          className="p-[0.5rem] rounded-[0.75rem] border border-solid border-[#ECECEC]"
          onClick={onClickBackButton}
        >
          <BackButtonIcon />
        </button>
      ) : (
        <div></div>
      )}
      {title ? <span className="head-3">title</span> : <div></div>}
      {hasMenuButton ? (
        <button
          className="p-[0.5rem] rounded-[0.75rem] border border-solid border-[#ECECEC]"
          onClick={onClickMenuButton}
        >
          <RowMenuIcon />
        </button>
      ) : (
        <div></div>
      )}
    </section>
  );
};

export default BaseHeader;
