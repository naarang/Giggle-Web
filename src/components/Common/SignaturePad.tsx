import React, { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignaturePadProps {
  onSave?: (signature: string) => void;
  width?: number;
  height?: number;
}

const SignaturePad: React.FC<SignaturePadProps> = ({
  onSave,
  height = 120,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const sigPadRef = useRef<SignatureCanvas>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [canSave, setCanSave] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;

        // width가 실제로 변경되었을 때만 상태 초기화
        if (newWidth !== width) {
          setWidth(newWidth);
          if (sigPadRef.current) {
            sigPadRef.current.clear();
            setCanSave(false); // 캔버스가 초기화되므로 저장 가능 상태도 초기화
          }
        }
      }
    };

    // 초기 너비 설정
    updateWidth();

    // ResizeObserver로 부모 요소 크기 변화 감지
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [width]); //

  const handleCreateOrReset = () => {
    if (isEditing) {
      // Reset 동작
      if (sigPadRef.current) {
        sigPadRef.current.clear();
        setCanSave(false);
      }
    } else {
      // Create 동작
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (sigPadRef.current) {
      const dataUrl = sigPadRef.current.toDataURL();
      onSave?.(dataUrl);
    }
  };

  const handleBeginStroke = () => {
    if (isEditing) {
      setCanSave(true);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div ref={containerRef} className="border border-gray-200 rounded-xl">
        {isEditing && width > 0 ? (
          <SignatureCanvas
            ref={sigPadRef}
            onBegin={handleBeginStroke}
            canvasProps={{
              width,
              height,
              className: 'signature-canvas',
            }}
            backgroundColor="white"
          />
        ) : (
          <div className="w-full h-[7.5rem]" />
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCreateOrReset}
          className={`relative rounded-lg bg-[#1e1926] flex flex-row items-center justify-center px-6 py-2.5 box-border text-left text-[#f4f4f9]`}
        >
          {isEditing ? 'Reset' : 'Create'}
        </button>
        <button
          onClick={handleSave}
          disabled={!canSave}
          className={`relative rounded-lg flex flex-row items-center justify-center px-6 py-2.5 box-border text-left text-[#1e1926] ${
            canSave ? 'bg-[#fef387]' : 'bg-[#F4F4F9] cursor-not-allowed'
          }`}
        >
          Saving
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
