import { School } from '@/types/api/document';
import { EducationLevelType } from '@/types/postApply/resumeDetailItem';

export type PostEducationType = {
  education_level: EducationLevelType; // Enum(BACHELOR, ASSOCIATE, HIGHSCHOOL),
  school_id: number;
  major: string;
  gpa: number;
  start_date: string; // yyyy-MM-dd
  end_date: string; // yyyy-MM-dd
  grade: number;
};

export type SchoolSummary = {
  id: number;
  name: string;
};

export type GetEducationType = {
  education_level: EducationLevelType; // Enum(BACHELOR, ASSOCIATE, HIGHSCHOOL),
  school: SchoolSummary;
  major: string;
  gpa: number;
  start_date: string; // yyyy-MM-dd
  end_date: string; // yyyy-MM-dd
  grade: number;
};

export type InitailEducationType = {
  education_level: string | undefined; // Enum(BACHELOR, ASSOCIATE, HIGHSCHOOL),
  school_id: number | undefined;
  major: string | undefined;
  gpa: number | undefined;
  start_date: string | undefined; // yyyy-MM-dd
  end_date: string | undefined; // yyyy-MM-dd
  grade: number | undefined;
};

export const InitialEducationData = {
  education_level: '', // Enum(BACHELOR, ASSOCIATE, HIGHSCHOOL),
  school_id: undefined,
  major: '',
  gpa: undefined,
  start_date: '', // yyyy-MM-dd
  end_date: '', // yyyy-MM-dd
  grade: undefined,
};
