import {
  DocumentsSummaryResponse,
  DocumentType,
  DocumentTypeInfo,
} from '@/types/api/document';
import DocumentCard from './DocumentCard';
import AddIcon from '@/assets/icons/AddButton.svg?react';
import { useNavigate } from 'react-router-dom';

const DocumentCardList = ({
  documents,
}: {
  documents: DocumentsSummaryResponse;
}) => {
  const navigate = useNavigate();
  const documentTypes = Object.values(DocumentType);
  const MakeDocumentButton = ({ title }: { title: string }) => {
    return (
      <div className="w-full relative rounded-[1.125rem] bg-white border border-[#dcdcdc] flex flex-col items-start justify-start py-6 cursor-pointer text-left text-[#1e1926]">
        <div className="self-stretch flex flex-col items-start justify-start px-4">
          <div className="self-stretch flex flex-row items-center justify-center pl-2 gap-4">
            <div className="flex-1 flex items-center justify-start">
              <div className="relative head-3">{title}</div>
            </div>
            <div onClick={() => navigate('/write/application-form')}>
              <AddIcon />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-6">
      {documentTypes.map((property) =>
        documents[property] ? (
          <DocumentCard document={documents[property]} />
        ) : (
          <MakeDocumentButton title={DocumentTypeInfo[property].name} />
        ),
      )}
    </div>
  );
};

export default DocumentCardList;
