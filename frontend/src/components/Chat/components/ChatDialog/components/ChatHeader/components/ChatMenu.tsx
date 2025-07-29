import React from 'react';
import SvgThreeDot from 'src/assets/icons/ThreeDot';
import DropDownTemplate from 'src/ui/DropDownTemplate/DropDownTemplate';
import { IconButton } from 'src/ui/IconButton/IconButton';
import MenuList from 'src/components/Chat/common/MenuList';
import { styled } from '@mui/material/styles';
import { EnumChatMenuOptions } from 'src/components/Chat/common/static';
import { archiveChat, deleteChat, leaveFromChat, muteChat } from 'src/api/chat';
import { toastAlert } from 'src/ui/Alert/toastify';
import { EnumChatType } from 'src/api/chat/types';
import { useQuerySearch } from 'src/utils/hooks/url/useQuerySearch';
import { dateParser } from 'src/utils/helpers/dateParser';
import { useDispatch, useSelector } from 'src/redux/store';
import { shallowEqual } from 'react-redux';
import { archivingChat, mutingChat, removeChatRoom } from 'src/redux/slices/chat/chatSlice';
import {
  groupChatOptions,
  privateChatOptions
} from 'src/components/Chat/components/ChatDialog/components/ChatHeader/constants';

interface ChatMenuProps {
  openConfigurationModal: () => void;
  chatId?: number;
  isMuted?: boolean;
  isArchived?: boolean;
  chatType?: EnumChatType;
}

const ChatMenu: React.FC<ChatMenuProps> = ({
  openConfigurationModal,
  chatId,
  isMuted,
  isArchived,
  chatType
}) => {
  const chatList = useSelector(state => state.chat.chatList, shallowEqual);
  const dispatch = useDispatch();
  const { setSearchQuery } = useQuerySearch();
  const chatOptions =
    chatType === EnumChatType.GROUP_CHAT
      ? groupChatOptions(isMuted, isArchived)
      : privateChatOptions(isMuted, isArchived);

  const handleDeleteChat = () => {
    deleteChat(chatId)
      .then(() => chatId && dispatch(removeChatRoom(chatId)))
      .then(() => toastAlert('Чат удалён'))
      .catch(() => toastAlert('Что-то пошло не так', true));
  };

  const optionHandler = () => {
    const currentChat = chatList.find(chat => chat.id === chatId);
    if (currentChat) {
      if (!currentChat.self_member?.is_admin) {
        return chatOptions.filter(option => option.id !== EnumChatMenuOptions.DELETE);
      }
    }
    return chatOptions;
  };

  const setMutedData = (mutedTo: string) => chatId && dispatch(mutingChat({ chatId, mutedTo }));

  const setArchived = (isArchived: boolean) =>
    chatId && dispatch(archivingChat({ chatId, isArchived }));

  const onMenuItemClick = (id: string, onClick?: () => void) => {
    if (id === EnumChatMenuOptions.MUTE) {
      const mutedDay = isMuted ? dateParser.toUTC() : dateParser.toUTC('2099-03-06T08:00:00');

      chatId &&
        muteChat({
          chatId: chatId,
          mutedTo: mutedDay
        }).then(() => setMutedData(mutedDay));
      onClick && onClick();
      return;
    }

    if (id === EnumChatMenuOptions.ARCHIVE) {
      chatId &&
        archiveChat({ chatId: chatId, archived: !isArchived })
          .then(() => setArchived(!isArchived))
          .then(() => toastAlert(isArchived ? 'Чат восстановлен' : 'Чат архивирован'));
      onClick && onClick();
      return;
    }

    if (id === EnumChatMenuOptions.DELETE) {
      onClick && handleDeleteChat();
      return;
    }

    if (id === EnumChatMenuOptions.EDIT) {
      openConfigurationModal();
      onClick && onClick();
      return;
    }

    if (id === EnumChatMenuOptions.LEAVE) {
      leaveFromChat(chatId)
        .then(() => chatId && dispatch(removeChatRoom(chatId)))
        .then(() => toastAlert('Вы покинули чат'));
      onClick && onClick();
      return;
    }

    onClick && onClick();
    return;
  };

  return (
    <DropDownTemplate
      renderButton={({ onClickDropDown }) => (
        <IconButton size='small' onClick={onClickDropDown} sx={{ color: 'inherit' }}>
          <SvgThreeDot />
        </IconButton>
      )}
      hasArrow
    >
      {({ onCloseDropDown }) => (
        <MenuList
          options={optionHandler()}
          onClick={onCloseDropDown}
          onMenuItemClick={onMenuItemClick}
        />
      )}
    </DropDownTemplate>
  );
};

export default ChatMenu;
