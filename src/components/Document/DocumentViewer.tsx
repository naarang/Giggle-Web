import { sendReactNativeMessage } from '@/utils/reactNativeMessage';

interface DocumentViewerProps {
  url: string;
  onClose: () => void;
  filename?: string;
}

const DocumentViewer = ({ url, onClose }: DocumentViewerProps) => {
  const handleDownload = async (): Promise<void> => {
    sendReactNativeMessage({ type: 'DOWNLOAD_FILE', payload: url });
    console.log('url: ', url);
  };
  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <button onClick={onClose} className="p-2 flex items-center gap-2">
          <span>뒤로가기</span>
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          다운로드
        </button>
      </div>
      <iframe
        src={url}
        className="w-full h-[calc(100vh-4rem)]"
        style={{
          width: '100%',
          height: 'calc(100vh - 4rem)',
          border: 'none',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          maxWidth: '100%',
          maxHeight: '100%',
          display: 'block',
        }}
        title="document-viewer"
        frameBorder="0"
        scrolling="auto"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
};

export default DocumentViewer;
