import BaseHeader from '@/components/Common/Header/BaseHeader';
import DocumentSubHeader from '@/components/Document/write/DocumentSubHeader';
import DocumentFormDispenser from '@/components/WriteDocuments/DocumentFormDispenser';
import { DocumentType } from '@/types/api/document';
import { useLocation, useNavigate } from 'react-router-dom';

const WriteDocumentsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = location.state || {};
  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        hasMenuButton={true}
        title="Fill in document"
        onClickBackButton={() => navigate('/application-documents')}
      />
      <DocumentSubHeader type={type as DocumentType} />
      <DocumentFormDispenser type={type as DocumentType} isEdit={false} />
    </div>
  );
};

export default WriteDocumentsPage;
