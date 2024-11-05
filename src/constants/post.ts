import { Gender } from '@/types/api/users';
import {
  EducationLevel,
  JobCategory,
  VisaGroup,
} from '@/types/postCreate/postCreate';
import { EducationCategoryNames, JobCategoryNames } from '@/utils/post';

export const JobCategoryInfo = {
  [JobCategory.GENERAL_INTERPRETATION_TRANSLATION]: {
    name: '일반통역/번역',
    key: 'GENERAL_INTERPRETATION_TRANSLATION',
  },
  [JobCategory.FOOD_SERVICE_ASSISTANT]: {
    name: '음식업보조',
    key: 'FOOD_SERVICE_ASSISTANT',
  },
  [JobCategory.GENERAL_ADMINISTRATIVE_SUPPORT]: {
    name: '일반 사무보조',
    key: 'GENERAL_ADMINISTRATIVE_SUPPORT',
  },
  [JobCategory.ENGLISH_KIDS_CAFE]: {
    name: '영어키즈카페',
    key: 'ENGLISH_KIDS_CAFE',
  },
  [JobCategory.GENERAL_CAFE]: {
    name: '일반카페',
    key: 'GENERAL_CAFE',
  },
  [JobCategory.PART_TIME_WORK]: {
    name: '놀이보조',
    key: 'PART_TIME_WORK',
  },
  [JobCategory.TOUR_GUIDE_AND_DUTY_FREE_ASSISTANT]: {
    name: '관광안내보조 및 면세점판매보조',
    key: 'TOUR_GUIDE_AND_DUTY_FREE_ASSISTANT',
  },
  [JobCategory.MANUFACTURING]: {
    name: '제조업',
    key: 'MANUFACTURING',
  },
} as const;

export const JobCategoryList: JobCategoryNames[] = [
  '일반통역/번역',
  '음식업보조',
  '일반 사무보조',
  '영어키즈카페',
  '일반카페',
  '놀이보조',
  '관광안내보조 및 면세점판매보조',
  '제조업',
];

export const EducationList: EducationCategoryNames[] = [
  '대학(4년제)',
  '대학(2년제)',
  '고등학교졸업',
  '무관',
];

export const EducationLevelInfo = {
  [EducationLevel.BACHELOR]: {
    name: '대학(4년제)',
    key: 'BACHELOR',
  },
  [EducationLevel.ASSOCIATE]: {
    name: '대학(2년제)',
    key: 'ASSOCIATE',
  },
  [EducationLevel.HIGHSCHOOL]: {
    name: '고등학교졸업',
    key: 'HIGHSCHOOL',
  },
  [EducationLevel.NONE]: {
    name: '무관',
    key: 'NONE',
  },
} as const;

export const VisaList = ['D-2(외국인유학생)', 'D-4(어학연수)', 'F-2(취업)'];

export const VisaInfo = {
  [VisaGroup.D_2]: {
    name: 'D-2(외국인유학생)',
    key: 'D_2',
  },
  [VisaGroup.D_4]: {
    name: 'D-4(어학연수)',
    key: 'D_4',
  },
  [VisaGroup.F_2]: {
    name: 'F-2(취업)',
    key: 'F_2',
  },
} as const;

export const GenderList = ['남', '여', '무관'];

export const genderInfo = {
  [Gender.MALE]: {
    name: '남',
    key: 'MALE',
  },
  [Gender.FEMALE]: {
    name: '여',
    key: 'FEMALE',
  },
  [Gender.NONE]: {
    name: '무관',
    key: 'NONE',
  },
} as const;
