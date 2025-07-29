import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { ChatWithMember } from 'src/api/chat/types';
import { getChats } from 'src/api/chat';

export const ChatContext = createContext<{
  chatList: ChatWithMember[];
  setChatList: Dispatch<SetStateAction<ChatWithMember[]>>;
  isLoading: boolean;
}>({ chatList: [], setChatList: () => [], isLoading: true });

const ChatRoomContext: React.FC<PropsWithChildren> = ({ children }) => {
  const [chatList, setChatList] = useState<ChatWithMember[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    getChats({ page: 0, size: 100, sort: ['id,asc'] }, { signal: controller.signal })
      .then(data => setChatList(data))
      .catch(e => console.log(e))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <ChatContext.Provider value={{ chatList, setChatList, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatRoomContext;
