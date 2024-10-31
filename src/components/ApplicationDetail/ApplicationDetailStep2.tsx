import { useState } from 'react';
import ContactRecruiterModal from '@/components/ApplicationDetail/ContactRecruiterModal';
import { useParams } from 'react-router-dom';
import { useGetRecruiterInfo } from '@/hooks/api/useApplication';

const ApplicationDetailStep2 = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { id } = useParams();
  const { refetch } = useGetRecruiterInfo(Number(id), false);

  const onClickContact = () => {
    // TODO: 전화 켜주도록
    setModalOpen(false);
  };

  const getRecruiterInfo = async () => {
    const { data } = await refetch();
    if (!data?.success) return;

    setName(data?.data?.recruiter_name);
    setPhoneNumber(data?.data?.recruiter_phone_number);
    setModalOpen(true);
  };

  return (
    <>
      <section className="w-full px-[1.5rem] pt-[0.75rem] pb-[3.125rem]">
        <p className="pb-[0.75rem] px-[2.25rem] button-2 text-[#7872ED] text-center">
          The employer will ask for an interview. After completion, we will
          check whether the interview is completed or not.
        </p>
        <div className="flex justify-center gap-[0.5rem]">
          <p className="body-3 text-[#7D8A95]">Didn’t get a response?</p>
          <button
            className="button-2 text-[#695F96]"
            onClick={getRecruiterInfo}
          >
            Contact Him
          </button>
        </div>
      </section>
      {modalOpen && (
        <ContactRecruiterModal
          onClickClose={() => setModalOpen(false)}
          onClickContact={onClickContact}
          name={name}
          phoneNumber={phoneNumber}
        />
      )}
    </>
  );
};

export default ApplicationDetailStep2;
