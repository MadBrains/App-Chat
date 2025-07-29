import React from 'react';
import Avatar from 'src/components/common/Avatar/Avatar';
import Stack from '@mui/material/Stack';
import { EnumMemberOptions, memberOption } from 'src/components/Chat/components/ChatInfo/_mocks';
import MenuList from 'src/components/Chat/common/MenuList';
import { parseUserNameForAvatar } from 'src/utils/helpers/parseUserNameForAvatar';
import {
  getChatMembers,
  makeAdminChat,
  removeMemberFromChat
} from 'src/redux/slices/chat/chatSlice';
import { useCurrentChat } from 'src/components/Chat/hooks/useCurrentChat';
import { AdditionalText, Container, LocalTime, Name } from './styled';
import { dateParser, EnumDateFormat } from 'src/utils/helpers/dateParser';
import { useDispatch } from 'src/redux/store';
import { useCreateJoinChat } from 'src/components/Chat/common/hooks/useCreateJoinChat';
import MemberDetailMenu from 'src/components/Chat/components/ChatInfo/components/MemberDetails/MemberDetailMenu';

interface MemberDetailProps {
  phone?: string;
  email?: string;
  description?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  chatId?: number;
  userId?: number;
  isAdminChat?: boolean;
  onClosePopover: () => void;
}

const MemberDetail: React.FC<MemberDetailProps> = ({
  firstName,
  lastName,
  phone,
  email,
  description,
  avatarUrl,
  chatId,
  userId,
  onClosePopover,
  isAdminChat
}) => {
  const shortName = parseUserNameForAvatar({ firstName, lastName });
  const currentChat = useCurrentChat(chatId);
  const dispatch = useDispatch();

  const memberOptionsFilter = () => {
    if (!currentChat?.self_member?.is_admin) {
      return memberOption.filter(
        option =>
          option.id !== EnumMemberOptions.LEAVE_GROUP && option.id !== EnumMemberOptions.MAKE_ADMIN
      );
    }
    if (isAdminChat) {
      return memberOption.filter(option => option.id !== EnumMemberOptions.MAKE_ADMIN);
    }
    return memberOption;
  };

  const { handleCreatePrivateChat } = useCreateJoinChat();

  const onMenuItemClick = (id: string, onClick?: () => void) => {
    if (id === EnumMemberOptions.MAKE_ADMIN) {
      dispatch(makeAdminChat({ chatId, userId, admin: true })).then(() =>
        dispatch(getChatMembers({ chatId, pageable: {} }))
      );
      return;
    }

    if (id === EnumMemberOptions.LEAVE_GROUP) {
      dispatch(removeMemberFromChat({ chatId, userId })).then(() =>
        dispatch(getChatMembers({ chatId, pageable: {} }))
      );
      return;
    }

    if (id === EnumMemberOptions.SEND_MESSAGE) {
      onClick && onClick();
      return handleCreatePrivateChat(userId);
    }

    onClick && onClick();
  };

  return (
    <Container>
      <Stack direction='row' spacing={2} mb={2}>
        <Avatar size={75} alt='member avatar' src={avatarUrl} shortUserName={shortName} />
        <Stack>
          <Name>{`${firstName} ${lastName}`}</Name>
          <LocalTime>Местное время {dateParser.toView('', EnumDateFormat.HourMinute)} </LocalTime>
        </Stack>
      </Stack>
      <Stack mb={2}>
        <AdditionalText>{phone}</AdditionalText>
        <AdditionalText>{email}</AdditionalText>
      </Stack>
      <LocalTime>{description}</LocalTime>
      <MemberDetailMenu
        options={memberOptionsFilter()}
        onMenuItemClick={onMenuItemClick}
        onClick={onClosePopover}
      />
    </Container>
  );
};

export default MemberDetail;
