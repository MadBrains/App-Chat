import { useSelector } from 'src/redux/store';
import { shallowEqual } from 'react-redux';

export const useCurrentChat = (chatId?: number) => {
  const chatList = useSelector(state => state.chat.chatList, shallowEqual);

  return chatList.find(chat => chat.id === chatId);
};
