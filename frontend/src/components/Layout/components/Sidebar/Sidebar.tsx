import React, { useState } from 'react';
import { IconButton } from 'src/ui/IconButton/IconButton';
import MenuIcon from 'src/assets/icons/Menu';
import { SidebarDrawer } from 'src/components/Layout/styled';
import SidebarMenu from 'src/components/Layout/components/Sidebar/components/Menu/SidebarMenu';
import HideSidebarIcon from 'src/assets/icons/HideSidebarIcon';
import {
  burgerMenuSx,
  hideSidebarSx,
  MaterialUISwitch
} from 'src/components/Layout/components/Sidebar/styled';
import Logout from 'src/components/Layout/components/Sidebar/components/Logout/Logout';
import { Backdrop } from '@mui/material';
import dynamic from 'next/dynamic';
import { useDispatch } from 'src/redux/store';
import { toggleTheme } from 'src/redux/slices/profileSlice';

const Profile = dynamic(
  () => import('src/components/Layout/components/Sidebar/components/Profile/Profile')
);

const Sidebar: React.FC = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const dispatch = useDispatch();

  const handleSidebarOpen = () => {
    setIsOpenSideBar(true);
  };

  const handleSidebarClose = () => {
    setIsOpenSideBar(false);
  };

  const handleToggleTheme = () => dispatch(toggleTheme());

  return (
    <>
      <Backdrop
        onClick={handleSidebarClose}
        open={isOpenSideBar}
        sx={{ position: 'fixed', zIndex: theme => theme.zIndex.mobileStepper }}
      />
      <SidebarDrawer
        variant='permanent'
        open={isOpenSideBar}
        sx={{ zIndex: theme => theme.zIndex.mobileStepper }}
      >
        {!isOpenSideBar ? (
          <IconButton onClick={handleSidebarOpen} sx={burgerMenuSx}>
            <MenuIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleSidebarClose} sx={hideSidebarSx}>
            <HideSidebarIcon />
          </IconButton>
        )}
        <Profile isOpenSidebar={isOpenSideBar} onCloseSidebar={handleSidebarClose} />
        <SidebarMenu open={isOpenSideBar} onItemClick={handleSidebarClose} />
        {isOpenSideBar && <MaterialUISwitch onClick={handleToggleTheme} />}
        <Logout isOpenSidebar={isOpenSideBar} />
      </SidebarDrawer>
    </>
  );
};

export default Sidebar;
