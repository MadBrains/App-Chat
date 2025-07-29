import React, { useState } from 'react';
import { Box } from '@mui/material';
import ChatList from './components/ChatList/ChatList';
import ChatDialog from 'src/components/Chat/components/ChatDialog/ChatDialog';
import { StompSessionProvider } from 'react-stomp-hooks';
import { getAuthTokens } from 'src/utils/helpers/authHelper';
import { getLocationOrigin } from 'src/utils/helpers/getLocationOrigin';
import { refreshMiddleware } from 'pages/_app';

const Chat: React.FC = () => {
  const [stompHeaders, setStompHeaders] = useState({
    Authorization: `Bearer ${getAuthTokens().access_token}`
  });

  return (
    <StompSessionProvider
      url={`${getLocationOrigin()}/api/v1.0/socket/connection`}
      connectHeaders={stompHeaders}
      onStompError={() =>
        refreshMiddleware
          .refreshRequest(getAuthTokens().refresh_token)
          .then(() => setStompHeaders({ Authorization: `Bearer ${getAuthTokens().access_token}` }))
      }
    >
      <Box display='flex' height='100%'>
        <ChatList />
        <ChatDialog />
      </Box>
    </StompSessionProvider>
  );
};

export default Chat;
