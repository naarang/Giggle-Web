import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';

const ApplicationDetailStep3 = ({ applicant_id }: { applicant_id: number }) => {
  const navigate = useNavigate();

  return (
    <section className="w-full px-[1.5rem] pt-[0.75rem] pb-[3.125rem]">
      <Button
        type={buttonTypeKeys.APPLY}
        bgColor=""
        fontColor="text-[#F4F4F9]"
        isBorder={false}
        title="Check the application documents"
        onClick={() => navigate(`/application-documents/${applicant_id}`)}
      />
    </section>
  );
};

export default ApplicationDetailStep3;
