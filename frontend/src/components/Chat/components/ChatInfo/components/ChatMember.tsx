import React from 'react';
import Avatar from 'src/components/common/Avatar/Avatar';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Popover from 'src/ui/Popover/Popover';
import MemberDetail from 'src/components/Chat/components/ChatInfo/components/MemberDetails/MemberDetail';
import { ChatMember as ChatMemberProps } from 'src/api/chat/types';
import { parseUserNameForAvatar } from 'src/utils/helpers/parseUserNameForAvatar';

const NameContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
}));

const Name = styled('span')({
  fontWeight: 400,
  lineHeight: '19px',
  fontSize: '14px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
});

const Role = styled('span')(({ theme }) => ({
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '12px',
  display: 'flex',
  color: theme.palette.secondary.main
}));

const ChatMember: React.FC<ChatMemberProps> = ({
  first_name,
  last_name,
  is_admin,
  avatar_url,
  email,
  phone,
  chat_id,
  user_id
}) => {
  if (!first_name && !last_name) return null;
  const shortName = parseUserNameForAvatar({ firstName: first_name, lastName: last_name });
  return (
    <Popover
      renderButton={({ onClick }) => (
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='initial'
          component={ButtonBase}
          spacing={1}
          onClick={onClick}
        >
          <Avatar size={36} src={avatar_url} shortUserName={shortName} alt='member avatar' />
          <NameContainer>
            <Name>{`${first_name} ${last_name}`}</Name>
            {is_admin && <Role>Админ</Role>}
          </NameContainer>
        </Stack>
      )}
    >
      {({ onClose }) => (
        <MemberDetail
          email={email}
          firstName={first_name}
          lastName={last_name}
          phone={phone}
          avatarUrl={avatar_url}
          chatId={chat_id}
          isAdminChat={is_admin}
          userId={user_id}
          onClosePopover={onClose}
        />
      )}
    </Popover>
  );
};

export default ChatMember;
