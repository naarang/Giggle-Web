import { UserInformationType } from '@/types/api/profile';

type ProfileCardProps = {
  data: UserInformationType;
};

const ProfileCard = ({ data }: ProfileCardProps) => {
  // TODO: 추후 로직 추가
  const handleButtonClick = () => {};

  return (
    <div className="flex flex-col px-[1.125rem] pt-5 pb-4 rounded-[1.125rem] gap-4 bg-[rgba(255,255,255,0.5)]">
      <div className="flex items-center gap-4">
        {/* 프로필 사진 */}
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src={data.profile_img_url}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        {/* 이름 */}
        <div className="grow flex flex-col gap-1">
          <div className="head-3 text-[#1E1926]">
            {data.first_name} {data.last_name}
          </div>
          {/* 생년월일 */}
          <div className="body-3 text-[#656565]">{data.birth}</div>
          {/* 교육 정보 */}
          {data.school_name === '' ? (
            <span className="body-2 text-[#1E1926]">
              Please register your
              <br />
              educational background
            </span>
          ) : (
            <>
              <div>
                <span className="body-2 text-[#1E1926]">
                  {data.school_name}
                </span>
                <span className="body-2 text-[#1E1926]">
                  Grade {data.grade}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="body-3 text-[#464646]">
                  Grade Point Average
                </span>
                <span className="body-3 text-[#464646]">{data.gpa}</span>
              </div>
            </>
          )}
        </div>
      </div>
      {data.school_name === '' && (
        <button
          className="grow w-full bg-[#FEF387] rounded-md py-2 text-center caption-1 text-[#1E1926] shadow-emphasizeShadow"
          onClick={handleButtonClick}
        >
          Write your educational background
        </button>
      )}
    </div>
  );
};

export default ProfileCard;
