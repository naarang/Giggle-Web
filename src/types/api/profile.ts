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
  profile_img_url: string;
  first_name: string;
  last_name: string;
  birth: string;
  gender: string;
  nationality: string;
  visa_satus: string;
  telephone_number: string;
}