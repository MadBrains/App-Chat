import React, { useState } from 'react';
import { useSubscription } from 'react-stomp-hooks';
import ChatRoomItem from 'src/components/common/ChatRoomItem/ChatRoomItem';
import { AllCounter, EnumTabsType } from 'src/components/Chat/components/ChatList/ChatList';
import {
  decreaseUnreadCounter,
  increaseUnreadCounter
} from 'src/components/Chat/components/ChatList/helper/getUnreadCounter';
import { archiveChat } from 'src/api/chat';
import { useDispatch } from 'src/redux/store';
import { archivingChat } from 'src/redux/slices/chat/chatSlice';

export interface ChatAccordionItemProps {
  avatarSrc?: string;
  title?: string;
  author?: string;
  subtitle?: string;
  small?: boolean;
  active?: boolean;
  online?: boolean;
  onSelectChat: (id: number) => void;
  id?: number;
  isMuted?: boolean;
  isArchived?: boolean;
  chatType?: EnumTabsType;
  archivedChat?: boolean;
  setUnreadAllCounter?: (count: (prev: AllCounter) => AllCounter) => void;
  userId?: number;
}
export interface PreviewMessage {
  message: string;
  author: string;
  counter: number;
}
const ChatAccordionItem: React.FC<ChatAccordionItemProps> = ({
  title,
  author,
  subtitle,
  small,
  active,
  online,
  onSelectChat,
  avatarSrc,
  id,
  isMuted,
  isArchived,
  chatType,
  archivedChat,
  setUnreadAllCounter,
  userId
}) => {
  const dispatch = useDispatch();
  const [previewMessage, setPreviewMessage] = useState<PreviewMessage>({
    message: '',
    author: '',
    counter: 0
  });

  useSubscription(`/api/v1.0/socket/topic/chat/${id}`, message => {
    const parsedMessage = JSON.parse(message.body);
    setPreviewMessage(prev => ({
      message: parsedMessage.body,
      author: parsedMessage.username,
      counter: active ? 0 : prev.counter + 1
    }));
    increaseUnreadCounter(previewMessage, setUnreadAllCounter, chatType);
    if (id && archivedChat && parsedMessage.user_id !== userId) {
      archiveChat({ chatId: id, archived: false }).then(() =>
        dispatch(archivingChat({ chatId: id, isArchived: false }))
      );
    }
  });

  const handleSelectChat = () => {
    decreaseUnreadCounter(previewMessage, setUnreadAllCounter, chatType);
    setPreviewMessage(prev => ({ ...prev, counter: 0 }));
    id && onSelectChat(id);
  };
  const authorHandler = () => {
    if (chatType === EnumTabsType.groupOverview || chatType === EnumTabsType.groupArchived) {
      return previewMessage.author || author;
    }
  };
  return (
    <>
      {!archivedChat && (
        <ChatRoomItem
          onSelectChat={handleSelectChat}
          isMuted={isMuted}
          title={title}
          subtitle={previewMessage.message || subtitle || 'Нет истории сообщений'}
          author={authorHandler()}
          avatarSrc={avatarSrc}
          active={active}
          counter={previewMessage.counter}
          online={online}
          small={small}
          isArchived={isArchived}
        />
      )}
    </>
  );
};

export default ChatAccordionItem;
