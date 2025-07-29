import React from 'react';
import MessageBox from 'src/components/Chat/components/ChatDialog/components/MessageBox/MessageBox';
import { Wrapper } from 'src/components/Chat/components/ChatDialog/components/ChatHeader/styled';
import { ChatMember as ChatMemberType } from 'src/api/chat/types';
import { useSelector } from 'src/redux/store';
import { shallowEqual } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useChatMessage } from 'src/components/Chat/components/ChatDialog/components/MessageWrapper/hooks';
import { Chip, Divider } from '@mui/material';
import { isUserMessage } from 'src/components/Chat/components/ChatDialog/components/MessageWrapper/utilts';
import { dateParser, EnumDateFormat } from 'src/utils/helpers/dateParser';

interface MessageWrapperProps {
  chatMembers?: ChatMemberType[];
}

const MessageWrapper: React.FC<MessageWrapperProps> = ({ chatMembers }) => {
  const { loadMoreMessage, messageList } = useChatMessage();
  const userId = useSelector(state => state.profile.id, shallowEqual);

  return (
    <Wrapper id='scrollableDiv'>
      <InfiniteScroll
        hasMore
        dataLength={messageList.length}
        loader={null}
        scrollThreshold='100px'
        next={loadMoreMessage}
        inverse
        scrollableTarget='scrollableDiv'
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
      >
        {messageList.map((message, index) => {
          if (isUserMessage(message)) {
            if (message.system) {
              return (
                <Divider key={message.id} sx={{ mb: 1.5, mt: 3, mr: '20px' }}>
                  <Chip
                    label={message.body}
                    sx={{
                      fontSize: 14,
                      lineHeight: '20px',
                      height: 'unset',
                      paddingY: '4px'
                    }}
                  />
                </Divider>
              );
            }

            const messageUser = chatMembers?.find(user => user.user_id === message.user_id);

            return (
              <MessageBox
                key={message?.id}
                message={message.body}
                sendingTime={dateParser.toView(message.sent_at, EnumDateFormat.HourMinute)}
                firstName={messageUser?.first_name}
                lastName={messageUser?.last_name}
                src={messageUser?.avatar_url}
                isOwn={message?.user_id === userId}
              />
            );
          }

          return (
            <Divider key={message.id} sx={{ mb: 1.5, mt: 3, mr: '20px' }}>
              <Chip
                label={message.date.isToday() ? 'Сегодня' : message.date.format('DD.MM.YYYY')}
                sx={{
                  fontSize: 14,
                  lineHeight: '20px',
                  height: 'unset',
                  paddingY: '4px'
                }}
              />
            </Divider>
          );
        })}
      </InfiniteScroll>
    </Wrapper>
  );
};

export default MessageWrapper;
