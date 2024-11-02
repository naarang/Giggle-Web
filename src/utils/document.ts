import {
  EmployerInformation,
  LaborContractEmployerInfo,
  WorkDayTime,
} from '@/types/api/document';
import { Address } from '@/types/api/users';
import { extractNumbersAsNumber } from './post';

// 객체의 모든 프로퍼티가 공백이 아닌지 확인하는 함수
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotEmpty = (obj: Record<string, any>): boolean => {
  return Object.values(obj).every((value) => {
    // null 또는 undefined 체크
    if (value === null || value === undefined) {
      return false;
    }

    // 문자열인 경우 trim()으로 공백 제거 후 길이 확인
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }

    // 숫자나 불리언 등 다른 타입은 true 반환
    return true;
  });
};

export const workDayTimeToString = (workDayTimes: WorkDayTime[]): string => {
  // 요일만 추출하여 배열로 만들기
  const daysOfWeek = workDayTimes.map((wdt) => wdt.day_of_week);

  // 첫 번째 항목의 시간 정보 가져오기 (모든 요일의 시간이 같다고 가정)
  const { work_start_time, work_end_time } = workDayTimes[0];

  return `${arrayToString(daysOfWeek)} / ${work_start_time} - ${work_end_time}`;
};

export const getDetailAddress = (value: Address) => {
  return value.address_detail;
};

export const arrayToString = (array: string[]): string => {
  return array
    .map(
      (item) => item.charAt(0).toUpperCase() + item.slice(1, 3).toLowerCase(),
    )
    .join(',');
};

export const propertyToString = (value: string) => {
  if (['South Korea', 'SOUTH_KOREA'].includes(value)) return 'South Korea';
  const spaceConverted = value.replace(/_/g, ' ');
  return (
    spaceConverted.charAt(0).toUpperCase() +
    spaceConverted.slice(1).toLowerCase()
  );
};

// 고용주 시간제 근무 허가서 수정 양식 유효성 검사 함수
export const validateEmployerInformation = (
  info: EmployerInformation,
): boolean => {
  const companyRegistrationNumPattern = /^\d{3}\/\d{2}\/\d{5}$/;
  // 빈 문자열 체크
  if (
    !info.company_name ||
    !info.job_type ||
    !info.name ||
    !info.phone_number
  ) {
    return false;
  }

  // 사업자등록번호 유효성 검사 (000/00/00000) 양식
  if (!info.company_registration_number || !companyRegistrationNumPattern.test(info.company_registration_number)) {
    return false;
  }

  // 시급 유효성 검사(0이 아닌지)
  if (
    !info.hourly_rate ||
    extractNumbersAsNumber(String(info.hourly_rate)) === 0
  ) {
    return false;
  }

  // 근무일 체크
  if (!info.work_days_weekdays || !info.work_days_weekends) {
    return false;
  }

  // 주소 체크
  if (!info.address?.region_1depth_name) {
    return false;
  }

  return true;
};

// 근로계약서 수정 양식 유효성 검사 함수
export const validateLaborContractEmployerInformation = (
  info: LaborContractEmployerInfo,
): boolean => {
  const companyRegistrationNumPattern = /^\d{3}\/\d{2}\/\d{5}$/;
  // 빈 문자열 체크
  if (
    !info.company_name ||
    !info.name ||
    !info.description ||
    !info.phone_number
  ) {
    console.log('문자열');
    return false;
  }

  // 사업자등록번호 유효성 검사 (12자리 숫자)
  if (!info.company_registration_number || !companyRegistrationNumPattern.test(info.company_registration_number)) {
    return false;
  }

  // 시급 유효성 검사(0이 아닌지)
  if (
    !info.hourly_rate ||
    extractNumbersAsNumber(String(info.hourly_rate)) === 0
  ) {
    console.log('시급');
    return false;
  }

  // 급료 지급일 유효성 검사(0이 아닌지)
  if (
    !info.payment_day ||
    Number(info.payment_day) > 31 ||
    Number(info.payment_day) < 1
  ) {
    console.log('급료지급일');
    return false;
  }

  // 근무일 체크
  if (!info.work_day_time_list || info.work_day_time_list.length === 0) {
    console.log('근무일');
    return false;
  }

  // 서명 체크
  if (!info.signature_base64 || info.signature_base64 === '') {
    console.log('서명');
    return false;
  }

  // 주소 체크
  if (!info.address?.region_1depth_name) {
    console.log('주소');
    return false;
  }

  return true;
};

// number만 가능한 필드에서 NaN 입력으로 input이 멈추지 않게 값 검증
export const parseStringToSafeNumber = (value: string): number => {
  const numberValue = Number(value);

  if (isNaN(numberValue)) return 0;
  else return numberValue;
};
