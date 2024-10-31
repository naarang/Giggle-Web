import {
  EducationLevelType,
  EducationType,
  LanguageListType,
  PersonalInformationType,
  WorkExperienceType,
} from '@/types/postApply/resumeDetailItem';
import { PostWorkExperienceType } from '@/types/postResume/postWorkExperience';
import { VisaType } from '../postDetail/postDetailItem';

// 자기소개 요청 타입
export type IntroDuctionRequest = {
  introduction?: string;
};

// 경력사항 요청 타입
export type WorkExperienctRequest = PostWorkExperienceType;
/*
  "title" : String, 
  "workplace" : String,
  "start_date" : String(yyyy-MM-dd),
  "end_date" : String(yyyy-MM-dd),
  "description" : String
*/

// 학력 요청 타입
export type EducationRequest = {
  education_level: EducationLevelType; // Enum(BACHELOR, ASSOCIATE, HIGHSCHOOL),
  school_id: number;
  major: string;
  gpa: number;
  start_date: string; // (yyyy-MM-dd)
  end_date: string; // (yyyy-MM-dd)
  grade: number;
};

// 언어 레벨 수정 API 통합시 type property로 사용
export type LanguagesLevelType =
  | 'topic'
  | 'social-integration-program'
  | 'sejong-institute';

export type AdditionalLanguageRequest = {
  language_name: string;
  level: number;
};

export type LanguageSummaryType = {
  id: number;
  language_name: string;
  level: number;
};

export type LanguagesSummariesResponse = {
  topik_level: number;
  social_integration_level: number;
  sejong_institute: number;
  additional_language: LanguageSummaryType[];
};
export type visa = {
  visa: VisaType; //Enum(D_2_1, D_2_2, D_2_3, D_2_4, D_2_6, D_2_7, D_2_8, D_4_1, D_4_7, F_2),
  description: string;
};

export type UserResumeDetailResponse = {
  profile_img_url: string;
  name: string;
  visa: visa;
  personal_information: PersonalInformationType;
  introduction: string;
  work_experience: WorkExperienceType[];
  education: EducationType[];
  languages: LanguageListType;
};
