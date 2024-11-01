import { DocumentsSummaryResponse, DocumentType } from '@/types/api/document';
import DocumentCardDispenser from '@/components/Document/DocumentCard';
import MakeDocumentButton from '@/components/Document/MakeDocumentButton';
import { DocumentTypeInfo } from '@/constants/documents';

const DocumentCardList = ({
  documents,
}: {
  documents: DocumentsSummaryResponse;
}) => {
  const documentTypes = Object.values(DocumentType);

  return (
    <div className="flex flex-col w-full px-6 gap-2">
      {documentTypes.map((property) =>
        documents[property] ? (
          <DocumentCardDispenser
            document={documents[property]}
            title={DocumentTypeInfo[property].name}
            type={property}
          />
        ) : (
          <MakeDocumentButton type={property} />
        ),
      )}
    </div>
  );
};

export default DocumentCardList;
