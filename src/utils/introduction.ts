import { InitailEducationType } from "@/types/postResume/postEducation";

export const isPostEducationType = (data: InitailEducationType)=> {
  const {
    education_level,
    school_id,
    major,
    gpa,
    start_date,
    end_date,
    grade,
  } = data;

  return (
    education_level !== undefined &&
    education_level.trim() !== '' &&
    school_id > 0 &&
    typeof major === 'string' &&
    major.trim() !== '' &&
    typeof gpa === 'number' ||
    gpa !== 0 &&
    typeof gpa === 'string' &&
    !isNaN(parseFloat(gpa)) &&
    parseFloat(gpa) >= 0 &&
    start_date.trim() !== '' &&
    end_date.trim() !== '' &&
    typeof grade === 'number' ||
    grade !== 0 &&
    grade > 0
  );
};

export const formatGpa = (gpa: string, decimalPlaces: number = 2): number => {
  // 문자열이 유효한 숫자인지 확인
  const parsed = parseFloat(gpa);
  
  // 숫자로 변환할 수 없으면 예외 처리 (예: NaN인 경우)
  if (isNaN(parsed)) {
    throw new Error('Invalid GPA format');
  }

  // 지정된 소수점 자리수까지 반올림하여 반환
  return parseFloat(parsed.toFixed(decimalPlaces));
};