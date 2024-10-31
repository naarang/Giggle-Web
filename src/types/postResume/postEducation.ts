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
  education_level: string | null; // Enum(BACHELOR, ASSOCIATE, HIGHSCHOOL),
  school_id: number | null;
  major: string | null;
  gpa: string | null;
  start_date: string | null; // yyyy-MM-dd
  end_date: string | null; // yyyy-MM-dd
  grade: string | null;
};

export const InitialEducationData = {
  education_level: '', // Enum(BACHELOR, ASSOCIATE, HIGHSCHOOL),
  school_id: null,
  major: '',
  gpa: '',
  start_date: '', // yyyy-MM-dd
  end_date: '', // yyyy-MM-dd
  grade: '',
};
