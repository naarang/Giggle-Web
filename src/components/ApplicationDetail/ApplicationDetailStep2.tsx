import { useState } from 'react';
import ContactRecruiterModal from '@/components/ApplicationDetail/ContactRecruiterModal';

const ApplicationDetailStep2 = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onClickContact = () => {
    // TODO: 전화 켜주도록...?
    setModalOpen(false);
  };

  const getRecruiterInfo = () => {
    // TODO: 성공 시 modal 열기
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
          name={'name'}
          phoneNumber={'010-0000-0000'}
        />
      )}
    </>
  );
};

export default ApplicationDetailStep2;
