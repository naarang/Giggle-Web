import BaseHeader from '@/components/Common/Header/BaseHeader';
import DocumentSubHeader from '@/components/Document/write/DocumentSubHeader';
import { DocumentType } from '@/types/api/document';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  PartTimePermitData,
  LaborContractDataResponse,
  IntegratedApplicationData,
} from '@/types/api/document';
import EmployerInfoSection from '@/components/Document/write/EmployerInfoSection';
import {
  useGetIntegratedApplication,
  useGetPartTimeEmployPermit,
  useGetStandardLaborContract,
} from '@/hooks/api/useDocument';

const DocumentPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = location.state || {};
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

  const hasEmployerInfo = (
    doc:
      | PartTimePermitData
      | LaborContractDataResponse
      | IntegratedApplicationData,
  ): doc is PartTimePermitData | LaborContractDataResponse => {
    return 'employer_information' in doc;
  };

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        hasMenuButton={true}
        title="Fill in document"
        onClickBackButton={() => navigate('/application-documents')}
      />
      <DocumentSubHeader type={type as DocumentType} />
      {type !== DocumentType.INTEGRATED_APPLICATION &&
        document &&
        hasEmployerInfo(document) &&
        document.employer_information && (
          <EmployerInfoSection
            employ={document.employer_information}
            type={DocumentType.PART_TIME_PERMIT}
          />
        )}
    </div>
  );
};

export default DocumentPreview;
