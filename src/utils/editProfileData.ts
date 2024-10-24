import { GenderType, NationalityType, VisaType } from "@/constants/profile";
import { UserEditProfileDataType, UserProfileDetailDataType } from "@/types/api/profile";

// GET 데이터를 PATCH 요청 데이터로 변환
export const transformToEditProfileData = (
  userData: UserProfileDetailDataType,
  phoneNum: { start: string; middle: string; end: string },
  profileImage: File | null,
  isProfileImgChanged: boolean,
): UserEditProfileDataType => {
  return {
    image: profileImage || undefined,
    body: {
      first_name: userData.first_name,
      last_name: userData.last_name,
      birth: userData.birth.replace(/\//g, '-'),
      gender: userData.gender.toUpperCase() as GenderType,
      nationality: userData.nationality.toUpperCase().replace(/ /g, '_') as NationalityType,
      visa: userData.visa.replace(/-/g, '_') as VisaType,
      // phone_number 통합
      phone_number: `${phoneNum.start}-${phoneNum.middle}-${phoneNum.end}`,
      is_profile_img_changed: isProfileImgChanged,
    },
  };
};