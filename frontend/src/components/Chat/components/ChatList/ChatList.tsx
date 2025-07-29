import React, { useEffect, useMemo, useState } from 'react';
import { ButtonBase, Collapse, Divider, Stack } from '@mui/material';
import ChatAccordion from 'src/components/Chat/components/ChatList/components/ChatAccordion/ChatAccordion';
import ChatAccordionItem from 'src/components/Chat/components/ChatList/components/ChatAccordionItem/ChatAccordionItem';
import { ChatContainer, collapseSx } from 'src/components/Chat/components/ChatList/styles';
import ChatOverview from 'src/components/Chat/components/ChatList/components/ChatOverview/ChatOverview';
import { Typography } from 'src/ui/Typography/Typography';
import ArrowTurnLeftIcon from 'src/assets/icons/arrow/ArrowTurnLeftIcon';
import { useQuerySearch } from 'src/utils/hooks/url/useQuerySearch';
import { useSearchParams } from 'next/navigation';
import { Loader } from '@storybook/components';
import { ChatWithMember, EnumChatType } from 'src/api/chat/types';
import ChatArchived from 'src/components/Chat/components/ChatList/components/ChatArchived/ChatArchived';
import { isMutedDifference } from 'src/components/Chat/components/ChatDialog/utils';
import { useSubscription } from 'react-stomp-hooks';
import { useDispatch, useSelector } from 'src/redux/store';
import { useRouter } from 'next/router';
import { shallowEqual } from 'react-redux';
import { dispatchChatEvent } from 'src/components/Chat/components/ChatList/helper/dispatchChatEvent';
import { getChatRooms } from 'src/redux/slices/chat/chatSlice';
import { getLastMessageName } from 'src/components/Chat/components/ChatList/helper/getNickname';

export enum EnumTabsType {
  groupOverview = 'groupOverview',
  contactsOverview = 'contactsOverview',
  groupArchived = 'groupArchived',
  contactsArchived = 'contactsArchived'
}

export enum EnumTitleAccordion {
  groupChat = 'Группы',
  personalChat = 'Личная переписка'
}

export type GroupChatListScheme = {
  [key in EnumChatType]?: ChatWithMember[];
};
export interface AllCounter {
  groupCounter: number;
  contactsCounter: number;
}
const ChatList: React.FC = () => {
  const [overviewType, setOverviewType] = useState<EnumTabsType | null>(null);
  const [allUnreadCounter, setUnreadAllCounter] = useState<AllCounter>({
    groupCounter: 0,
    contactsCounter: 0
  });
  const { setSearchQuery } = useQuerySearch();
  const searchParams = useSearchParams();
  const chatId = searchParams.get('chatId');
  const dispatch = useDispatch();
  const userId = useSelector(store => store.profile.id);
  const router = useRouter();
  const chatList = useSelector(state => state.chat.chatList, shallowEqual);
  const isLoading = useSelector(state => state.chat.isLoading, shallowEqual);

  const chooseChat = (id?: number) => setSearchQuery({ chatId: id?.toString() || '' });

  useEffect(() => {
    const controller = new AbortController();

    dispatch(getChatRooms({ signal: controller.signal }));

    return () => controller.abort();
  }, []);

  useSubscription('/api/v1.0/socket/user/queue', msg =>
    dispatchChatEvent(msg.body, { chatId, dispatch, router, userId })
  );

  const parsedChatList = useMemo(
    () =>
      chatList.reduce<GroupChatListScheme>((acc, chat) => {
        if (chat?.chat_type) {
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

  if (isLoading)
    return (
      <ChatContainer>
        <Loader />
      </ChatContainer>
    );

  return (
    <>
      <ChatContainer>
        {overviewType && (
          <>
            <Stack
              spacing={1}
              direction='row'
              alignItems='center'
              component={ButtonBase}
              sx={{ ml: 'auto', height: 20, mt: '25px', mb: '11px', pr: '20px' }}
              onClick={() => {
                setOverviewType(null);
              }}
            >
              <>
                <Typography variant='body2' component='span'>
                  Вернуться к списку чатов
                </Typography>
                <ArrowTurnLeftIcon />
              </>
            </Stack>
            <Divider flexItem sx={{ mr: 2.5, mb: '10px' }} />
          </>
        )}
        <ChatAccordion
          title={EnumTitleAccordion.groupChat}
          handleAddChat={() => setOverviewType(EnumTabsType.groupOverview)}
          handleArchivedChat={() => setOverviewType(EnumTabsType.groupArchived)}
          hidden={!!overviewType}
          chatType={EnumChatType.GROUP_CHAT}
          chatList={chatList}
          allCounter={allUnreadCounter.groupCounter}
        >
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
                chatType={EnumTabsType.groupOverview}
                setUnreadAllCounter={setUnreadAllCounter}
                archivedChat={chat?.self_member?.archived}
                userId={userId}
              />
            );
          })}
        </ChatAccordion>
        <ChatAccordion
          title={EnumTitleAccordion.personalChat}
          handleAddChat={() => setOverviewType(EnumTabsType.contactsOverview)}
          handleArchivedChat={() => setOverviewType(EnumTabsType.contactsArchived)}
          hidden={!!overviewType}
          chatType={EnumChatType.PRIVATE}
          chatList={chatList}
          allCounter={allUnreadCounter.contactsCounter}
        >
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
                chatType={EnumTabsType.contactsOverview}
                setUnreadAllCounter={setUnreadAllCounter}
                archivedChat={chat?.self_member?.archived}
                userId={userId}
              />
            );
          })}
        </ChatAccordion>
        <Collapse
          in={!!overviewType}
          timeout={250}
          unmountOnExit
          orientation='horizontal'
          sx={collapseSx}
        >
          {overviewType === EnumTabsType.groupOverview ||
          overviewType === EnumTabsType.contactsOverview ? (
            <ChatOverview defaultValue={overviewType} closeModal={() => setOverviewType(null)} />
          ) : (
            <ChatArchived defaultValue={overviewType} />
          )}
        </Collapse>
      </ChatContainer>
    </>
  );
};

export default ChatList;
