type IntegratedApplicationFormProps = {
  isEdit: boolean;
};

const IntegratedApplicationWriteForm = ({
  isEdit,
}: IntegratedApplicationFormProps) => {
  return (
    <div>
      {isEdit
        ? 'IntegratedApplicationWriteFormEdit'
        : 'IntegratedApllicatoinWriteForm'}
    </div>
  );
};

export default IntegratedApplicationWriteForm;
