import { useEffect } from 'react';
import { getSessionStorage, setSessionStorage } from 'src/utils/helpers/getSetSessionStorage';
import { useSearchParams } from 'next/navigation';

export const useDraftMessage = (refMessage: any, setMessage: (message: string) => void) => {
  const searchParams = useSearchParams();
  const chatId = searchParams.get('chatId');
  useEffect(() => {
    refMessage.current && refMessage.current.focus();
    const draftMessages = getSessionStorage('draftMessages');
    if (chatId && draftMessages && chatId in draftMessages) {
      setMessage(draftMessages[chatId]);
    }
    return () => {
      const draftMessages = getSessionStorage('draftMessages');
      if (refMessage.current?.value && chatId) {
        draftMessages[chatId] = refMessage.current?.value;
        setSessionStorage('draftMessages', draftMessages);
        setMessage('');
      }
      if (
        chatId &&
        draftMessages.hasOwnProperty(chatId) &&
        refMessage.current?.value.length === 0
      ) {
        delete draftMessages[chatId];
        sessionStorage.setItem('draftMessages', JSON.stringify(draftMessages));
      }
    };
  }, [chatId]);
};
