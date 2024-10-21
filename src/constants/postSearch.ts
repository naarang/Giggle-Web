export const enum FILTER_CATEGORY {
  REGION_1DEPTH = 'Region 1depth', // 시, 도
  REGION_2DEPTH = 'Region 2depth', // 구
  REGION_3DEPTH = 'Region 3depth', // 동
  INDUSTRY = 'Industry',
  WORK_PERIOD = 'Work Period',
  WORK_DAYS_PER_WEEK = 'Work Days Per Week',
  WORKING_DAY = 'Working Day',
  WORKING_HOURS = 'Working Hours',
  RECRUITMENT_PERIOD = 'Recruitment Period',
  EMPLOYMENT_TYPE = 'Employment Type',
  VISA = 'Visa',
}

type FilterOptionsType = {
  [key in FILTER_CATEGORY]: string[];
};

// 카테고리 별로 문자열 배열을 가지는 객체
export const FILTER_CATEGORY_OPTIONS: FilterOptionsType = {
  [FILTER_CATEGORY.REGION_1DEPTH]: ['서울시', '부산시', '인천시'], // 시, 도 예시
  [FILTER_CATEGORY.REGION_2DEPTH]: ['강북구', '강남구', '종로구'], // 구 예시
  [FILTER_CATEGORY.REGION_3DEPTH]: ['미아동', '삼성동', '서초동'], // 동 예시
  [FILTER_CATEGORY.INDUSTRY]: [
    'Translation',
    'Food Service Assistant',
    'Office Assistant',
    'English Kids Cafe',
    'General Cafe',
    'Play Assistant',
    'Tourism Guide & Duty-Free Store Assistant',
    'Manufacturing Industry',
  ],
  [FILTER_CATEGORY.WORK_PERIOD]: [
    '1 day',
    'Less than a week',
    '1 week - 1 month',
    '1 month - 3 months',
    '3 month - 6 months',
    '6 month - 1 year',
    'More than 1 year',
  ],
  [FILTER_CATEGORY.WORK_DAYS_PER_WEEK]: [
    '1 days',
    '2 days',
    '3 days',
    '4 days',
    '5 days',
    '6 days',
  ],
  [FILTER_CATEGORY.WORKING_DAY]: [
    'Weekdays',
    'Weekend',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Negotiable',
  ],
  [FILTER_CATEGORY.WORKING_HOURS]: [
    'Morning',
    'Afternoon',
    'Evening',
    'Full day',
    'Dawn',
    'Evening - Night',
    'Evening - Dawn',
    'Dawn - Morning',
    'Negotiable hours',
  ],
  [FILTER_CATEGORY.RECRUITMENT_PERIOD]: ['Opening', 'Closed'],
  [FILTER_CATEGORY.EMPLOYMENT_TYPE]: ['Part-time', 'Internship'],
  [FILTER_CATEGORY.VISA]: ['D-2', 'D-4', 'F-2'],
};
