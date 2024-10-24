import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import Input from '@/components/Common/Input';
import EditProfilePicture from '@/components/Profile/EditProfilePicture';
import { buttonTypeKeys } from '@/constants/components';
import { UserEditProfileDataType } from '@/types/api/profile';
import { InputType } from '@/types/common/input';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserEditProfileDataType | undefined>(
    undefined,
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleInputChange =
    (field: keyof UserEditProfileDataType) => (value: string) => {
      setUserData((prevData) => {
        if (!prevData) {
          return { [field]: value } as UserEditProfileDataType;
        }
        return {
          ...prevData,
          [field]: value,
        };
      });
    };

  const handleBackButtonClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = () => {
    // API - 3.5 (유학생) 프로필 수정
    // console.log('file 변경 - ' + profileImage);

    navigate('/profile');
  };

  useEffect(() => {
    setUserData({
      profile_img_url:
        'https://images.pexels.com/photos/1458926/pexels-photo-1458926.jpeg?cs=srgb&dl=pexels-poodles2doodles-1458926.jpg&fm=jpg',
      first_name: 'Hyeona',
      last_name: 'Seol',
      birth: '0000.00.00',
      gender: 'Female',
      nationality: 'Korea',
      visa_satus: 'D_2_7',
      telephone_number: '010-1111-2222',
    });
  }, []);

  return (
    <>
      {userData ? (
        <div className="w-full h-full">
          <BaseHeader
            hasBackButton={true}
            onClickBackButton={handleBackButtonClick}
            hasMenuButton={false}
            title="Edit Profile"
          />
          <div className="flex flex-col px-6 gap-9">
            <EditProfilePicture
              profileImgUrl={userData.profile_img_url}
              onImageUpdate={setProfileImage}
            />
            <Input
              inputType={InputType.TEXT}
              placeholder="First Name"
              value={userData.first_name}
              onChange={handleInputChange('first_name')}
              canDelete={false}
            />
            <Input
              inputType={InputType.TEXT}
              placeholder="Last Name"
              value={userData.last_name}
              onChange={handleInputChange('last_name')}
              canDelete={false}
            />
            <Input
              inputType={InputType.TEXT}
              placeholder="Birth"
              value={userData.birth}
              onChange={handleInputChange('birth')}
              canDelete={false}
            />
            <Input
              inputType={InputType.TEXT}
              placeholder="Gender"
              value={userData.gender}
              onChange={handleInputChange('gender')}
              canDelete={false}
            />
            <Input
              inputType={InputType.TEXT}
              placeholder="Nationality"
              value={userData.nationality}
              onChange={handleInputChange('nationality')}
              canDelete={false}
            />
            <Input
              inputType={InputType.TEXT}
              placeholder="Visa Status"
              value={userData.visa_satus}
              onChange={handleInputChange('visa_satus')}
              canDelete={false}
            />
            <Input
              inputType={InputType.TEXT}
              placeholder="Telephone Number"
              value={userData.telephone_number}
              onChange={handleInputChange('telephone_number')}
              canDelete={false}
            />
            <div className="pt-3 pb-[3.125rem] flex justify-center items-center">
              <Button
                type={buttonTypeKeys.LARGE}
                title="Save"
                bgColor="bg-[#FEF387]"
                fontColor="text-[#1E1926]"
                onClick={handleSubmit}
                isBorder={false}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>로딩 중</div>
      )}
    </>
  );
};

export default EditProfilePage;
