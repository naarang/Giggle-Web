export type UserLanguageRequest = {
  language: 'KOREAN' | 'VIETNAMESE' | 'UZBEK' | 'TURKISH' | 'ENGLISH'
}

export type UserProfileBody = {
  first_name: string;
  last_name: string;
  birth: string; // (yyyy-MM-dd)
  gender: 'MALE' | 'FEMALE' | 'NONE'; // Enum(MALE, FEMALE, NONE)
  nationality: string;
  visa: 'D_2_1' | 'D_2_2' | 'D_2_3' | 'D_2_4' | 'D_2_6' | 'D_2_7' | 'D_2_8' | 'D_4_1' | 'D_4_7' | 'F_2'; // Enum
  phone_number: string;
  is_profile_img_changed: boolean;
};