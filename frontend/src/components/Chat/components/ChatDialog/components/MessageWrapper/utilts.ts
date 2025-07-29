import {
  ChatMessageItemScheme,
  ChatMessageListScheme,
  EnumSystemMessageType
} from 'src/components/Chat/components/ChatDialog/components/MessageWrapper/type';
import { ChatMessageScheme } from 'src/api/message';
import { dateParser, EnumDateFormat } from 'src/utils/helpers/dateParser';

export const isUserMessage = (msg: ChatMessageItemScheme): msg is ChatMessageScheme => {
  return !!(msg as ChatMessageScheme)?.sent_at;
};

export const genDateSystemMessage = (sentAt?: string) => ({
  type: EnumSystemMessageType.DATE_DIVIDER,
  date: sentAt ? dateParser.toDayjs(sentAt) : dateParser.currentDate(),
  id: Number(dateParser.toView(sentAt, EnumDateFormat.NumberFormat))
});

export const separationMessageByDate = (msgList: ChatMessageScheme[], withDate?: boolean) => {
  const dateSeparatedList = msgList.reduce<ChatMessageListScheme>((acc, msg) => {
    const prevMsg = acc?.[acc.length - 1];

    if (
      isUserMessage(prevMsg) &&
      dateParser.getDay(prevMsg.sent_at) !== dateParser.getDay(msg.sent_at)
    ) {
      acc.push(genDateSystemMessage(prevMsg.sent_at));
    }

    acc.push(msg);

    return acc;
  }, []);

  if (withDate) {
    const lastMessage = dateSeparatedList[dateSeparatedList.length - 1];
    if (isUserMessage(lastMessage)) {
      dateSeparatedList.push(genDateSystemMessage(lastMessage.sent_at));
    }
  }

  return dateSeparatedList;
};
