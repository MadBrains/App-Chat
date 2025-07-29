import React from 'react';
import SvgEdit from 'src/assets/icons/Edit';
import SvgCloseIcon from 'src/assets/icons/CloseIcon';

export enum EnumShowMoreSettingsControls {
  edit = 'edit',
  delete = 'delete'
}

export const manageSettingsOptions = () => [
  {
    icon: <SvgEdit width={17} height={17} viewBox={'0 0 24 24'} />,
    label: 'Редактировать',
    type: EnumShowMoreSettingsControls.edit
  },
  {
    icon: <SvgCloseIcon width={12} height={12} viewBox={'0 0 10 10'} />,
    label: 'Удалить',
    type: EnumShowMoreSettingsControls.delete
  }
];
