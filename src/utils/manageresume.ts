import { MypageCardData } from "@/types/manageResume/manageResume";

export const isEmptyData = (data: MypageCardData) => {
  return (
    data === null ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === 'string' && data.trim() === '')
  );
};
