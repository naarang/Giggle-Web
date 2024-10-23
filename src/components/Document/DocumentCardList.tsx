import { DocumentsSummaryResponse, DocumentType } from '@/types/api/document';
import DocumentCardDispenser from './DocumentCard';
import MakeDocumentButton from './MakeDocumentButton';
import { DocumentTypeInfo } from '@/constants/documents';

const DocumentCardList = ({
  documents,
}: {
  documents: DocumentsSummaryResponse;
}) => {
  const documentTypes = Object.values(DocumentType);
  const handleOnNext = () => {
    //추후 api 작성 시 완성
    alert('onNext');
  };

  return (
    <div className="flex flex-col w-full px-6 gap-2">
      {documentTypes.map((property) =>
        documents[property] ? (
          <DocumentCardDispenser
            document={documents[property]}
            title={DocumentTypeInfo[property].name}
            onNext={handleOnNext}
          />
        ) : (
          <MakeDocumentButton type={property} />
        ),
      )}
    </div>
  );
};

export default DocumentCardList;
