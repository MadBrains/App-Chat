import React from 'react';
import LogoutIcon from 'src/assets/icons/LogoutIcon';
import { Box } from 'src/ui/Box/Box';
import SidebarItem from 'src/components/Layout/components/Sidebar/components/SidebarItem/SidebarItem';
import { Button } from 'src/ui/Button/Button';
import {
  logoutButtonIconSx,
  logoutButtonSx
} from 'src/components/Layout/components/Sidebar/styled';
import { useRouter } from 'next/router';
import { EnumRoutes } from 'src/config/routes';
import { removeAuthTokens } from 'src/utils/helpers/authHelper';

interface LogoutProps {
  isOpenSidebar?: boolean;
}

const Logout: React.FC<LogoutProps> = ({ isOpenSidebar }) => {
  const router = useRouter();

  return (
    <Box sx={logoutButtonSx}>
      <Button
        onClick={() => {
          removeAuthTokens();
          router.push(EnumRoutes.auth);
        }}
        variant='text'
        startIcon={<LogoutIcon />}
        sx={logoutButtonIconSx}
      >
        {isOpenSidebar && <SidebarItem isOpenSidebar={isOpenSidebar}>Выход</SidebarItem>}
      </Button>
    </Box>
  );
};

export default Logout;
