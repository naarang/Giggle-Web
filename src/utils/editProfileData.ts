import { GenderType, NationalityType, VisaType } from '@/constants/profile';
import {
  EmployerProfileDetailResponse,
  EmployerProfileRequestBody,
  UserEditProfileRequest,
  UserProfileDetailDataType,
} from '@/types/api/profile';

// GET 데이터를 PATCH 요청 데이터로 변환
export const transformToProfileRequest = (
  userData: UserProfileDetailDataType,
  phoneNum: { start: string; middle: string; end: string },
  profileImage: File | null,
  isProfileImgChanged: boolean,
): UserEditProfileRequest => {
  return {
    image: profileImage || undefined,
    body: {
      first_name: userData.first_name,
      last_name: userData.last_name,
      birth: userData.birth.replace(/\//g, '-'),
      gender: userData.gender.toUpperCase() as GenderType,
      nationality: userData.nationality
        .toUpperCase()
        .replace(/ /g, '_') as NationalityType,
      visa: userData.visa.replace(/-/g, '_') as VisaType,
      // phone_number 통합
      phone_number: `${phoneNum.start}-${phoneNum.middle}-${phoneNum.end}`,
      is_profile_img_changed: isProfileImgChanged,
    },
  };
};

export const transformToEmployerProfileRequest = (
  data: EmployerProfileDetailResponse,
): EmployerProfileRequestBody => {
  return {
    owner_info: {
      company_name: data.company_name,
      owner_name: data.owner_name,
      company_registration_number: data.company_registration_number,
      phone_number: data.phone_number,
    },
    address: {
      address_name: data.address.address_name,
      region_1depth_name: data.address.region_1depth_name,
      region_2depth_name: data.address.region_2depth_name,
      region_3depth_name: data.address.region_3depth_name,
      region_4depth_name: data.address.region_4depth_name,
      address_detail: data.address.address_detail,
      longitude: data.address.longitude,
      latitude: data.address.latitude,
    },
    is_icon_img_changed: false,
  };
};
