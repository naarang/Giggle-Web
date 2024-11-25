import Button from '@/components/Common/Button';
import Dropdown from '@/components/Common/Dropdown';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import Input from '@/components/Common/Input';
import RadioButton from '@/components/Information/RadioButton';
import EditProfilePicture from '@/components/Profile/EditProfilePicture';
import { buttonTypeKeys } from '@/constants/components';
import { GenderType } from '@/constants/profile';
import {
  InitialUserProfileDetail,
  UserEditRequestBody,
} from '@/types/api/profile';
import { InputType } from '@/types/common/input';
import {
  changeValidData,
  transformToProfileRequest,
} from '@/utils/editProfileData';
import { useEffect, useState } from 'react';
import { country, phone, visa } from '@/constants/information';
import useNavigateBack from '@/hooks/useNavigateBack';
import { useGetUserProfile, usePatchUserProfile } from '@/hooks/api/useProfile';

const EditProfilePage = () => {
  const { data: userProfile } = useGetUserProfile();
  const { mutate } = usePatchUserProfile();

  const [isChanged, setIsChanged] = useState(false);
  const [originalData, setOriginalData] = useState<UserEditRequestBody>();
  const [userData, setUserData] = useState<UserEditRequestBody>(
    InitialUserProfileDetail,
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [phoneNum, setPhoneNum] = useState({
    start: '',
    middle: '',
    end: '',
  });

  const handleBackButtonClick = useNavigateBack();

  const handleSubmit = () => {
    // API - 3.5 (유학생) 프로필 수정
    if (!userData) return;

    // api 요청 형식과 일치시키는 함수(유효성 검증)
    const transformedData = changeValidData(
      userData as UserEditRequestBody,
      phoneNum,
      Boolean(profileImage), // 이미지 변경 여부 확인
    );

    const formData = new FormData();
    // 이미지가 있을 경우 FormData에 추가
    if (profileImage) {
      formData.append('image', profileImage);
    }
    // JSON 데이터를 Blob으로 변환 후 FormData에 추가
    formData.append(
      'body',
      new Blob([JSON.stringify(transformedData)], {
        type: 'application/json',
      }),
    );
    // mutate 호출
    mutate(formData);
  };

  // 전화번호를 3개의 파트로 구분
  useEffect(() => {
    if (userData?.phone_number) {
      const [start, middle, end] = userData.phone_number.split('-');
      setPhoneNum({ start, middle, end });
    }
  }, [userData]);

  // 수정을 위한 초기 데이터 세팅
  useEffect(() => {
    if (userProfile) {
      const initailData = transformToProfileRequest(userProfile.data);
      setOriginalData(initailData);
      setUserData(initailData);
    }
  }, [userProfile]);

  // 수정 여부를 확인(프로필 사진만 변경했을 경우 포함)
  useEffect(() => {
    if (profileImage || userProfile === originalData) {
      setIsChanged(true);
    }
  }, [userProfile, profileImage]);

  return (
    <>
      {userProfile && (
        <div className="w-full h-full">
          <BaseHeader
            hasBackButton={true}
            onClickBackButton={handleBackButtonClick}
            hasMenuButton={false}
            title="Edit Profile"
          />
          <div className="flex flex-col px-6 gap-9 mb-32">
            <EditProfilePicture
              profileImgUrl={userProfile.data.profile_img_url}
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
                onChange={(value) =>
                  setUserData({
                    ...userData,
                    first_name: value,
                  })
                }
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
                onChange={(value) =>
                  setUserData({
                    ...userData,
                    last_name: value,
                  })
                }
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
                  setUserData({ ...userData, visa: value })
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
              bgColor={isChanged ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
              fontColor={isChanged ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
              onClick={isChanged ? handleSubmit : undefined}
              isBorder={false}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfilePage;
