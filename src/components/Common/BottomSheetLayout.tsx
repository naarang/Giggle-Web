import { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';
import useBottomSheet from '@/hooks/useBottomSheet';

type BottomSheetLayoutProps = {
  hasHandlebar: boolean; // 최상단의 바 모양 존재 여부
  isAvailableHidden: boolean; // 아래로 내렸을 때 사라지도록 하는 여부
  isShowBottomsheet: boolean; // BottomSheet 보이기
  children: ReactNode;
};

const BottomSheetLayout = ({
  hasHandlebar,
  isAvailableHidden,
  isShowBottomsheet,
  children,
}: BottomSheetLayoutProps) => {
  const { setIsOpen, onDragEnd, controls } = useBottomSheet();

  useEffect(() => {
    setIsOpen(isShowBottomsheet);
  }, [isShowBottomsheet, setIsOpen]);

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
      dragConstraints={{ top: -100, bottom: 200 }} // 상단과 하단 드래그 제한 설정
      dragElastic={0.2}
      className="fixed top-[60vh] left-0 bottom-0 w-full h-[90vh] p-[1.5rem] pb-[2.5rem] rounded-t-[2.5rem] bg-white shadow-bottomSheetShadow"
    >
      {hasHandlebar && (
        <div className="mx-auto mt-[-0.5rem] mb-[1.5rem] w-[4rem] border-[0.125rem] border-[#F1F2F6]"></div>
      )}
      <div>{children}</div>
    </motion.div>
  );
};

export default BottomSheetLayout;
