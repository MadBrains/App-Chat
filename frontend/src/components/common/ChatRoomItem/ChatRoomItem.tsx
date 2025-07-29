import React from 'react';
import OnlineBudge from 'src/components/common/OnlineBudge/OnlineBudge';
import Avatar from 'src/components/common/Avatar/Avatar';
import { Box } from 'src/ui/Box/Box';
import { Typography } from 'src/ui/Typography/Typography';
import NotificationIcon from 'src/assets/icons/chat/NotificationIcon';
import {
  ArchivedIconField,
  Chip,
  Container,
  MessageAuthor,
  MuteIconContainer,
  ShortMessage,
  Subtitle
} from 'src/components/common/ChatRoomItem/styles';
import { ChatAccordionItemProps } from 'src/components/Chat/components/ChatList/components/ChatAccordionItem/ChatAccordionItem';
import { parseUserNameForAvatar } from 'src/utils/helpers/parseUserNameForAvatar';
import ArchiveIcon from 'src/assets/icons/chat/ArchiveIcon';
import SvgMuteIcon from 'src/assets/icons/chat/MuteIcon';

export interface ChatRoomItemProps
  extends Pick<
    ChatAccordionItemProps,
    'subtitle' | 'small' | 'active' | 'avatarSrc' | 'title' | 'online' | 'isMuted' | 'isArchived'
  > {
  onSelectChat: () => void;
  counter?: number;
  author?: string;
}

const ChatRoomItem: React.FC<ChatRoomItemProps> = ({
  onSelectChat,
  isMuted,
  active,
  online,
  avatarSrc,
  title,
  subtitle,
  small,
  counter,
  isArchived,
  author
}) => {
  const shortName = parseUserNameForAvatar({ firstName: title });

  return (
    <Container active={active} onClick={onSelectChat}>
      <OnlineBudge online={online}>
        <Avatar src={avatarSrc} shortUserName={shortName} size={45} alt='userAvatar' />
      </OnlineBudge>
      <Box display='flex' flexDirection='column' width='100%' ml={1}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography variant='body2' fontWeight={700}>
            {title ? title : 'Relax'}
            {/*{isMuted && (*/}
            {/*  <MuteIconContainer>*/}
            {/*    <SvgMuteIcon width={13} height={13} viewBox={'0 0 24 24'} />*/}
            {/*  </MuteIconContainer>*/}
            {/*)}*/}
          </Typography>
          <div>
            <ArchivedIconField isMuted={isMuted}>
              {isArchived && <ArchiveIcon color={'#2400FE'} />}
            </ArchivedIconField>
          </div>
        </Box>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <ShortMessage variant='body2'>
            {author && (
              <MessageAuthor variant='body2' as='span'>
                {author}:
              </MessageAuthor>
            )}
            <Subtitle> {subtitle}</Subtitle>
          </ShortMessage>
          {counter ? <Chip>{counter}</Chip> : null}
        </Box>
      </Box>
    </Container>
  );
};

export default ChatRoomItem;
