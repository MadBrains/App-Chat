import React, { ChangeEvent, useRef, useState } from 'react';
import TextInput from 'src/ui/TextInput/TextInput';
import {
  AttachFileIcon,
  invisibleInputSx,
  sendFieldSx,
  SendIcon,
  SendMessageContainer
} from 'src/components/Chat/components/ChatDialog/components/SendMessageBox/styled';
import { InputBase } from '@mui/material';
import SvgAttachFileIcon from 'src/assets/icons/chat/AttachFileIcon';
import SvgSendIcon from 'src/assets/icons/chat/SendIcon';
import { useStompClient } from 'react-stomp-hooks';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'src/redux/store';
import { shallowEqual } from 'react-redux';
import { useDraftMessage } from 'src/components/Chat/components/ChatDialog/components/SendMessageBox/hooks';

interface SendMessageBoxProps {}

const SendMessageBox: React.FC<SendMessageBoxProps> = () => {
  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState<string>('');
  const stompClient = useStompClient();
  const searchParams = useSearchParams();
  const userProfile = useSelector(store => store.profile, shallowEqual);
  const chatId = searchParams.get('chatId');
  const refMessage = useRef<HTMLInputElement>();

  useDraftMessage(refMessage, setMessage);
  const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };
  const sendMessage = () => {
    if (stompClient && message) {
      const username = [userProfile?.first_name || '', userProfile?.last_name || ''].join(' ');
      stompClient.publish({
        destination: `/api/v1.0/socket/app/chat/${chatId}`,
        body: JSON.stringify({ body: message, username })
      });
    }
    setMessage('');
  };

  const getFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFile(e.target.files[0]);
    }
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <SendMessageContainer>
      <AttachFileIcon disabled>
        <SvgAttachFileIcon />
        <InputBase type='file' onChange={getFile} sx={invisibleInputSx} />
      </AttachFileIcon>
      <TextInput
        placeholder={'Написать сообщение...'}
        inputRef={refMessage}
        value={message}
        onChange={onChangeMessage}
        sx={sendFieldSx}
        multiline
        maxRows={10}
        onKeyPress={onKeyPressHandler}
      />
      <SendIcon onClick={sendMessage}>
        <SvgSendIcon />
      </SendIcon>
    </SendMessageContainer>
  );
};

export default SendMessageBox;
