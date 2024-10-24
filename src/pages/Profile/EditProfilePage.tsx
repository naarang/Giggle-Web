import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import Input from '@/components/Common/Input';
import EditProfilePicture from '@/components/Profile/EditProfilePicture';
import { buttonTypeKeys } from '@/constants/components';
import { GenderType, VisaType } from '@/constants/profile';
import { UserProfileDetailDataType } from '@/types/api/profile';
import { InputType } from '@/types/common/input';
import { transformToEditProfileData } from '@/utils/editProfileData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<
    UserProfileDetailDataType | undefined
  >(undefined);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleInputChange =
    (field: keyof UserProfileDetailDataType) => (value: string) => {
      setUserData((prevData) => {
        if (!prevData) {
          return { [field]: value } as UserProfileDetailDataType;
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

  const handleSubmit = async (): Promise<void> => {
    // TODO : API - 3.5 (유학생) 프로필 수정
    if (!userData) return;
    console.log('file 변경 - ' + profileImage);
    navigate('/profile');

    // get -> patch 데이터 변환
    const transformedData = transformToEditProfileData(
      userData,
      profileImage,
      Boolean(profileImage), // 이미지 변경 여부 확인
    );
    try {
      const formData = new FormData();

      // 이미지가 있을 경우 FormData에 추가
      if (transformedData.image) {
        formData.append('image', transformedData.image);
      }

      // JSON 데이터를 Blob으로 변환 후 FormData에 추가
      formData.append(
        'body',
        new Blob([JSON.stringify(transformedData.body)], {
          type: 'application/json',
        }),
      );
      /*
      const response = await axios.patch('/api/v1/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('API 성공:', response.data);
      */
      navigate('/profile');
    } catch (error) {
      console.error('API 호출 중 에러 발생:', error);
    }
  };

  useEffect(() => {
    // TODO : API - 3.1 (유학생) 유저 프로필 조회하기
    setUserData({
      profile_img_url:
        'https://images.pexels.com/photos/1458926/pexels-photo-1458926.jpeg?cs=srgb&dl=pexels-poodles2doodles-1458926.jpg&fm=jpg',
      first_name: 'Hyeona',
      last_name: 'Seol',
      birth: '0000-00-00',
      gender: GenderType.FEMALE,
      nationality: 'Korea',
      visa: VisaType.D_2_1,
      phone_number: '010-1111-2222',
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
              value={userData.visa.replace(/_/g, '-')}
              onChange={handleInputChange('visa')}
              canDelete={false}
            />
            <Input
              inputType={InputType.TEXT}
              placeholder="Telephone Number"
              value={userData.phone_number}
              onChange={handleInputChange('phone_number')}
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
