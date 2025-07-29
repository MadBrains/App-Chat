import React from 'react';
import { IconButton } from 'src/ui/IconButton/IconButton';
import SvgThreeDot from 'src/assets/icons/ThreeDot';
import { Divider, ListItemIcon, ListItemText } from '@mui/material';
import { MenuItem } from 'src/components/UserList/components/UserListTable/ShowMoreMenu/styled';
import {
  EnumShowMoreControls,
  manageUserOptions
} from 'src/components/UserList/components/UserListTable/ShowMoreMenu/constants';
import { SelectedUserControl } from 'src/components/UserList/components/UserListTable/UserListTable';
import DropDownTemplate from 'src/ui/DropDownTemplate/DropDownTemplate';
import { MockTableRows } from 'src/components/UserList/components/UserListTable/__mock';

interface ShowMoreMenuProps extends MockTableRows {
  userName?: string;
  onUserControl: (userData: SelectedUserControl) => void;
}

const ShowMoreMenu: React.FC<ShowMoreMenuProps> = ({
  id,
  first_name,
  last_name,
  email,
  outside_name,
  phone,
  role_ids,
  middle_name,
  about_me,
  user_type,
  userName,
  blocked,
  onUserControl
}) => {
  const handleSelect = (type: EnumShowMoreControls, closeFunc: () => void) => () => {
    // do something with user id
    onUserControl({
      userData: {
        id: Number(id),
        first_name,
        last_name,
        email,
        outside_name,
        phone,
        middle_name,
        about_me,
        role_ids,
        user_type
      },
      modalType: type
    });
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
        manageUserOptions({ isBlocked: blocked }).map((option, index) => (
          <MenuItem key={index} onClick={handleSelect(option.type, onCloseDropDown)}>
            <ListItemIcon sx={{ color: 'inherit' }}>{option.icon}</ListItemIcon>
            <ListItemText>{option.label}</ListItemText>
            {manageUserOptions({ isBlocked: blocked }).length !== index && (
              <Divider sx={{ position: 'absolute', bottom: -3, left: 0, width: '100%' }} />
            )}
          </MenuItem>
        ))
      }
    </DropDownTemplate>
  );
};

export default ShowMoreMenu;
