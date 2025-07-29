import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import Avatar from 'src/components/common/Avatar/Avatar';
import ChatMember from 'src/components/Chat/components/ChatInfo/components/ChatMember';
import {
  ChatMember as ChatMemberType,
  EnumActionWithChat,
  EnumChatType,
  EnumChatPermissions
} from 'src/api/chat/types';
import {
  ChatBaseInformation,
  ChatDescriptionContainer,
  ChatOption,
  ChatText,
  ChatTitle,
  Container
} from './components/styled';
import AddButton from 'src/components/Chat/common/AddButton/AddButton';
import { Modal } from 'src/ui/Modal/Modal';
import InvitationMembers from 'src/components/Chat/components/CreateChat/components/InvitationMembers';
import { addChatUser } from 'src/api/chat';
import { toastAlert } from 'src/ui/Alert/toastify';
import { useSelector } from 'src/redux/store';
import { shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';
import { declination } from 'src/utils/helpers/declination';

interface ChatInfoProps {
  chatMembers?: ChatMemberType[];
  chatPermissions?: Array<EnumChatPermissions>;
  description?: string;
  chatAvatar?: string;
  chatType?: EnumChatType;
  chatId?: number;
  title?: string;
}

const ChatInfo: React.FC<ChatInfoProps> = ({
  chatMembers,
  chatPermissions,
  description,
  chatAvatar,
  chatType,
  chatId,
  title
}) => {
  const [isOpenInviteModal, setIsOpenInviteModal] = useState<boolean>(false);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [alreadyMembers, setAlreadyMembers] = useState<Array<number | undefined>>([]);
  const [deleteMembers, setDeleteMembers] = useState<Array<number | undefined>>([]);
  const profile = useSelector(store => store.profile, shallowEqual);
  const router = useRouter();

  useEffect(() => {
    if (chatMembers) {
      setAlreadyMembers(chatMembers.map(user => user.user_id));
    }
  }, [isOpenInviteModal]);

  useEffect(() => {
    setSelectedMembers([]);
  }, [router]);

  const prependAlreadyMember = (id: number) =>
    setAlreadyMembers(prev => prev.filter(memberId => memberId !== id));

  const toggleOpenInviteModal = () => setIsOpenInviteModal(prevState => !prevState);

  const appendMember = (id: number) => setSelectedMembers(prev => [...prev, id]);

  const prependMember = (id: number) =>
    setSelectedMembers(prev => prev.filter(memberId => memberId !== id));

  const addNewMembers = () => {
    // if (chatMembers) {
    //   const initialChatMembers = chatMembers.map(user => user.user_id);
    //   setDeleteMembers(initialChatMembers.filter(id => !alreadyMembers.includes(id)));
    // }
    addChatUser({
      chatId,
      chatMembers: selectedMembers.map(user_id => ({ user_id, is_admin: false }))
    })
      .then(() => {
        setSelectedMembers([]);
      })
      .then(() => toastAlert('Пользователи приглашены'));
  };

  const adminId = chatMembers?.find(member => member.is_admin)?.user_id;
  const numberOfMembersHandler = () => {
    const declinationWord = declination(Number(chatMembers?.length), 'участник');
    return `${chatMembers?.length} ${declinationWord}`;
  };
  return (
    <Container>
      <ChatBaseInformation>
        <Stack direction='row' spacing={2} mb={2}>
          <Avatar size={75} src={chatAvatar} alt='chat avatar' />
          <Stack>
            <ChatTitle>{title}</ChatTitle>
            <ChatText>Группа</ChatText>
            <ChatText>{numberOfMembersHandler()}</ChatText>
            {/*{chatPermissions &&*/}
            {/*  chatPermissions.map(permission => (*/}
            {/*    <ChatOption key={permission}>{permission}</ChatOption>*/}
            {/*  ))}*/}
          </Stack>
        </Stack>
        {description && <ChatDescriptionContainer>{description}</ChatDescriptionContainer>}
      </ChatBaseInformation>
      <div>
        <AddButton small text='Пригласить в группу' onClick={toggleOpenInviteModal} />
        <Stack spacing={1}>
          {chatMembers &&
            chatMembers?.map(member => <ChatMember key={member.user_id} {...member} />)}
        </Stack>
      </div>
      <Modal open={isOpenInviteModal}>
        <InvitationMembers
          handleClose={toggleOpenInviteModal}
          selectedMembers={selectedMembers}
          appendMember={appendMember}
          prependMember={prependMember}
          handleSubmit={addNewMembers}
          closeModal={toggleOpenInviteModal}
          alreadyMembers={alreadyMembers}
          prependAlreadyMember={prependAlreadyMember}
          isAdmin={profile.id === adminId}
          action={EnumActionWithChat.EDIT_CHAT}
          submitText={profile.id === adminId ? 'Сохранить изменения' : 'Отправить'}
        />
      </Modal>
    </Container>
  );
};

export default ChatInfo;
