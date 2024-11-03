import { DocumentsSummaryResponse, DocumentType } from '@/types/api/document';
import DocumentCardDispenser from '@/components/Document/DocumentCard';
import MakeDocumentButton from '@/components/Document/MakeDocumentButton';
import { DocumentTypeInfo } from '@/constants/documents';
import {
  usePatchDocumentsStatusConfirmation,
  usePatchStatusSubmission,
} from '@/hooks/api/useDocument';

const DocumentCardList = ({
  documents,
}: {
  documents: DocumentsSummaryResponse;
}) => {
  const documentTypes = Object.values(DocumentType);
  // patch api mutate 설정 (8.15 유학생이 서류 제출하기)
  const { mutate: patchStatusSubmission } = usePatchStatusSubmission();

  // patch api mutate 설정 (8.17 유학생이 서류 컨펌하기)
  const { mutate: patchStatusConfirmation } =
    usePatchDocumentsStatusConfirmation();

  const handleOnNext = async (id: number, status: string) => {
    // 컨펌하기
    if (status === 'BEFORE_CONFIRMATION') {
      patchStatusConfirmation(id);
    } else {
      // 이외의 제출하기
      patchStatusSubmission(id);
    }
  };

  return (
    <div className="flex flex-col w-full px-6 gap-2 pb-[8rem]">
      {documentTypes.map((property, index) =>
        documents[property] ? (
          <DocumentCardDispenser
            key={`${index}_${property}`}
            document={documents[property]}
            title={DocumentTypeInfo[property].name}
            type={property}
            // null 체크 추가
            onNext={() => {
              const document = documents[property];
              if (document && document.status) {
                handleOnNext(document.id, document.status);
              }
            }}
          />
        ) : (
          <MakeDocumentButton type={property} key={`${index}_${property}`} />
        ),
      )}
    </div>
  );
};

export default DocumentCardList;
