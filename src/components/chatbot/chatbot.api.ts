import axios from 'axios';

import type { ChatResponse } from './chatbot.types';

import { getChatbotSessionId } from './chatbot.session';
const API_URL = 'https://laravel-backend-portfolio.onrender.com/api/chat';

export const sendChatMessage = async (
  message: string,
  lang: string
): Promise<ChatResponse> => {
  const sessionId = getChatbotSessionId();

  const response = await axios.post<ChatResponse>(API_URL, {
    message,
    lang,
    session_id: sessionId,
  });

  return response.data;
};
