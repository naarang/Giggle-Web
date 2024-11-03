type PostApplyProfileProps = {
  profileImgUrl: string | undefined;
  name: string;
};

const PostApplyProfile = ({ profileImgUrl, name }: PostApplyProfileProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      {profileImgUrl ? (
        <div
          className="w-[5.125rem] h-[5.125rem] mb-[1rem] rounded-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${profileImgUrl})`,
          }}
        ></div>
      ) : (
        <div className="w-[5.125rem] h-[5.125rem] mb-[1rem] rounded-full bg-[#F4F4F9]]"></div>
      )}
      <p className=" text-[#33384B] font-bold text-lg">
        {name.replace(/-/g, ' ')}
      </p>
    </div>
  );
};

export default PostApplyProfile;
