import ChatsIcon from 'src/assets/icons/ChatsIcon';
import SettingsIcon from 'src/assets/icons/SettingsIcon';
import UsersIcon from 'src/assets/icons/UsersIcon';
import { EnumRoutes } from 'src/config/routes';
import PersonalIcon from 'src/assets/icons/sideBar/PersonalIcon';

export const sidebarMenu = [
  { name: 'Внутренние чаты', icon: ChatsIcon, path: EnumRoutes.chat },
  { name: 'Клиентские чаты', icon: PersonalIcon, disabled: true },
  { name: 'Модерация пользователей', icon: UsersIcon, path: EnumRoutes.clients },
  { name: 'Настройки системы', icon: SettingsIcon, path: EnumRoutes.settings}
];
