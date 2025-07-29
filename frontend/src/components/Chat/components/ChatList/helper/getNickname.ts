import { LastMessage } from 'src/api/chat/types';

export const getLastMessageName = (lastMessage?: LastMessage) => {
  if (lastMessage?.first_name && lastMessage.last_name) {
    return `${lastMessage.first_name} ${lastMessage.last_name}`;
  }
  return '';
};
