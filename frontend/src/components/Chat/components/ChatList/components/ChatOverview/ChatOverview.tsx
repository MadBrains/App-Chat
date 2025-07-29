import React, { useState } from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import {
  Tab,
  TabPanel,
  TabsList,
  UserContainer
} from 'src/components/Chat/components/ChatList/components/ChatOverview/styled';
import { EnumTabsType } from 'src/components/Chat/components/ChatList/ChatList';
import ConfigurationModalContent from 'src/components/Chat/components/CreateChat/ConfigurationModalContent';
import { mockChats } from 'src/components/Chat/components/CreateChat/_mock';
import MemberInfo from 'src/components/Chat/components/CreateChat/components/MemberInfo';
import AddButton from 'src/components/Chat/common/AddButton/AddButton';
import ChatRoomItem from 'src/components/common/ChatRoomItem/ChatRoomItem';
import { Modal } from 'src/ui/Modal/Modal';
import { Button } from 'src/ui/Button/Button';
import { createChat } from 'src/api/chat';
import { EnumChatType, EnumChatPermissions } from 'src/api/chat/types';
import { useUserList } from 'src/api/user/hooks';
import { EnumRoutes } from 'src/config/routes';
import { useRouter } from 'next/router';
import { toastAlert } from 'src/ui/Alert/toastify';
import { useDispatch } from 'src/redux/store';
import { addChatRoom } from 'src/redux/slices/chat/chatSlice';
import { useCreateJoinChat } from 'src/components/Chat/common/hooks/useCreateJoinChat';

interface ChatOverviewProps {
  defaultValue: any;
  closeModal: () => void;
}

const ChatOverview: React.FC<ChatOverviewProps> = ({ defaultValue, closeModal }) => {
  const [isOpen, setOpen] = useState(false);
  const usersList = useUserList();
  // const chats = mockChats;

  const handleClose = () => {
    setOpen(false);
  };

  const { handleCreatePrivateChat } = useCreateJoinChat();

  return (
    <>
      <TabsUnstyled defaultValue={defaultValue}>
        <TabsList>
          <Tab value={EnumTabsType.groupOverview}>
            Доступные группы &nbsp;
            {/*<span className='chat-amount'>{chats.length > 0 ? chats.length : null}</span>*/}
          </Tab>
          <Tab value={EnumTabsType.contactsOverview}>
            Контакты &nbsp;
            <span className='chat-amount'>{usersList.length > 0 ? usersList.length : null}</span>
          </Tab>
        </TabsList>
        <TabPanel value={EnumTabsType.groupOverview}>
          <AddButton text='Создать новый чат' onClick={() => setOpen(true)} />
          {/*{chats.map(chat => {*/}
          {/*  return (*/}
          {/*      <UserContainer key={chat.id}>*/}
          {/*        <ChatRoomItem*/}
          {/*            key={chat.id}*/}
          {/*            title={chat.title}*/}
          {/*            subtitle={chat.description}*/}
          {/*            avatarSrc={chat.src}*/}
          {/*            onSelectChat={() => setOpen(true)}*/}
          {/*        />*/}
          {/*        <Button*/}
          {/*            className='controlButton'*/}
          {/*            variant='contained'*/}
          {/*            size='small'*/}
          {/*            sx={{width: '220px'}}*/}
          {/*            onClick={() => handleCreatePrivateChat(chat.id)}*/}
          {/*        >*/}
          {/*          Присоединиться*/}
          {/*        </Button>*/}
          {/*      </UserContainer>*/}
          {/*  );*/}
          {/*})}*/}
        </TabPanel>
        <TabPanel value={EnumTabsType.contactsOverview}>
          {usersList.map(contact => {
            return (
              <UserContainer key={contact.id}>
                <MemberInfo
                  id={contact.id}
                  name={`${contact.first_name} ${contact.last_name}`}
                  src={contact.avatar_url}
                />
                <Button
                  className='controlButton'
                  variant='contained'
                  size='small'
                  onClick={() => handleCreatePrivateChat(contact.id)}
                >
                  Начать
                </Button>
              </UserContainer>
            );
          })}
        </TabPanel>
      </TabsUnstyled>
      <Modal open={isOpen}>
        <ConfigurationModalContent handleClose={handleClose} closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default ChatOverview;
