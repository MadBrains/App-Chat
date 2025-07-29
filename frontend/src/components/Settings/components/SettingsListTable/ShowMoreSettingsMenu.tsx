import React from 'react';
import DropDownTemplate from 'src/ui/DropDownTemplate/DropDownTemplate';
import { IconButton } from 'src/ui/IconButton/IconButton';
import SvgThreeDot from 'src/assets/icons/ThreeDot';
import { MenuItem } from 'src/components/UserList/components/UserListTable/ShowMoreMenu/styled';
import { Divider, ListItemIcon, ListItemText } from '@mui/material';
import { MockSettingsTableRows } from 'src/components/Settings/components/SettingsListTable/_mock';
import {
  EnumShowMoreSettingsControls,
  manageSettingsOptions
} from 'src/components/Settings/components/SettingsListTable/constants';
import { SelectedSettingControl } from 'src/components/Settings/components/SettingsListTable/SettingsListTable';

interface ShowMoreSettingsMenuProps extends MockSettingsTableRows {
  onSettingControl: (settingData: SelectedSettingControl) => void;
}

const ShowMoreSettingsMenu: React.FC<ShowMoreSettingsMenuProps> = ({
  id,
  name,
  creationDate,
  creator,
  description,
  onSettingControl
}) => {
  const handleSelect = (type: EnumShowMoreSettingsControls, closeFunc: () => void) => () => {
    onSettingControl({ settingData: { id, name, description }, modalType: type });
    closeFunc();
  };

  return (
    <DropDownTemplate
      renderButton={({ onClickDropDown }) => (
        <IconButton onClick={onClickDropDown} sx={{ color: 'inherit' }}>
          <SvgThreeDot />
        </IconButton>
      )}
    >
      {({ onCloseDropDown }) =>
        manageSettingsOptions().map((option, index) => (
          <MenuItem key={index} onClick={handleSelect(option.type, onCloseDropDown)}>
            <ListItemIcon sx={{ color: 'inherit' }}>{option.icon}</ListItemIcon>
            <ListItemText>{option.label}</ListItemText>
            {manageSettingsOptions().length !== index && (
              <Divider sx={{ position: 'absolute', bottom: -3, left: 0, width: '100%' }} />
            )}
          </MenuItem>
        ))
      }
    </DropDownTemplate>
  );
};

export default ShowMoreSettingsMenu;
