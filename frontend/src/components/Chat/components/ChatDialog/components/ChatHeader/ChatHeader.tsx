import React, { useState } from 'react';
import { Typography } from 'src/ui/Typography/Typography';
import { Stack } from '@mui/material';
import ChatMenu from 'src/components/Chat/components/ChatDialog/components/ChatHeader/components/ChatMenu';
import { ChatHeaderWrapper } from 'src/components/Chat/components/ChatDialog/components/ChatHeader/styled';
import { IconButton } from 'src/ui/IconButton/IconButton';
import ChatInfoIcon from 'src/assets/icons/chat/ChatInfoIcon';
import ConfigurationModalContent from 'src/components/Chat/components/CreateChat/ConfigurationModalContent';
import { Modal } from 'src/ui/Modal/Modal';
import { EnumChatType } from 'src/api/chat/types';
import NextArrowIcon from 'src/assets/icons/arrow/NextArrowIcon';

interface ChatHeaderProps {
  isOpenInfoDrawer?: boolean;
  onToggleInfoDrawer: () => void;
  title?: string;
  chatId?: number;
  isMuted?: boolean;
  chatType?: EnumChatType;
  isArchived?: boolean;
  description?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  isOpenInfoDrawer,
  onToggleInfoDrawer,
  title,
  chatId,
  isMuted,
  chatType,
  isArchived,
  description
}) => {
  const [isOpen, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const openConfigurationModal = () => {
    setOpen(true);
  };

  return (
    <ChatHeaderWrapper open={isOpenInfoDrawer}>
      <Typography variant='h2' component='h1' sx={{ lineHeight: '33px' }}>
        {title}
      </Typography>
      <Stack direction='row' spacing={1}>
        <ChatMenu
          openConfigurationModal={openConfigurationModal}
          chatId={chatId}
          isMuted={isMuted}
          isArchived={isArchived}
          chatType={chatType}
        />
        {chatType !== EnumChatType.PRIVATE && (
          <IconButton size='small' onClick={onToggleInfoDrawer} sx={{ color: 'inherit' }}>
            {isOpenInfoDrawer ? <NextArrowIcon /> : <ChatInfoIcon />}
          </IconButton>
        )}
      </Stack>
      <Modal open={isOpen}>
        <ConfigurationModalContent
          title={title}
          description={description}
          handleClose={handleClose}
          chatId={chatId}
          isEdit
          closeModal={handleClose}
        />
      </Modal>
    </ChatHeaderWrapper>
  );
};

export default ChatHeader;
