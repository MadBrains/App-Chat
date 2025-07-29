import { styled } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';

interface SidebarIcon {
  open?: boolean;
}

export const listButtonSx = { padding: '3px' };

export const listItemSx = { display: 'block', mb: 2 };

export const ListIconStyled = styled(ListItemIcon)<SidebarIcon>(({ open }) => ({
  minWidth: 'unset',
  marginRight: open ? 16 : 0,
  color: 'inherit'
}));
