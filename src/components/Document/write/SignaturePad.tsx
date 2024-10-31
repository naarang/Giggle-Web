import React, { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

type Point = {
  x: number;
  y: number;
  time: number;
  velocity?: number;
};

type SignaturePadProps = {
  onSave?: (signature: string) => void;
  onReset?: () => void;
  width?: number;
  height?: number;
};

const SignaturePad: React.FC<SignaturePadProps> = ({
  onSave,
  onReset,
  height = 120,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const sigPadRef = useRef<SignatureCanvas>(null);
  const [signatureData, setSignatureData] = useState('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [canSave, setCanSave] = useState<boolean>(false);

  useEffect(() => {
    // 화면 크기에 맞춰 서명 패드의 크기를 따로 조절하는 Observer를 추가하는 Effect 훅
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

  // 서명 패드의 활성화/비활성화를 담당하는 함수
  const handleCreateOrReset = () => {
    if (isEditing) {
      // Reset 동작
      if (sigPadRef.current) {
        sigPadRef.current.clear();
        onReset?.();
        setSignatureData('');
        setCanSave(false);
      }
    } else {
      // Create 동작
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (sigPadRef.current) {
      const canvas = sigPadRef.current.getCanvas();
      const points = sigPadRef.current.toData() as Point[][];

      let pathData = '';
      points.forEach((stroke: Point[]) => {
        if (stroke.length > 0) {
          const firstPoint = stroke[0];
          pathData += `M ${firstPoint.x} ${firstPoint.y} `;

          // Bezier curve를 사용하여 더 부드러운 선 생성
          for (let i = 1; i < stroke.length - 1; i++) {
            const p1 = stroke[i];
            const p2 = stroke[i + 1];
            const cp1x = p1.x;
            const cp1y = p1.y;
            const cp2x = (p1.x + p2.x) / 2;
            const cp2y = (p1.y + p2.y) / 2;
            pathData += `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y} `;
          }
        }
      });

      const svgString = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <svg xmlns="http://www.w3.org/2000/svg" 
             width="${canvas.width}" 
             height="${canvas.height}"
             viewBox="0 0 ${canvas.width} ${canvas.height}">
          <path d="${pathData}"
                fill="none"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>`;

      // SVG를 base64로 인코딩
      const base64SVG = btoa(unescape(encodeURIComponent(svgString)));
      const dataUrl = `data:image/svg+xml;base64,${base64SVG}`;

      setSignatureData(dataUrl);
      onSave?.(base64SVG);
    }
  };

  // 서명 입력 시작을 감지하는 함수
  const handleBeginStroke = () => {
    if (isEditing) {
      setCanSave(true);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div ref={containerRef} className="border border-gray-200 rounded-xl">
        {/* 서명 패드 활성화에 따른 조건부 렌더링 */}
        {isEditing && width > 0 ? (
          <SignatureCanvas
            ref={sigPadRef}
            onBegin={handleBeginStroke}
            canvasProps={{
              width,
              height,
              className: 'signature-canvas',
              style: { borderRadius: '12px' },
            }}
            backgroundColor="white"
          />
        ) : (
          <div className="w-full h-[7.5rem]" />
        )}
      </div>
      {/* 서명 패드 제어판 */}
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
          {signatureData !== '' ? 'Saved' : 'Saving'}
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
