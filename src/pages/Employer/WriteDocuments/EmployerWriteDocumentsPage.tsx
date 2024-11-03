import BaseHeader from '@/components/Common/Header/BaseHeader';
import InfoAlert from '@/components/Document/write/InfoAlert';
import DocumentSubHeaderEmployer from '@/components/Employer/ApplicantDocumentsDetail/DocumentSubHeaderEmployer';
import EmployeeInfoSectionKOR from '@/components/Employer/WriteDocument/EmployeeInfoSectionKOR';
import EmployerLaborContractForm from '@/components/Employer/WriteDocument/EmployerLaborContractForm';
import EmployerPartTimePermitForm from '@/components/Employer/WriteDocument/EmployerPartTimePermitForm';
import { mockPartTimePermitForm } from '@/constants/documents';
import {
  useGetIntegratedApplication,
  useGetPartTimeEmployPermit,
  useGetStandardLaborContract,
} from '@/hooks/api/useDocument';
import { useCurrentApplicantIdStore } from '@/store/url';
import {
  DocumentType,
  IntegratedApplicationData,
  LaborContractDataResponse,
  PartTimePermitData,
} from '@/types/api/document';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EmployerWriteDocumentsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, isEdit } = location.state || {};
  const { currentApplicantId } = useCurrentApplicantIdStore();

  const [document, setDocument] = useState<
    PartTimePermitData | LaborContractDataResponse | IntegratedApplicationData
  >();
  const { mutate: getPartTimeEmployPermit } = useGetPartTimeEmployPermit({
    onSuccess: (data) => setDocument(data.data),
  });
  const { mutate: getStandardLaborContract } = useGetStandardLaborContract({
    onSuccess: (data) => setDocument(data.data),
  });
  const { mutate: getIntegratedApplication } = useGetIntegratedApplication({
    onSuccess: (data) => setDocument(data.data),
  });

  {
    useEffect(() => {
      switch (type) {
        case DocumentType.PART_TIME_PERMIT:
          getPartTimeEmployPermit(Number(currentApplicantId));
          break;
        case DocumentType.LABOR_CONTRACT:
          getStandardLaborContract(Number(currentApplicantId));
          break;
        case DocumentType.INTEGRATED_APPLICATION:
          getIntegratedApplication(Number(currentApplicantId));
          break;
      }
    }, [type]);
    return (
      <div>
        <BaseHeader
          hasBackButton={true}
          hasMenuButton={false}
          title="서류 작성"
          onClickBackButton={() =>
            navigate(`/employer/applicant/document-detail/${currentApplicantId}`)
          } // 서류관리 페이지로 이동 요망
        />
        <DocumentSubHeaderEmployer type={type as DocumentType} />
        <div className="flex flex-col items-center justify-start gap-6 px-6 pt-6">
          <InfoAlert content="유학생의 정보가 알맞은지 확인하세요." />
          <EmployeeInfoSectionKOR
            employee={mockPartTimePermitForm}
            type={DocumentType.PART_TIME_PERMIT}
          />
        </div>
        {type === DocumentType.PART_TIME_PERMIT && (
          <EmployerPartTimePermitForm
            document={document as PartTimePermitData}
            isEdit={isEdit}
          />
        )}
        {type === DocumentType.LABOR_CONTRACT && (
          <EmployerLaborContractForm
            document={document as LaborContractDataResponse}
            isEdit={isEdit}
          />
        )}
      </div>
    );
  }
};
export default EmployerWriteDocumentsPage;
