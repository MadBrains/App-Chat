import React, { PropsWithChildren } from 'react';
import { Typography } from '@mui/material';

interface SidebarItemProps extends PropsWithChildren {
  isOpenSidebar?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ isOpenSidebar, children }) => {
  return (
    <Typography
      component='span'
      sx={{
        opacity: isOpenSidebar ? 1 : 0,
        fontSize: '12px',
        lineHeight: '110%',
        whiteSpace: 'pre-line',
        width: isOpenSidebar ? 'min-content' : 0
      }}
    >
      {children}
    </Typography>
  );
};

export default SidebarItem;
