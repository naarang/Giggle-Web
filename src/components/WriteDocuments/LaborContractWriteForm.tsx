import { initialLaborContractEmployeeInfo } from '@/constants/documents';
import { LaborContractDataResponse, LaborContractEmployeeInfo } from '@/types/api/document';
import { useState } from 'react';

type LaborContractFormProps = {
  document?: LaborContractDataResponse;
  isEdit: boolean;
};

const LaborContractWriteForm = ({ document, isEdit }: LaborContractFormProps) => {
  const [newDocumentData, setNewDocumentData] =
  useState<LaborContractEmployeeInfo>(initialLaborContractEmployeeInfo);
  return (
    <div>{isEdit ? 'LaborContractWriteFormEdi' : 'LaborContractWriteForm'}</div>
  );
};

export default LaborContractWriteForm;
