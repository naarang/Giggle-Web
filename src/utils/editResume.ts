import { MypageCardData } from "@/types/manageResume/manageResume";

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