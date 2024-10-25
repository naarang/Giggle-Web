import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';

const ApplicationDetailStep6 = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <section className="flex flex-col gap-[0.5rem] w-full px-[1.5rem] pt-[0.75rem] pb-[3.125rem]">
      <Button
        type={buttonTypeKeys.LARGE}
        bgColor="bg-[#FEF387]"
        fontColor="text-[#1E1926]"
        isBorder={false}
        title="Register the results"
        onClick={() => navigate(`/application/result/${id}`)}
      />
      <Button
        type={buttonTypeKeys.APPLY}
        bgColor=""
        fontColor="text-[#F4F4F9]"
        isBorder={false}
        title="Check the application documents"
        onClick={() => navigate('/application-documents')}
      />
    </section>
  );
};

export default ApplicationDetailStep6;
