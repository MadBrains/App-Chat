import { useEffect, useState } from 'react';
import { ChatMessageScheme, getMessageHistory } from 'src/api/message';
import { useSearchParams } from 'next/navigation';
import { useSubscription } from 'react-stomp-hooks';
import { ChatMessageListScheme } from 'src/components/Chat/components/ChatDialog/components/MessageWrapper/type';
import {
  genDateSystemMessage,
  isUserMessage,
  separationMessageByDate
} from 'src/components/Chat/components/ChatDialog/components/MessageWrapper/utilts';
import { dateParser } from 'src/utils/helpers/dateParser';

export const useChatMessage = () => {
  const [messageList, setMessageList] = useState<ChatMessageListScheme>([]);
  const searchParams = useSearchParams();
  const chatId = searchParams.get('chatId');

  useEffect(() => {
    const controller = new AbortController();

    if (chatId) {
      getMessageHistory(chatId, { limit: 20 }, { signal: controller.signal }).then(data =>
        setMessageList(separationMessageByDate(data, data.length < 20))
      );
    }

    return () => controller.abort();
  }, [chatId]);

  useSubscription(`/api/v1.0/socket/topic/chat/${chatId}`, message => {
    const messageData: ChatMessageScheme = JSON.parse(message.body);

    setMessageList(prev => {
      const latestMessage = prev[0];

      if (
        (isUserMessage(latestMessage) && !dateParser.isToday(latestMessage.sent_at)) ||
        !latestMessage
      ) {
        return [messageData, genDateSystemMessage(), ...prev];
      }

      return [messageData, ...prev];
    });
  });

  const loadMoreMessage = () => {
    if (chatId) {
      const cursor = isUserMessage(messageList[messageList.length - 1])
        ? messageList[messageList.length - 1]?.id
        : messageList[messageList.length - 2]?.id;

      getMessageHistory(chatId, {
        cursor,
        limit: 20
      }).then(data => {
        setMessageList(prev => [...prev, ...separationMessageByDate(data, data.length <= 20)]);
      });
    }
  };

  return { messageList, loadMoreMessage };
};
