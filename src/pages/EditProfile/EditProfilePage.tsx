import Button from '@/components/Common/Button';
import Dropdown, { DropdownModal } from '@/components/Common/Dropdown';
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
  validateChanges,
  validateFieldValues,
} from '@/utils/editProfileData';
import { useEffect, useState } from 'react';
import { country, phone, visa } from '@/constants/information';
import useNavigateBack from '@/hooks/useNavigateBack';
import { useGetUserProfile, usePatchUserProfile } from '@/hooks/api/useProfile';
import { useAddressSearch } from '@/hooks/api/useAddressSearch';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

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

  const {
    addressInput, // 주소 검색용 input 저장하는 state
    addressSearchResult, // 주소 검색 결과를 저장하는 array
    currentGeoInfo, // 지도에 표시할 핀에 사용되는 위/경도 좌표
    setCurrentGeoInfo,
    handleAddressSearch, // 검색할 주소 입력 시 실시간 검색
    handleAddressSelect, // 검색 결과 중 원하는 주소를 선택할 시 state에 입력
    setAddressInput,
  } = useAddressSearch(userData.address);

  const handleBackButtonClick = useNavigateBack();

  // 검색된 주소 선택 시 state에 반영
  const handleAddressSelection = (selectedAddressName: string) => {
    const result = handleAddressSelect(selectedAddressName);
    if (!result) return;

    setUserData({
      ...userData,
      address: {
        ...userData.address,
        ...result.addressData,
      },
    });
    setAddressInput(result.selectedAddressName);
  };

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
      setAddressInput(userProfile.data.address?.address_name ?? '');
      setCurrentGeoInfo({
        lat: userProfile.data.address?.latitude ?? 0,
        lon: userProfile.data.address?.longitude ?? 0,
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (addressInput !== '') handleAddressSearch(addressInput);
  }, []);

  // 수정 여부를 확인(프로필 사진만 변경했을 경우 포함)
  useEffect(() => {
    if (
      originalData &&
      validateChanges(originalData, userData, phoneNum) &&
      validateFieldValues(userData, phoneNum)
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [userData, originalData, phoneNum]);

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
          <div className="flex flex-col px-6 gap-4 mb-32">
            <EditProfilePicture
              profileImgUrl={userProfile.data.profile_img_url}
              onImageUpdate={setProfileImage}
            />
            {/* 이름 작성 */}
            <InputLayout title="First Name" isEssential={true}>
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
            </InputLayout>
            {/* 성 작성 */}
            <InputLayout title="Last Name" isEssential={true}>
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
            </InputLayout>
            <InputLayout title="Gender" isEssential={true}>
              <div className="w-full flex flex-row gap-[1.75rem]">
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
            </InputLayout>
            {/* 생년월일 선택 */}
            <InputLayout title="Date of birth" isEssential={false} isOptional>
              <Dropdown
                value={userData.birth.replace(/-/g, '/')}
                placeholder="Select Date"
                options={[]}
                isCalendar={true}
                setValue={(value) => setUserData({ ...userData, birth: value })}
              />
            </InputLayout>
            {/* 국적 선택 */}
            <InputLayout title="Nationality" isEssential={false} isOptional>
              <Dropdown
                value={userData.nationality}
                placeholder="Select Nationality"
                options={country}
                setValue={(value: string) =>
                  setUserData({ ...userData, nationality: value })
                }
              />
            </InputLayout>
            <div className="w-full flex flex-col gap-[1.125rem]">
              {/* 주소 검색 입력 input */}
              <InputLayout title="Address" isEssential={false} isOptional>
                <Input
                  inputType={InputType.SEARCH}
                  placeholder="Search Your Address"
                  value={addressInput}
                  onChange={(value) => handleAddressSearch(value)}
                  canDelete={false}
                />
                {/* 주소 검색 결과 보여주는 dropdown modal */}
                {addressSearchResult && addressSearchResult.length !== 0 && (
                  <DropdownModal
                    value={userData.address.address_name}
                    options={Array.from(
                      addressSearchResult.map(
                        (address) => address.address_name,
                      ),
                    )}
                    onSelect={handleAddressSelection}
                  />
                )}
              </InputLayout>
              {/* 검색한 위치를 보여주는 지도 */}
              {userData.address.address_name !== '' && (
                <>
                  <div className="w-full rounded-xl z-0">
                    <Map
                      center={{
                        lat: currentGeoInfo.lat,
                        lng: currentGeoInfo.lon,
                      }}
                      style={{ width: '100%', height: '200px' }}
                      className="rounded-xl"
                    >
                      <MapMarker
                        position={{
                          lat: currentGeoInfo.lat,
                          lng: currentGeoInfo.lon,
                        }}
                      ></MapMarker>
                    </Map>
                  </div>
                  <InputLayout
                    title="Detailed Address"
                    isEssential={false}
                    isOptional
                  >
                    <Input
                      inputType={InputType.TEXT}
                      placeholder="ex) 101dong"
                      value={userData.address.address_detail}
                      onChange={(value) =>
                        userData.address.address_detail &&
                        userData.address.address_detail.trim().length < 100 &&
                        setUserData({
                          ...userData,
                          address: {
                            ...userData.address,
                            address_detail: value,
                          },
                        })
                      }
                      canDelete={false}
                    />
                  </InputLayout>
                </>
              )}
            </div>
            {/* 비자 선택 */}
            <InputLayout title="Visa Status" isEssential={true}>
              <Dropdown
                value={userData.visa}
                placeholder="Select Visa Status"
                options={visa}
                setValue={(value: string) =>
                  setUserData({ ...userData, visa: value })
                }
              />
            </InputLayout>
            {/* 전화번호 선택, dropdown으로 앞 번호를, 중간 번호와 뒷 번호는 각각 input으로 입력 받음 */}
            <InputLayout title="Telephone No." isEssential={true}>
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
            </InputLayout>
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
