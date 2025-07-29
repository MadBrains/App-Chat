import React, { ReactNode } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItemMaterial from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { MenuItemText } from 'src/components/Chat/common/MenuList';
import { MenuItem as MuiMenuItem, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Colors } from 'src/config/colors';

interface MemberDetailMenuProps {
  options: {
    id?: string;
    icon: ReactNode;
    label: string;
    danger?: boolean;
  }[];
  onClick?: () => void;
  onMenuItemClick?: (id: string, onClick?: () => void) => void;
}

interface DetailMenuProps {
  danger?: boolean;
}

const MenuItem = styled(MuiMenuItem, {
  shouldForwardProp: prop => prop !== 'danger'
})<DetailMenuProps>(({ danger }) => ({
  padding: 0,
  color: danger ? Colors.red : 'inherit',
  ':hover': {
    backgroundColor: 'inherit'
  },
  '.MuiListItemIcon-root': {
    minWidth: 'unset',
    marginRight: '10px'
  }
}));

const MemberDetailMenu: React.FC<MemberDetailMenuProps> = ({
  options,
  onClick,
  onMenuItemClick
}) => {
  return (
    <Stack spacing={2}>
      {options.map(({ id, icon, label, danger }, index) => (
        <MenuItem
          key={label}
          danger={danger}
          onClick={onMenuItemClick && id ? () => onMenuItemClick(id, onClick) : onClick}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
          <MenuItemText>{label}</MenuItemText>
        </MenuItem>
      ))}
    </Stack>
  );
};

export default MemberDetailMenu;
