import SvgEdit from 'src/assets/icons/Edit';
import SvgUnlock from 'src/assets/icons/Unlock';
import SvgKey from 'src/assets/icons/Key';

export enum EnumShowMoreControls {
  edit = 'edit',
  blocked = 'blocked',
  password = 'password'
}

interface ManageUserOptionsProps {
  isBlocked?: boolean;
}

export const manageUserOptions = ({ isBlocked }: ManageUserOptionsProps) => [
  { icon: <SvgEdit />, label: 'Редактировать', type: EnumShowMoreControls.edit },
  {
    icon: <SvgUnlock />,
    label: isBlocked ? 'Разблокировать' : 'Заблокировать',
    type: EnumShowMoreControls.blocked
  },
  { icon: <SvgKey />, label: 'Сбросить пароль', type: EnumShowMoreControls.password }
];
