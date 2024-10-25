import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate } from 'react-router-dom';

const ApplicationDetailStep7 = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center gap-[0.75rem] w-full px-[1.5rem] pt-[0.75rem] pb-[3.125rem]">
      <p className="button-2 text-[#7872ED]">This application is successed.</p>
      <p className="button-2 text-[#FF6F61]">This application is rejected.</p>
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

export default ApplicationDetailStep7;
