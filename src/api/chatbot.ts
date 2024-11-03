import { getAccessToken } from '@/utils/auth';
import axios from 'axios';

// 11.1 (유학생) 이전 챗봇 내용 조회하기
export const getChatHistory = async (page: number, size: number) => {
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

// 11.2 (유학생) 챗봇 질문하기
export const postChatBotMessage = async (text: string) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_CHAT_BASE_URL}/chatbot`,
    {
      prompt: text,
    },
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`, // 토큰을 헤더에 추가
      },
    },
  );
  return response.data;
};
