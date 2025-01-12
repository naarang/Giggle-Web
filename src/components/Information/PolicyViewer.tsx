import BaseHeader from '../Common/Header/BaseHeader';

const PolicyViewer = ({
  content,
  onBack,
}: {
  content: string;
  onBack: () => void;
}) => {
  // 2. iframe 사용
  const renderWithIframe = () => {
    const responsiveContent = content.replace(
      '</head>',
      `<style>
        :root {
          /* 기본 폰트 크기 설정 */
          font-size: calc(12px + 0.4vw);
        }
        
        /* 디바이스 크기별 세부 조정 */
        @media screen and (max-width: 320px) {
          :root { font-size: 9px; }
        }
        @media screen and (min-width: 768px) {
          :root { font-size: 16px; }
        }
        @media screen and (min-width: 1024px) {
          :root { font-size: 18px; }
        }
  
        /* 컨텐츠별 상대적 크기 설정 */
        body { font-size: 1rem; }
        .version-info { font-size: 0.875rem; }
        h1 { font-size: 1.5rem; }
        h2 { font-size: 1.25rem; }
        .box { font-size: 1rem; }
      </style>
      </head>`,
    );

    return (
      <iframe
        className="w-full h-screen border-0"
        srcDoc={responsiveContent}
        title="HTML Content"
        sandbox="allow-scripts"
      />
    );
  };
  return (
    <div className="fixed top-0 w-full h-full space-y-8 z-40 bg-white">
      <div>
        <BaseHeader
          hasBackButton
          hasMenuButton={false}
          title="서비스 이용약관 동의"
          onClickBackButton={onBack}
        />
        <div className="w-full border-t border-[#dcdcdc]" />
        {renderWithIframe()}
      </div>
    </div>
  );
};

export default PolicyViewer;
