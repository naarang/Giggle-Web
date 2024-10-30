import { api } from '.';

// 10.1 (유학생/고용주) 알림 조회
export const getAlarms = async (page: number, size: number) => {
  const response = await api.get(
    `/notifications/overviews?page=${page}&size=${size}`,
  );
  return response.data;
};

// 10.2 (유학생/고용주) 알림 읽음 상태 변경
export const patchReadAlarm = async (id: number) => {
  const response = await api.patch(`/notifications/${id}/is-read`);
  return response.data;
};
