import {
  EducationLevelInfo,
  genderInfo,
  JobCategoryInfo,
  VisaInfo,
} from '@/constants/post';
import { Gender } from '@/types/api/users';
import {
  EducationLevel,
  JobCategory,
  VisaGroup,
} from '@/types/postCreate/postCreate';

// 입력 데이터에서 한글을 제거, 숫자만 남겨 반환하는 함수
export const extractNumbersAsNumber = (str: string): number => {
  const numbers = str.replace(/[^0-9]/g, '');
  return numbers ? parseInt(numbers) : 0;
};

// map에서 name으로 key를 찾는 함수
export type JobCategoryNames =
  (typeof JobCategoryInfo)[keyof typeof JobCategoryInfo]['name'];

export const findJobCategoryByNameStrict = (
  name: JobCategoryNames,
): JobCategory | undefined => {
  const entry = Object.entries(JobCategoryInfo).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value.name === name,
  );
  return entry ? (entry[1].key as JobCategory) : undefined;
};

// map에서 name으로 key를 찾는 함수
export type EducationCategoryNames =
  (typeof EducationLevelInfo)[keyof typeof EducationLevelInfo]['name'];

export const findEducationLevelByNameStrict = (
  name: EducationCategoryNames,
): EducationLevel | undefined => {
  const entry = Object.entries(EducationLevelInfo).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value.name === name,
  );
  return entry ? (entry[1].key as EducationLevel) : undefined;
};

// map에서 name으로 key를 찾는 함수
export type VisaCategoryNames =
  (typeof VisaInfo)[keyof typeof VisaInfo]['name'];

export const findVisaByNameStrict = (
  name: VisaCategoryNames,
): VisaGroup | undefined => {
  const entry = Object.entries(VisaInfo).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value.name === name,
  );
  return entry ? (entry[1].key as VisaGroup) : undefined;
};

// map에서 name으로 key를 찾는 함수
export type GenderCategoryNames =
  (typeof genderInfo)[keyof typeof genderInfo]['name'];

export const findGenderByNameStrict = (
  name: GenderCategoryNames,
): Gender | undefined => {
  const entry = Object.entries(genderInfo).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value.name === name,
  );
  return entry ? (entry[1].key as Gender) : undefined;
};
