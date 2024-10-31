import {
  EducationType,
  LanguageListType,
  WorkExperienceType,
} from '@/types/postApply/resumeDetailItem';

export type MypageCardType = {
  title: string;
  description: string[];
};

export type ResumeDataState = {
  introductionData: string | '';
  workexperienceData: WorkExperienceType[] | [];
  educationData: EducationType[] | [];
  languageData: LanguageListType;
};

export type MypageCardData =
  | string
  | WorkExperienceType[]
  | EducationType[]
  | LanguageListType
  | null;

export type EtcLanguageData = {
  id: number;
  country_name: string;
  language: string;
  img_url: string;
};
