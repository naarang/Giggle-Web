type DeleteAccountProps = {
  handleDeleteButton: (value: boolean) => void;
};

const DeleteAccount = ({ handleDeleteButton }: DeleteAccountProps) => {
  return (
    <>
      <div className="pt-3 px-6 pb-[3.125rem] flex justify-center items-center">
        <button
          className="bg-[#FF6F61] p-4 flex justify-center items-center rounded-[2rem] button-1 text-white"
          onClick={() => handleDeleteButton(true)}
        >
          Delete account
        </button>
      </div>
    </>
  );
};

export default DeleteAccount;
