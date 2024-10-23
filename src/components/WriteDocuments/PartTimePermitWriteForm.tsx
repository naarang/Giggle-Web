import { initialPartTimePermitForm } from '@/constants/documents';
import {
  PartTimePermitData,
  PartTimePermitFormRequest,
} from '@/types/api/document';
import { useEffect, useState } from 'react';

type PartTimePermitFormProps = {
  document?: PartTimePermitData;
  isEdit: boolean;
};

const PartTimePermitWriteForm = ({
  document,
  isEdit,
}: PartTimePermitFormProps) => {
  const [newDocumentData, setNewDocumentData] =
    useState<PartTimePermitFormRequest>(initialPartTimePermitForm);
  useEffect(() => {
    if (isEdit && document) {
      setNewDocumentData({
        first_name: document.employee_information.first_name,
        last_name: document.employee_information.last_name,
        major: document.employee_information.major,
        term_of_completion: document.employee_information.term_of_completion,
        phone_number: document.employee_information.phone_number,
        email: document.employee_information.email,
      });
    }
  }, [isEdit]);

  return <div>{newDocumentData.first_name}</div>;
};

export default PartTimePermitWriteForm;
