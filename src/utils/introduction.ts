import { EducationLevels } from "@/constants/manageResume";
import { InitailEducationType } from "@/types/postResume/postEducation";

export const isPostEducationType = (data?: InitailEducationType) => {
  if (!data) return false;
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
    // 학력 input 유효성 검사
    Object.values(EducationLevels).includes(education_level) && // education_level이 유효한 값인지 확인
    school_id > 0 &&
    typeof major === 'string' &&
    major.trim() !== '' &&
    typeof gpa === 'string' &&
    !isNaN(parseFloat(gpa)) &&
    parseFloat(gpa) >= 0 &&
    start_date.trim() !== '' &&
    end_date.trim() !== '' &&
    typeof grade === 'string' &&
    !isNaN(parseInt(grade)) &&
    parseInt(gpa) > 0
  );
};
