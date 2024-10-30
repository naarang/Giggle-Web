import BaseHeader from '@/components/Common/Header/BaseHeader';
import {
  DocumentStatusEmployer,
  DocumentTypeInfo,
} from '@/constants/documents';
import {
  DocumentType,
  EmployDocumentsSummaryResponse,
} from '../../../types/api/document';
import DocumentCardDispenserEmployer from '@/components/Employer/ApplicantDocumentsDetail/DocumentCardDispenserEmployer';

const mockDocumentsSummaryResponse: EmployDocumentsSummaryResponse = {
  standard_labor_contract: {
    id: 2001,
    hwp_url: 'https://example.com/contracts/standard_2001.hwp',
    word_url: 'https://example.com/contracts/standard_2001.docx',
    status: DocumentStatusEmployer.SUBMITTED,
  },
  part_time_employment_permits: {
    id: 2001,
    hwp_url: 'https://example.com/contracts/standard_2001.hwp',
    word_url: 'https://example.com/contracts/standard_2001.docx',
    status: DocumentStatusEmployer.SUBMITTED,
  },
};

const ApplicantDocumentsDetailPage = () => {
  {
    /*
  integrated_application: {
    id: 3001,
    hwp_url: 'https://example.com/applications/integrated_3001.hwp',
    word_url: 'https://example.com/applications/integrated_3001.docx',
  },
    */
  }
  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        hasMenuButton={false}
        title="서류 관리"
      />
      <div className="flex flex-col gap-2 p-6">
        {mockDocumentsSummaryResponse[DocumentType.PART_TIME_PERMIT] ? (
          <DocumentCardDispenserEmployer
            document={
              mockDocumentsSummaryResponse[DocumentType.PART_TIME_PERMIT]
            }
            title={DocumentTypeInfo[DocumentType.PART_TIME_PERMIT].name}
            type={DocumentType.PART_TIME_PERMIT}
            onNext={() => {}}
          />
        ) : (
          <div className="w-full relative rounded-[1.125rem] bg-white border border-[#dcdcdc] flex flex-col items-start justify-start py-6 cursor-pointer text-left text-[#1e1926]">
            <div className="self-stretch flex flex-col items-start justify-start px-4">
              <div className="self-stretch flex flex-row items-center justify-center pl-2 gap-4">
                <div className="flex-1 flex items-center justify-start head-3">
                  {DocumentTypeInfo[DocumentType.PART_TIME_PERMIT].name}
                </div>
              </div>
            </div>
          </div>
        )}
        {mockDocumentsSummaryResponse[DocumentType.LABOR_CONTRACT] ? (
          <DocumentCardDispenserEmployer
            document={mockDocumentsSummaryResponse[DocumentType.LABOR_CONTRACT]}
            title={DocumentTypeInfo[DocumentType.LABOR_CONTRACT].name}
            type={DocumentType.LABOR_CONTRACT}
            onNext={() => {}}
          />
        ) : (
          <div className="w-full relative rounded-[1.125rem] bg-white border border-[#dcdcdc] flex flex-col items-start justify-start py-6 cursor-pointer text-left text-[#1e1926]">
            <div className="self-stretch flex flex-col items-start justify-start px-4">
              <div className="self-stretch flex flex-row items-center justify-center pl-2 gap-4">
                <div className="flex-1 flex items-center justify-start head-3">
                  {DocumentTypeInfo[DocumentType.LABOR_CONTRACT].name}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantDocumentsDetailPage;
