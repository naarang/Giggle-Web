import { MypageCardData } from "@/types/manageResume/manageResume";
import { GetEducationType, PostEducationType } from "@/types/postResume/postEducation";

export const isEmptyData = (data: MypageCardData) => {
  return (
    data === null ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === 'string' && data.trim() === '')
  );
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
  }).replace(/\.$/, "");
};


  // 날짜 형식 포맷팅(서버 데이터와 랜딩되는 데이터간의 변환
export const formatDateToDash = (date: string) => date.replace(/\//g, '-');
export const formatDateToSlash = (date: string) => date.replace(/-/g, '/');


// 변환 함수
export const transformToPostEducation = (data: GetEducationType): PostEducationType => {
  return {
    education_level: data.education_level,
    school_id: data.school.id, // school 객체에서 id 추출
    major: data.major,
    gpa: data.gpa,
    start_date: data.start_date,
    end_date: data.end_date,
    grade: data.grade,
  };
};