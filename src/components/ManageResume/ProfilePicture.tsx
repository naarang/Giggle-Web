type ProfilePictureProps = {
  name: string;
  profileImg: string;
};

const ProfilePicture = ({ name, profileImg }: ProfilePictureProps) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-[5rem] h-[5rem] overflow-hidden flex items-center justify-center bg-gray-200 rounded-full">
          <img
            src={profileImg}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="py-2 px-3 head-3 text-[#1E1926] text-center">
          {name.replace('-', ' ')}
        </span>
      </div>
    </div>
  );
};

export default ProfilePicture;
