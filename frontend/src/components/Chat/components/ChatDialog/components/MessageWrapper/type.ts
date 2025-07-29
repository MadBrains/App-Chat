import dayjs from 'dayjs';
import { ChatMessageScheme } from 'src/api/message';

export enum EnumSystemMessageType {
  DATE_DIVIDER = 'date_divider',
  MEMBERS_CHANGE = 'members_change'
}

export type SystemChatMessageScheme = {
  id: number;
  type: EnumSystemMessageType;
  body?: string;
  date: dayjs.Dayjs;
};
export type ChatMessageItemScheme = ChatMessageScheme | SystemChatMessageScheme;
export type ChatMessageListScheme = Array<ChatMessageItemScheme>;
