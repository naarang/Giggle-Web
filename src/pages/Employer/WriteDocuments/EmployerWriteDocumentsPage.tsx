import BaseHeader from '@/components/Common/Header/BaseHeader';
import DocumentSubHeaderEmployer from '@/components/Employer/ApplicantDocumentsDetail/DocumentSubHeaderEmployer';
import EmployeeInfoSectionKOR from '@/components/Employer/WriteDocument/EmployeeInfoSectionKOR';
import EmployerPartTimePermitForm from '@/components/Employer/WriteDocument/EmployerPartTimePermitForm';
import { mockPartTimePermitForm } from '@/constants/documents';
import {
  useGetIntegratedApplication,
  useGetPartTimeEmployPermit,
  useGetStandardLaborContract,
} from '@/hooks/api/useDocument';
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
  const [document, setDocument] = useState<
    PartTimePermitData | LaborContractDataResponse | IntegratedApplicationData
  >();
  const { mutate: getPartTimeEmployPermit } = useGetPartTimeEmployPermit({
    onSuccess: (data) => setDocument(data),
  });
  const { mutate: getStandardLaborContract } = useGetStandardLaborContract({
    onSuccess: (data) => setDocument(data),
  });
  const { mutate: getIntegratedApplication } = useGetIntegratedApplication({
    onSuccess: (data) => setDocument(data),
  });
  {
    useEffect(() => {
      switch (type) {
        case DocumentType.PART_TIME_PERMIT:
          getPartTimeEmployPermit(1);
          break;
        case DocumentType.LABOR_CONTRACT:
          getStandardLaborContract(1);
          break;
        case DocumentType.INTEGRATED_APPLICATION:
          getIntegratedApplication(1);
          break;
      }
    }, [type]);
    return (
      <div>
        <BaseHeader
          hasBackButton={true}
          hasMenuButton={false}
          title="서류 작성"
          onClickBackButton={() => navigate('/employer/application-documents')} // 서류관리 페이지로 이동 요망
        />
        <DocumentSubHeaderEmployer type={type as DocumentType} />
        <div className="px-6 pt-6">
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
      </div>
    );
  }
};
export default EmployerWriteDocumentsPage;
