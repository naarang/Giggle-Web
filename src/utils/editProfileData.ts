import { UserEditProfileDataType, UserProfileDetailDataType } from "@/types/api/profile";

// GET 데이터를 PATCH 요청 데이터로 변환
export const transformToEditProfileData = (
  userData: UserProfileDetailDataType,
  profileImage: File | null,
  isProfileImgChanged: boolean,
): UserEditProfileDataType => {
  return {
    image: profileImage || undefined,
    body: {
      first_name: userData.first_name,
      last_name: userData.last_name,
      birth: userData.birth,
      gender: userData.gender,
      nationality: userData.nationality,
      visa: userData.visa,
      phone_number: userData.phone_number,
      is_profile_img_changed: isProfileImgChanged,
    },
  };
};