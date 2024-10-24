type PostApplyProfileProps = {
  profileImgUrl: string;
  name: string;
};

const PostApplyProfile = ({ name }: PostApplyProfileProps) => {
  return (
    <div>
      <div className='w-[5.125rem] h-[5.125rem] mb-[1rem] rounded-full bg-cover bg-center bg-[url("/src/assets/images/JobIconExample.jpeg")]'></div>
      <p className=" text-[#33384B] font-bold text-lg">{name}</p>
    </div>
  );
};

export default PostApplyProfile;
