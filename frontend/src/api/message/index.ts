import { AxiosRequestConfig } from 'axios';
import apiInstance from 'src/api/axios';
import qs from 'qs';

export interface ChatMessageScheme {
  id: number;
  user_id: number;
  chat_id: number;
  sent_at: string;
  containsMessageId: number;
  body: string;
  updatedAt: string;
  deleted: boolean;
  system: boolean;
  firstReadAt: string;
  hasAttachment: boolean;
}

interface CursorPaginationParams {
  cursor?: number;
  limit: number;
}

export const getMessageHistory = (
  chatId: string,
  cursorPagination?: CursorPaginationParams,
  config?: AxiosRequestConfig
) =>
  apiInstance
    .get<ChatMessageScheme[]>(`/message/${chatId}`, {
      params: cursorPagination,
      signal: config?.signal,
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    })
    .then(res => res.data);
