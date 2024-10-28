export type VisaType =
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

export type JobCategoryType =
  | 'GENERAL_INTERPRETATION_TRANSLATION'
  | 'FOOD_SERVICE_ASSISTANT'
  | 'GENERAL_ADMINISTRATIVE_SUPPORT'
  | 'ENGLISH_KIDS_CAFE'
  | 'GENERAL_CAFE'
  | 'PART_TIME_WORK'
  | 'TOUR_GUIDE_AND_DUTY_FREE_ASSISTANT'
  | 'MANUFACTURING';

export type WorkPeriodType =
  | 'ONE_DAY'
  | 'LESS_THAN_ONE_WEEK'
  | 'ONE_WEEK_TO_ONE_MONTH'
  | 'ONE_MONTH_TO_THREE_MONTHS'
  | 'THREE_MONTHS_TO_SIX_MONTHS'
  | 'SIX_MONTHS_TO_ONE_YEAR'
  | 'MORE_THAN_ONE_YEAR';

type GenderType = 'MALE' | 'FEMALE' | 'NONE';

type EducationType = 'BACHELOR' | 'ASSOCIATE' | 'HIGHSCHOOL';

export type DayOfWeekType =
  | 'WEEKDAYS'
  | 'WEEKEND'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY'
  | 'NEGOTIABLE';

type EmploymentType = 'PARTTIME' | 'INTERNSHIP';

export type CompanyImageUrlType = {
  id: number;
  img_url: string;
};

export type TagType = {
  is_recruiting: boolean;
  visa: VisaType;
  job_category: JobCategoryType;
};

export type SummariesType = {
  address: string;
  houlry_rate: number;
  work_period: WorkPeriodType;
  work_days_per_week: number;
};

type RecruitmentConditionsType = {
  recruitment_dead_line?: string; //'yyyy-MM-dd'
  education: EducationType;
  number_of_recruits: number;
  visa: VisaType;
  gender: GenderType;
  preferred_conditions: string;
};

type WorkplaceInformationType = {
  main_address: string;
  detailed_address: string;
  distance?: number;
  latitude: number;
  longitude: number;
};

type WorkDayTimesType = {
  day_of_week: DayOfWeekType;
  work_start_time: string; // 'HH:mm'
  work_end_time: string; // 'HH:mm'
};

type WorkingConditionsType = {
  houlry_rate: number;
  work_period: WorkPeriodType;
  work_day_times: WorkDayTimesType[];
  job_category: JobCategoryType;
  employment_type: EmploymentType;
};

type CompanyInformationType = {
  company_address: string;
  representative_name: string;
  recruiter: string;
  contact: string;
  email: string;
};

export type PostDetailItemType = {
  id: number;
  is_my_post: boolean;
  is_book_marked?: boolean;
  company_name: string;
  title: string;
  icon_img_url: string;
  company_img_url_list: CompanyImageUrlType[];
  tags: TagType;
  summaries: SummariesType;
  recruitment_conditions: RecruitmentConditionsType;
  detailed_overview: string;
  workplace_information: WorkplaceInformationType;
  working_conditions: WorkingConditionsType;
  company_information: CompanyInformationType;
  created_at: string; // 'yyyy-MM-ddTHH:mm:ss'
};
