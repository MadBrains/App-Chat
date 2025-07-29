import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Divider, ListItemText, MenuItem as MuiMenuItem } from '@mui/material';
import { Colors } from 'src/config/colors';
import ListItemIcon from '@mui/material/ListItemIcon';
import { EnumChatMenuOptions } from 'src/components/Chat/common/static';
import { archiveChat, muteChat } from 'src/api/chat';
import { EnumMemberOptions } from 'src/components/Chat/components/ChatInfo/_mocks';
import { manageUserOptions } from 'src/components/UserList/components/UserListTable/ShowMoreMenu/constants';

interface MenuItemProps {
  danger?: boolean;
}

const MenuItem = styled(MuiMenuItem, {
  shouldForwardProp: prop => prop !== 'danger'
})<MenuItemProps>(({ danger }) => ({
  paddingLeft: 0,
  color: danger ? Colors.red : 'inherit',
  lineHeight: '19px',
  padding: '18px',
  letterSpacing: '-0.03em'
}));

export const MenuItemText = styled(ListItemText)({
  '& .MuiTypography-root': {
    fontSize: '14px',
    lineHeight: '19px'
  }
});

interface MenuListProps {
  options: {
    id?: string;
    icon: ReactNode;
    label: string;
    danger?: boolean;
  }[];
  onClick?: () => void;
  onMenuItemClick?: (id: string, onClick?: () => void) => void;
}

const MenuList: React.FC<MenuListProps> = ({ options, onClick, onMenuItemClick }) => {
  return (
    <>
      {options.map(({ id, icon, label, danger }, index) => (
        <MenuItem
          key={label}
          danger={danger}
          onClick={onMenuItemClick && id ? () => onMenuItemClick(id, onClick) : onClick}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
          <MenuItemText>{label}</MenuItemText>
          {options.length - 1 !== index && (
            <Divider sx={{ position: 'absolute', bottom: 0, width: '85%' }} />
          )}
        </MenuItem>
      ))}
    </>
  );
};

export default MenuList;
