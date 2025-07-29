import React from 'react';
import { sidebarMenu } from 'src/components/Layout/components/Sidebar/consts';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { List } from '@mui/material';
import {
  listButtonSx,
  ListIconStyled,
  listItemSx
} from 'src/components/Layout/components/Sidebar/components/Menu/styled';
import SidebarItem from 'src/components/Layout/components/Sidebar/components/SidebarItem/SidebarItem';
import { EnumRoutes } from 'src/config/routes';
import { useRouter } from 'next/router';

interface SidebarMenuProps {
  onItemClick: () => void;
  open?: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ open, onItemClick }) => {
  const router = useRouter();

  const handleMenuClick = (path?: EnumRoutes) => {
    onItemClick();
    path && router.push(path);
  };

  return (
    <List>
      {sidebarMenu.map(item => (
        <ListItem key={item.name} disablePadding sx={listItemSx} disabled={item.disabled}>
          <ListItemButton sx={listButtonSx} onClick={() => handleMenuClick(item.path)}>
            <ListIconStyled open={open}>
              <item.icon />
            </ListIconStyled>
            <SidebarItem isOpenSidebar={open}>{item.name}</SidebarItem>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarMenu;
