import {
  DocumentType,
  IntegratedApplicationData,
  LaborContractDataResponse,
  PartTimePermitData,
} from '@/types/api/document';
import PartTimePermitWriteForm from '@/components/WriteDocuments/PartTimePermitWriteForm';
import LaborContractWriteForm from '@/components/WriteDocuments/LaborContractWriteForm';
import IntegratedApplicationWriteForm from '@/components/WriteDocuments/IntegratedApplicationWriteForm';
import { useEffect, useState } from 'react';
import {
  useGetIntegratedApplication,
  useGetPartTimeEmployPermit,
  useGetStandardLaborContract,
} from '@/hooks/api/useDocument';
import { useParams } from 'react-router-dom';

type DocumentFormDispenserProps = {
  type: DocumentType;
  isEdit: boolean;
};

const DocumentFormDispenser = ({
  type,
  isEdit,
}: DocumentFormDispenserProps) => {
  const { id } = useParams();
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
          getPartTimeEmployPermit(Number(id));
          break;
        case DocumentType.LABOR_CONTRACT:
          getStandardLaborContract(Number(id));
          break;
        case DocumentType.INTEGRATED_APPLICATION:
          getIntegratedApplication(Number(id));
          break;
      }
    }, [type]);
  }
  switch (type) {
    case DocumentType.PART_TIME_PERMIT:
      return (
        <PartTimePermitWriteForm
          document={document as PartTimePermitData}
          isEdit={isEdit}
        />
      );
    case DocumentType.LABOR_CONTRACT:
      return (
        <LaborContractWriteForm
          document={document as LaborContractDataResponse}
          isEdit={isEdit}
        />
      );
    case DocumentType.INTEGRATED_APPLICATION:
      return (
        <IntegratedApplicationWriteForm
          document={document as IntegratedApplicationData}
          isEdit={isEdit}
        />
      );
  }
};

export default DocumentFormDispenser;
