import React, { useEffect, useMemo, useState } from 'react';
import {
  Tab,
  TabPanel,
  TabsList
} from 'src/components/Chat/components/ChatList/components/ChatOverview/styled';
import {
  EnumTabsType,
  GroupChatListScheme
} from 'src/components/Chat/components/ChatList/ChatList';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import ChatAccordionItem from 'src/components/Chat/components/ChatList/components/ChatAccordionItem/ChatAccordionItem';
import { useSearchParams } from 'next/navigation';
import { useQuerySearch } from 'src/utils/hooks/url/useQuerySearch';
import { isMutedDifference } from 'src/components/Chat/components/ChatDialog/utils';
import { useSelector } from 'src/redux/store';
import { shallowEqual } from 'react-redux';
import { EnumChatType } from 'src/api/chat/types';
import { getLastMessageName } from 'src/components/Chat/components/ChatList/helper/getNickname';

interface ChatArchiveProps {
  defaultValue: EnumTabsType | null;
}

const ChatArchived: React.FC<ChatArchiveProps> = ({ defaultValue }) => {
  const chatList = useSelector(state => state.chat.chatList, shallowEqual);
  const [currentTab, setCurrentTab] = useState<EnumTabsType | null>(defaultValue);
  const { setSearchQuery } = useQuerySearch();
  const searchParams = useSearchParams();
  const chatId = searchParams.get('chatId');
  const chooseChat = (id?: number) => setSearchQuery({ chatId: id?.toString() || '' });

  useEffect(() => {
    if (!Object.keys(parsedChatList).includes(EnumChatType.GROUP_CHAT)) {
      setCurrentTab(EnumTabsType.contactsArchived);
    } else if (!Object.keys(parsedChatList).includes(EnumChatType.PRIVATE)) {
      setCurrentTab(EnumTabsType.groupArchived);
    }
  }, [chatList]);

  const parsedChatList = useMemo(
    () =>
      chatList.reduce<GroupChatListScheme>((acc, chat) => {
        if (chat?.chat_type && chat?.self_member?.archived) {
          if (!Array.isArray(acc[chat.chat_type])) {
            acc[chat.chat_type] = [chat];
          } else {
            acc[chat.chat_type]?.push(chat);
          }
        }

        return acc;
      }, {}),
    [chatList]
  );
  const isShowTabs =
    EnumChatType.GROUP_CHAT in parsedChatList && EnumChatType.PRIVATE in parsedChatList;

  return (
    <>
      <TabsUnstyled value={currentTab !== null && currentTab}>
        {isShowTabs && (
          <TabsList>
            <Tab
              value={EnumTabsType.groupArchived}
              onClick={() => setCurrentTab(EnumTabsType.groupArchived)}
            >
              Чаты &nbsp;
              <span className='chat-amount'>
                {parsedChatList.GROUP_CHAT && parsedChatList.GROUP_CHAT.length > 0
                  ? parsedChatList.GROUP_CHAT.length
                  : null}
              </span>
            </Tab>
            <Tab
              value={EnumTabsType.contactsArchived}
              onClick={() => setCurrentTab(EnumTabsType.contactsArchived)}
            >
              Контакты &nbsp;
              <span className='chat-amount'>
                {parsedChatList.PRIVATE && parsedChatList.PRIVATE.length > 0
                  ? parsedChatList.PRIVATE.length
                  : null}
              </span>
            </Tab>
          </TabsList>
        )}
        <TabPanel value={EnumTabsType.groupArchived}>
          {parsedChatList?.GROUP_CHAT?.map(chat => {
            const isMuted = isMutedDifference(chat?.self_member?.muted_to);

            return (
              <ChatAccordionItem
                key={chat.id}
                id={chat.id}
                title={chat.chat_name}
                author={getLastMessageName(chat?.last_message)}
                subtitle={chat?.last_message?.message_body}
                avatarSrc={chat.avatar_image}
                onSelectChat={chooseChat}
                active={chatId === String(chat?.id)}
                isMuted={isMuted}
                isArchived
                chatType={EnumTabsType.groupArchived}
              />
            );
          })}
        </TabPanel>
        <TabPanel value={EnumTabsType.contactsArchived}>
          {parsedChatList?.PRIVATE?.map(chat => {
            const isMuted = isMutedDifference(chat?.self_member?.muted_to);

            return (
              <ChatAccordionItem
                key={chat.id}
                id={chat.id}
                title={`Личная переписка #${chat.id}`}
                subtitle={chat?.last_message?.message_body}
                avatarSrc={chat.avatar_image}
                onSelectChat={chooseChat}
                active={chatId === String(chat?.id)}
                isMuted={isMuted}
                small
                isArchived
                chatType={EnumTabsType.contactsArchived}
              />
            );
          })}
        </TabPanel>
      </TabsUnstyled>
    </>
  );
};

export default ChatArchived;
