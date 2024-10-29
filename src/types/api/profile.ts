import { GenderType, VisaType } from '@/constants/profile';
import { OwnerInfo } from './employ';
import { Address } from './users';

export type LanguageLevelType = {
  topik_level: number;
  kiip_level: number;
  sejong_level: number;
};

export type MetaDataType = {
  weekend_work_hour: number;
  weekday_work_hour: number;
  is_language_skill_4_or_more: boolean;
  is_metropolitan_area: boolean;
};

export type BookmarkCountType = {
  book_mark_counts: number;
};

export type ApplicationCountType = {
  application_counts: number;
  successful_hire_counts: number;
};

export type UserProfileSummaryResponse = {
  user_information: UserProfileResponse;
  language_level: LanguageLevelType;
  meta_data: MetaDataType;
};

export type UserProfileResponse = {
  profile_img_url: string;
  first_name: string;
  last_name: string;
  birth: string;
  school_name: string;
  grade: number;
  gpa: number;
  is_notification_allowed: boolean;
};

export type UserEditProfileRequest = {
  image?: File; // multipart-form-data
  body: UserEditBodyRequest;
};

export type UserEditBodyRequest = {
  first_name: string;
  last_name: string;
  birth: string; // yyyy-MM-dd
  gender: string; // Enum(MALE, FEMALE, NONE)
  nationality: string;
  visa: string; // Enum(D_2_1, D_2_2, D_2_3, D_2_4, D_2_6, D_2_7, D_2_8, D_4_1, D_4_7, F_2)
  phone_number: string;
  is_profile_img_changed: boolean;
};

export type UserProfileDetailDataType = {
  profile_img_url: string;
  first_name: string;
  last_name: string;
  birth: string; // yyyy-MM-dd
  gender: GenderType; // Enum(MALE, FEMALE, NONE)
  nationality: string;
  visa: VisaType; // Enum(D_2_1, D_2_2, D_2_3, D_2_4, D_2_6, D_2_7, D_2_8, D_4_1, D_4_7, F_2)
  phone_number: string;
};

// 고용주 프로필
export type AddressResponse = {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name: string;
  address_detail: string;
  longitude: number;
  latitude: number;
};

export type EmployerProfileDetailResponse = {
  company_name: string;
  owner_name: string;
  address: AddressResponse;
  company_registration_number: string;
  phone_number: string;
  logo_img_url: string;
};

export type EmployerProfileResponse = {
  icon_img_url: string;
  company_name: string;
  is_notification_allowed: boolean;
};

export type EmployerCountsInfoResponse = {
  job_postings_counts: number;
  applicants_counts: number;
  successful_hire_counts: number;
};

export type EmployerProfileRequestBody = {
  owner_info: OwnerInfo;
  address: Address;
  is_icon_img_changed: boolean;
};

export type EmployerProfileRequest = {
  image: File | undefined;
  body: EmployerProfileRequestBody;
};

// Initial State
export const initialEmployerProfile: EmployerProfileRequestBody = {
  owner_info: {
    company_name: '',
    owner_name: '',
    company_registration_number: '',
    phone_number: '',
  },
  address: {
    address_name: '',
    region_1depth_name: '',
    region_2depth_name: '',
    region_3depth_name: '',
    region_4depth_name: '',
    address_detail: '',
    longitude: 0,
    latitude: 0,
  },
  is_icon_img_changed: false,
};

export const mapResponseToRequest = (
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
