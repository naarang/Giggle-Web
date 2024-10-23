type DeleteAccountProps = {
  onDeleteButton: (value: boolean) => void;
};

const DeleteAccount = ({ onDeleteButton }: DeleteAccountProps) => {
  return (
    <>
      <div className="pt-3 px-6 pb-[3.125rem] flex justify-center items-center">
        <button
          className="bg-[#FF6F61] p-4 flex justify-center items-center rounded-[2rem] button-1 text-white"
          onClick={() => onDeleteButton(true)}
        >
          Delete account
        </button>
      </div>
    </>
  );
};

export default DeleteAccount;
