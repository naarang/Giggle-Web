import { profileTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { useLocation } from 'react-router-dom';

type DeleteAccountProps = {
  onDeleteButton: (value: boolean) => void;
};

const DeleteAccount = ({ onDeleteButton }: DeleteAccountProps) => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="pt-3 px-6 pb-[3.125rem] mb-10 flex justify-center items-center">
        <button
          className="bg-[#FF6F61] p-4 flex justify-center items-center rounded-[2rem] button-1 text-white"
          onClick={() => onDeleteButton(true)}
        >
          {profileTranslation.deleteAccount[isEmployer(pathname)]}
        </button>
      </div>
    </>
  );
};

export default DeleteAccount;
