type VisaType =
  | 'D_2_1'
  | 'D_2_2'
  | 'D_2_3'
  | 'D_2_4'
  | 'D_2_6'
  | 'D_2_7'
  | 'D_2_8'
  | 'D_4_1'
  | 'D_4_7'
  | 'F_2';

export type EducationLevelType = 'BACHELOR' | 'ASSOCIATE' | 'HIGHSCHOOL';

export type WorkExperienceType = {
  id: number;
  title: string;
  description: string;
  start_date: string; // yyyy-MM-dd
  end_date?: string; // yyyy-MM-dd
  duration: number;
  work_place?: string; // 마이페이지 적용
};

export type EducationType = {
  id: number;
  education_level: EducationLevelType;
  school_name: string;
  major: string;
  start_date: string;
  end_date: string;
  grade: number;
};

export type LanguageType = {
  id: number;
  laguage_name: string;
  level: number;
};

export type LanguageListType = {
  topik: number;
  social_integration: number;
  sejong_institute: number;
  etc: LanguageType[];
};

export type VisaListType = {
  visa: VisaType;
  description: string;
};

export type PersonalInformationType = {
  main_address: string;
  detailed_address: string;
  phone_number: string;
  email: string;
};

export type ResumeDetailItemType = {
  profile_img_url: string;
  name: string;
  visa: VisaListType;
  personal_information: PersonalInformationType;
  introduction: string;
  work_experience: WorkExperienceType[];
  education: EducationType[];
  languages: LanguageListType;
};
