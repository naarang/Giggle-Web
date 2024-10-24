import { GenderType, VisaType } from "@/constants/profile";

export type UserProfileData = {
  user_information: UserInformationType
  language_level: LanguageLevelType
  meta_data: MetaDataType
};

export type UserInformationType = {
  profile_img_url: string;
  first_name: string;
  last_name: string;
  birth: string;
  school_name: string;
  grade: number;
  gpa: number;
  is_notification_allowed: boolean
}

export type LanguageLevelType = {
  topik_level: number;
  kiip_level: number;
  sejong_level: number
}

export type MetaDataType = {
  weekend_work_hour: number;
  weekday_work_hour: number;
  is_topik_4_or_more: boolean;
  is_metropolitan_area: boolean;
}

export type BookmarkCountType = {
  book_mark_counts: number;
}

export type ApplicationCountType = {
  application_counts: number;
  successful_hire_counts: number;
}

export type UserEditProfileDataType ={
  image?: File; // multipart-form-data 
	body: UserEditBodyType;
}

export type UserEditBodyType = {
  first_name: string;
  last_name: string;
  birth: string; // yyyy-MM-dd
  gender: GenderType; // Enum(MALE, FEMALE, NONE)
  nationality: string;
  visa: VisaType; // Enum(D_2_1, D_2_2, D_2_3, D_2_4, D_2_6, D_2_7, D_2_8, D_4_1, D_4_7, F_2)
  phone_number: string;	
  is_profile_img_changed: boolean;
}

export type UserProfileDetailDataType = {
  profile_img_url: string,
  first_name: string;
  last_name: string;
  birth: string; // yyyy-MM-dd
  gender: GenderType; // Enum(MALE, FEMALE, NONE)
  nationality: string;
  visa: VisaType; // Enum(D_2_1, D_2_2, D_2_3, D_2_4, D_2_6, D_2_7, D_2_8, D_4_1, D_4_7, F_2)
  phone_number: string;
}