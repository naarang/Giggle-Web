import { usegetOwnerSummaries } from '@/hooks/api/useProfile';
import { EmployerProfileResponse } from '@/types/api/profile';
import { useEffect, useState } from 'react';

const EmployerProfileCard = () => {
  const { data } = usegetOwnerSummaries();
  const [profileData, setProfileData] = useState<EmployerProfileResponse>();

  useEffect(() => {
    if (data) {
      setProfileData(data.data);
    }
  }, [data]);
  return (
    <>
      {profileData && (
        <div className="pt-5 pb-4 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img src={profileData.icon_img_url} alt="profile image" />
          </div>
          <h1 className="head-3 text-[#1E1926]">{profileData.company_name}</h1>
        </div>
      )}
    </>
  );
};

export default EmployerProfileCard;
