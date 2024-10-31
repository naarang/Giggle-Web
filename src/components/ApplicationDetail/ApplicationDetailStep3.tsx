import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';

const ApplicationDetailStep3 = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <section className="w-full px-[1.5rem] pt-[0.75rem] pb-[3.125rem]">
      <Button
        type={buttonTypeKeys.APPLY}
        bgColor=""
        fontColor="text-[#F4F4F9]"
        isBorder={false}
        title="Check the application documents"
        onClick={() => navigate(`/application-documents/${id}`)}
      />
    </section>
  );
};

export default ApplicationDetailStep3;
