type LaborContractFormProps = {
  isEdit: boolean;
};

const LaborContractWriteForm = ({ isEdit }: LaborContractFormProps) => {
  return (
    <div>{isEdit ? 'LaborContractWriteFormEdi' : 'LaborContractWriteForm'}</div>
  );
};

export default LaborContractWriteForm;
