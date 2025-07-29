import React, { useEffect, useMemo, useState } from 'react';
import ChatHeader from 'src/components/Chat/components/ChatDialog/components/ChatHeader/ChatHeader';
import {
  ChatContainer,
  drawerWidth
} from 'src/components/Chat/components/ChatDialog/components/ChatHeader/styled';
import SendMessageBox from 'src/components/Chat/components/ChatDialog/components/SendMessageBox/SendMessageBox';
import PersistentDrawer from 'src/ui/Drawer/PersistentDrawer';
import ChatInfo from 'src/components/Chat/components/ChatInfo/ChatInfo';
import { styled } from '@mui/material/styles';
import MessageWrapper from 'src/components/Chat/components/ChatDialog/components/MessageWrapper/MessageWrapper';
import { useSearchParams } from 'next/navigation';
import { isMutedDifference } from 'src/components/Chat/components/ChatDialog/utils';
import { getChatMembers } from 'src/redux/slices/chat/chatSlice';
import { useDispatch, useSelector } from 'src/redux/store';
import { shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';
import { EnumChatType } from 'src/api/chat/types';

const MainChatContainer = styled('div')({
  width: '100%'
});

const chatInfoDrawerSx = {
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    padding: '25px',
    backgroundColor: 'input.main'
  }
};

const ChooseChatContainer = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const ChatDialog: React.FC = () => {
  const [isOpenInfoDrawer, setIsOpenInfoDrawer] = useState(false);
  const chatMembers = useSelector(store => store.chat.chatMembers, shallowEqual);
  const dispatch = useDispatch();
  const chatList = useSelector(state => state.chat.chatList, shallowEqual);
  const searchParams = useSearchParams();
  const chatId = searchParams.get('chatId');
  const selectedChat = useMemo(
    () => chatList?.find(chat => String(chat.id) === chatId),
    [chatId, chatList]
  );
  const isMuted = isMutedDifference(selectedChat?.self_member?.muted_to);

  const toggleInfoDrawer = () => setIsOpenInfoDrawer(prevState => !prevState);

  const router = useRouter();

  useEffect(() => {
    setIsOpenInfoDrawer(false);
  }, [router]);

  useEffect(() => {
    const controller = new AbortController();
    if (selectedChat?.id) {
      dispatch(
        getChatMembers({ chatId: selectedChat?.id, pageable: {}, signal: controller.signal })
      );
    }
    return () => controller.abort();
  }, [dispatch, selectedChat?.id]);

  if (!selectedChat)
    return <ChooseChatContainer>Выберите, кому хотели бы написать</ChooseChatContainer>;

  const handleChatName = () => {
    if (selectedChat.chat_type === EnumChatType.GROUP_CHAT) {
      return selectedChat.chat_name;
    } else if (selectedChat.chat_type === EnumChatType.PRIVATE) {
      return `Личная переписка #${selectedChat.id}`;
    }
  };

  return (
    <MainChatContainer>
      <ChatHeader
        isOpenInfoDrawer={isOpenInfoDrawer}
        onToggleInfoDrawer={toggleInfoDrawer}
        title={handleChatName()}
        description={selectedChat.description}
        chatId={selectedChat.id}
        isMuted={isMuted}
        chatType={selectedChat.chat_type}
        isArchived={selectedChat?.self_member?.archived}
      />
      <ChatContainer open={isOpenInfoDrawer}>
        <MessageWrapper chatMembers={chatMembers} key={chatId} />
        <SendMessageBox />
      </ChatContainer>
      <PersistentDrawer sx={chatInfoDrawerSx} open={isOpenInfoDrawer}>
        <ChatInfo
          chatAvatar={selectedChat.avatar_image}
          description={selectedChat.description}
          chatPermissions={selectedChat.chat_permission_list}
          chatMembers={chatMembers}
          chatType={selectedChat.chat_type}
          chatId={selectedChat.id}
          title={selectedChat.chat_name}
        />
      </PersistentDrawer>
    </MainChatContainer>
  );
};

export default ChatDialog;
