import Button from '@/components/Common/Button';
import Dropdown from '@/components/Common/Dropdown';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import Input from '@/components/Common/Input';
import RadioButton from '@/components/Information/RadioButton';
import EditProfilePicture from '@/components/Profile/EditProfilePicture';
import { buttonTypeKeys } from '@/constants/components';
import { GenderType, NationalityType, VisaType } from '@/constants/profile';
import { UserProfileDetailDataType } from '@/types/api/profile';
import { InputType } from '@/types/common/input';
import { transformToProfileRequest } from '@/utils/editProfileData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { country, phone, visa } from '@/constants/information';
import useNavigateBack from '@/hooks/useNavigateBack';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<
    UserProfileDetailDataType | undefined
  >(undefined);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [phoneNum, setPhoneNum] = useState({
    start: '',
    middle: '',
    end: '',
  });

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

  const handleBackButtonClick = useNavigateBack();

  const handleSubmit = async (): Promise<void> => {
    // TODO : API - 3.5 (유학생) 프로필 수정
    if (!userData) return;

    navigate('/profile');

    // get -> patch 데이터 변환
    const transformedData = transformToProfileRequest(
      userData,
      phoneNum,
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
      navigate('/profile');
    } catch (error) {
      console.error('API 호출 중 에러 발생:', error);
    }
  };

  // 전화번호를 3개의 파트로 구분
  useEffect(() => {
    if (userData?.phone_number) {
      const [start, middle, end] = userData.phone_number.split('-');
      setPhoneNum({ start, middle, end });
    }
  }, [userData]);

  useEffect(() => {
    // TODO : API - 3.1 (유학생) 유저 프로필 조회하기
    setUserData({
      profile_img_url:
        'https://images.pexels.com/photos/1458926/pexels-photo-1458926.jpeg?cs=srgb&dl=pexels-poodles2doodles-1458926.jpg&fm=jpg',
      first_name: 'Hyeona',
      last_name: 'Seol',
      birth: '2001-02-09',
      gender: GenderType.FEMALE,
      nationality: NationalityType.SOUTH_KOREA,
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
          <div className="flex flex-col px-6 gap-9 mb-32">
            <EditProfilePicture
              profileImgUrl={userData.profile_img_url}
              onImageUpdate={setProfileImage}
            />

            <div className="w-full">
              {/* 이름 작성 */}
              <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
                First Name
              </div>
              <Input
                inputType={InputType.TEXT}
                placeholder="First Name"
                value={userData.first_name}
                onChange={handleInputChange('first_name')}
                canDelete={false}
              />
            </div>
            {/* 성 작성 */}
            <div className="w-full">
              <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
                Last Name
              </div>
              <Input
                inputType={InputType.TEXT}
                placeholder="Last Name"
                value={userData.last_name}
                onChange={handleInputChange('last_name')}
                canDelete={false}
              />
            </div>
            <div className="w-full">
              <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
                Gender
              </div>
              <div className="w-full flex flex-row gap-[1.75rem]">
                <RadioButton
                  value={GenderType.FEMALE as string}
                  setValue={(value: string) =>
                    setUserData({
                      ...userData,
                      gender: value as GenderType,
                    })
                  }
                  isOn={userData.gender === GenderType.FEMALE}
                />
                <RadioButton
                  value={GenderType.MALE as string}
                  setValue={(value: string) =>
                    setUserData({
                      ...userData,
                      gender: value as GenderType,
                    })
                  }
                  isOn={userData.gender === GenderType.MALE}
                />
                <RadioButton
                  value={GenderType.NONE as string}
                  setValue={(value: string) =>
                    setUserData({
                      ...userData,
                      gender: value as GenderType,
                    })
                  }
                  isOn={userData.gender === GenderType.NONE}
                />
              </div>
            </div>
            {/* 생년월일 선택 */}
            <div className="w-full">
              <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
                Date of birth
              </div>
              <Dropdown
                value={userData.birth.replace(/-/g, '/')}
                placeholder="Select Date"
                options={[]}
                isCalendar={true}
                setValue={(value) => setUserData({ ...userData, birth: value })}
              />
            </div>
            {/* 국적 선택 */}
            <div className="w-full">
              <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
                Nationality
              </div>
              <Dropdown
                value={userData.nationality}
                placeholder="Select Nationality"
                options={country}
                setValue={(value: string) =>
                  setUserData({ ...userData, nationality: value })
                }
              />
            </div>
            {/* 비자 선택 */}
            <div className="w-full">
              <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
                Visa Status
              </div>
              <Dropdown
                value={userData.visa}
                placeholder="Select Visa Status"
                options={visa}
                setValue={(value: string) =>
                  setUserData({ ...userData, visa: value as VisaType })
                }
              />
            </div>
            {/* 전화번호 선택, dropdown으로 앞 번호를, 중간 번호와 뒷 번호는 각각 input으로 입력 받음 */}
            <div className="w-full">
              <div className="w-full flex flex-row items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
                Telephone No.
              </div>
              <div className="w-full flex flex-row gap-2 justify-between">
                <div className="w-full h-[2.75rem]">
                  <Dropdown
                    value={phoneNum.start}
                    placeholder="+82"
                    options={phone}
                    setValue={(value) =>
                      setPhoneNum({ ...phoneNum, start: value })
                    }
                  />
                </div>
                <Input
                  inputType={InputType.TEXT}
                  placeholder="0000"
                  value={phoneNum.middle}
                  onChange={(value) =>
                    setPhoneNum({ ...phoneNum, middle: value })
                  }
                  canDelete={false}
                />
                <Input
                  inputType={InputType.TEXT}
                  placeholder="0000"
                  value={phoneNum.end}
                  onChange={(value) => setPhoneNum({ ...phoneNum, end: value })}
                  canDelete={false}
                />
              </div>
            </div>
          </div>
          <div className="pb-[2.5rem] px-6 w-full fixed bottom-0 bg-grayGradient">
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
      ) : (
        <div>로딩 중</div>
      )}
    </>
  );
};

export default EditProfilePage;
