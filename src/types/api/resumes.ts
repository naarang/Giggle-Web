import { EducationLevelType } from "@/types/postApply/resumeDetailItem";
import { PostWorkExperienceType } from "@/types/postResume/postWorkExperience";

// 자기소개 요청 타입
export type IntroDuctionRequest = {
    introduction?: string;
}

// 경력사항 요청 타입
export type WorkExperienctRequest = PostWorkExperienceType
/*
  "title" : String, 
  "workplace" : String,
  "start_date" : String(yyyy-MM-dd),
  "end_date" : String(yyyy-MM-dd),
  "description" : String
*/

// 학력 요청 타입
export type EducationRequest = {
  education_level : EducationLevelType; // Enum(BACHELOR, ASSOCIATE, HIGHSCHOOL),
  school_id : number;
  major : string;
  gpa : number;
  start_date : string; // (yyyy-MM-dd)
  end_date : string; // (yyyy-MM-dd)
  grade : number;
}

// 언어 레벨 수정 API 통합시 type property로 사용
export type LanguagesLevelType = 'topic' | 'social-integration-program' | 'sejong-institute'

export type AdditionalLanguageRequest = {
	language_name : string;
	level : number;
}