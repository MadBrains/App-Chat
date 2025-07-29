import SetAdminIcon from 'src/assets/icons/chat/SetAdminIcon';
import SendMessageIcon from 'src/assets/icons/chat/SendMessageIcon';
import CloseIcon from 'src/assets/icons/CloseIcon';
import { Colors } from 'src/config/colors';

export enum EnumMemberOptions {
  SEND_MESSAGE = 'SEND_MESSAGE',
  MAKE_ADMIN = 'MAKE_ADMIN',
  LEAVE_GROUP = 'LEAVE_GROUP'
}

export const memberOption = [
  {
    id: EnumMemberOptions.SEND_MESSAGE,
    icon: <SendMessageIcon />,
    label: 'Написать личное сообщение'
  },
  {
    id: EnumMemberOptions.MAKE_ADMIN,
    icon: <SetAdminIcon />,
    label: 'Сделать админом группы'
  },
  {
    id: EnumMemberOptions.LEAVE_GROUP,
    icon: <CloseIcon color={Colors.red} />,
    label: 'Исключить из группы',
    danger: true
  }
];
