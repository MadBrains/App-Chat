import MuteIcon from 'src/assets/icons/chat/MuteIcon';
import ArchiveIcon from 'src/assets/icons/chat/ArchiveIcon';
import DeleteChatIcon from 'src/assets/icons/chat/DeleteChatIcon';
import { EnumChatMenuOptions } from 'src/components/Chat/common/static';
import EditChatIcon from 'src/assets/icons/chat/EditChatIcon';
import LeaveIcon from 'src/assets/icons/chat/LeaveIcon';

export const groupChatOptions = (isMuted?: boolean, isArchived?: boolean) => [
  {
    id: EnumChatMenuOptions.EDIT,
    icon: <EditChatIcon />,
    label: 'Редактировать чат'
  },
  // {
  //   id: EnumChatMenuOptions.MUTE,
  //   icon: <MuteIcon />,
  //   label: isMuted ? 'Включить уведомления' : 'Отключить уведомления'
  // },
  {
    id: EnumChatMenuOptions.ARCHIVE,
    icon: <ArchiveIcon />,
    label: isArchived ? 'Вернуть из архива' : 'Архивировать'
  },
  {
    id: EnumChatMenuOptions.DELETE,
    icon: <DeleteChatIcon />,
    label: 'Удалить чат',
    danger: true
  },
  {
    id: EnumChatMenuOptions.LEAVE,
    icon: <LeaveIcon />,
    label: 'Покинуть чат',
    danger: true
  }
];

export const privateChatOptions = (isMuted?: boolean, isArchived?: boolean) => [
  // {
  //   id: EnumChatMenuOptions.MUTE,
  //   icon: <MuteIcon />,
  //   label: isMuted ? 'Включить уведомления' : 'Отключить уведомления'
  // },
  {
    id: EnumChatMenuOptions.ARCHIVE,
    icon: <ArchiveIcon />,
    label: isArchived ? 'Вернуть из архива' : 'Архивировать'
  },
  {
    id: EnumChatMenuOptions.DELETE,
    icon: <DeleteChatIcon />,
    label: 'Удалить переписку',
    danger: true
  }
];
