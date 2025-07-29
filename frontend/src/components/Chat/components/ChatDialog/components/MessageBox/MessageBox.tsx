import React from 'react';
import {
  MessageBoxContainer,
  NameField,
  SendingTimeField
} from 'src/components/Chat/components/ChatDialog/components/MessageBox/styled';
import MessageTextField from 'src/components/Chat/components/ChatDialog/components/MessageBox/MessageTextField';
import OnlineBudge from 'src/components/common/OnlineBudge/OnlineBudge';
import Avatar from 'src/components/common/Avatar/Avatar';
import ReadIcon from 'src/assets/icons/chat/ReadIcon';
import { Stack } from '@mui/material';
import { parseUserNameForAvatar } from 'src/utils/helpers/parseUserNameForAvatar';

interface MessageBoxProps {
  message: string;
  sendingTime?: string;
  firstName?: string;
  lastName?: string;
  online?: boolean;
  isOwn?: boolean;
  src?: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  message,
  sendingTime,
  lastName,
  firstName,
  online,
  isOwn,
  src
}) => {
  const shortAvatar = parseUserNameForAvatar({ lastName, firstName });

  return (
    <MessageBoxContainer own={isOwn}>
      {!isOwn && (
        <OnlineBudge online={online}>
          <Avatar src={src} alt='userAvatar' size={36} shortUserName={shortAvatar} />
        </OnlineBudge>
      )}
      <Stack>
        {!isOwn && (
          <NameField>
            {firstName} {lastName}
          </NameField>
        )}
        <MessageTextField message={message} isOwn={isOwn} />
      </Stack>
      <Stack direction='row'>
        {isOwn && <ReadIcon />}
        <SendingTimeField>{sendingTime}</SendingTimeField>
      </Stack>
    </MessageBoxContainer>
  );
};

export default MessageBox;
