import { DocumentType } from '@/types/api/document';
import PartTimePermitWriteForm from '@/components/WriteDocuments/PartTimePermitWriteForm';
import LaborContractWriteForm from '@/components/WriteDocuments/LaborContractWriteForm';
import IntegratedApplicationWriteForm from '@/components/WriteDocuments/IntegratedApplicationWriteForm';

type DocumentFormDispenserProps = {
  type: DocumentType;
  isEdit: boolean;
};

const DocumentFormDispenser = ({
  type,
  isEdit,
}: DocumentFormDispenserProps) => {
  switch (type) {
    case DocumentType.PART_TIME_PERMIT:
      return <PartTimePermitWriteForm isEdit={isEdit} />;
    case DocumentType.LABOR_CONTRACT:
      return <LaborContractWriteForm isEdit={isEdit} />;
    case DocumentType.INTEGRATED_APPLICATION:
      return <IntegratedApplicationWriteForm isEdit={isEdit} />;
  }
};

export default DocumentFormDispenser;
