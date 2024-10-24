import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useBottomSheet from '@/hooks/useBottomSheet';

type BottomSheetLayoutProps = {
  hasHandlebar: boolean; // 최상단의 바 모양 존재 여부
  isAvailableHidden: boolean; // 아래로 내렸을 때 사라지도록 하는 여부
  isShowBottomsheet: boolean; // BottomSheet 보이기
  setIsShowBottomSheet?: React.Dispatch<React.SetStateAction<boolean>>; // isShowBottomsheet 값 동기화하기 위한 함수
  children: ReactNode;
};

const VIEW_HEIGHT = window.innerHeight;
const LAYOUT_MARGIN = 64;

const BottomSheetLayout = ({
  hasHandlebar,
  isAvailableHidden,
  isShowBottomsheet,
  setIsShowBottomSheet,
  children,
}: BottomSheetLayoutProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const { setIsOpen, onDragEnd, controls } =
    useBottomSheet(setIsShowBottomSheet);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    setIsOpen(isShowBottomsheet);
  }, [isShowBottomsheet, setIsOpen]);

  // children의 height를 계산
  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.offsetHeight;
      setContentHeight(height);
    }
  }, [contentRef]);

  return (
    <motion.div
      drag="y"
      initial="hidden"
      {...(isAvailableHidden ? { onDragEnd } : {})}
      animate={controls}
      transition={{
        type: 'spring',
        damping: 40,
        stiffness: 400,
      }}
      variants={{
        visible: { y: 0 },
        hidden: { y: '100%' },
      }}
      dragConstraints={{
        top: 0,
        bottom: contentHeight,
      }} // 상단과 하단 드래그 제한 설정
      dragElastic={0.2}
      className={`fixed left-0 bottom-0 w-full h-[90vh] p-[1.5rem] pb-[2.5rem] rounded-t-[2.5rem] bg-white shadow-bottomSheetShadow z-30`}
      style={{
        top: `${VIEW_HEIGHT - contentHeight - LAYOUT_MARGIN}px`,
      }}
    >
      {hasHandlebar && (
        <div className="mx-auto mt-[-0.5rem] mb-[1.5rem] w-[4rem] border-[0.125rem] border-[#F1F2F6]"></div>
      )}
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};

export default BottomSheetLayout;
