import React from 'react';
import {
  MessageTextFieldContainer,
  NameField,
  MessageArea
} from 'src/components/Chat/components/ChatDialog/components/MessageBox/styled';

interface MessageTextFieldProps {
  message: string;
  isOwn?: boolean;
  isFirst?: boolean;
}

const MessageTextField: React.FC<MessageTextFieldProps> = ({ message, isOwn, isFirst }) => {
  return (
    <MessageTextFieldContainer own={isOwn} first={isFirst}>
      {message}
    </MessageTextFieldContainer>
  );
};

export default MessageTextField;
