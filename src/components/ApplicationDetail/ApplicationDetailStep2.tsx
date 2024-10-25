import { useState } from 'react';
import ContactRecruiterModal from '@/components/ApplicationDetail/ContactRecruiterModal';
import { ApplicationRecruiterItemType } from '@/types/application/applicationItem';

// 더미데이터
const RECRUITER_DATA: ApplicationRecruiterItemType = {
  recruiter_name: '이름~',
  recruiter_phone_number: '010-0000-0000',
};

const ApplicationDetailStep2 = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onClickContact = () => {
    // TODO: 전화 켜주도록...?
    setModalOpen(false);
  };

  const getRecruiterInfo = () => {
    // TODO: 성공 시 modal 열기
    setName(RECRUITER_DATA.recruiter_name);
    setPhoneNumber(RECRUITER_DATA.recruiter_phone_number);
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
