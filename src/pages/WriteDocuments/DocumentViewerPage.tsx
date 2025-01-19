import DocumentViewer from '@/components/Document/DocumentViewer';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  url: string;
  filename?: string;
}

const DocumentViewerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  useEffect(() => {
    if (!state?.url) {
      navigate(-1);
    }
  }, [state, navigate]);

  const handleClose = () => {
    navigate(-1);
  };
  return (
    <DocumentViewer
      url={state.url}
      onClose={handleClose}
      filename={state.filename}
    />
  );
};

export default DocumentViewerPage;
