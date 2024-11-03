import { getAccessToken } from '@/utils/auth';
import axios from 'axios';

export const getChatBotMessage = async (page: number, size: number) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_CHAT_BASE_URL}/chatbot?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`, // 토큰을 헤더에 추가
      },
    },
  );
  return response.data;
};
