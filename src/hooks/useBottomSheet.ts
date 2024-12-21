import { PanInfo, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import usePreviousValue from '@/hooks/usePreviousValue';

const VIEW_HEIGHT = window.innerHeight;

const useBottomSheet = (
  setIsShowBottomSheet?: (isShowBottomsheet: boolean) => void,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();
  const prevIsOpen = usePreviousValue(isOpen);

  const onDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const shouldClose = info.offset.y > VIEW_HEIGHT / 4;

    if (shouldClose) {
      controls.start('hidden');
      setIsOpen(false);
    } else {
      controls.start('visible');
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (prevIsOpen && !isOpen) {
      controls.start('hidden');
      if (setIsShowBottomSheet) setIsShowBottomSheet(false);
    } else if (!prevIsOpen && isOpen) {
      controls.start('visible');
      if (setIsShowBottomSheet) setIsShowBottomSheet(true);
    }
  }, [controls, isOpen, prevIsOpen, setIsShowBottomSheet]);

  return { onDragEnd, controls, setIsOpen, isOpen };
};

export default useBottomSheet;
