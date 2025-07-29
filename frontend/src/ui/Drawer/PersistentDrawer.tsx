import React, { PropsWithChildren } from 'react';
import MuiDrawer from '@mui/material/Drawer';
import { SxProps } from '@mui/system';

interface PersistentDrawerProps extends PropsWithChildren {
  open: boolean;
  sx?: SxProps;
}

const PersistentDrawer: React.FC<PersistentDrawerProps> = ({ open, sx, children }) => {
  return (
    <MuiDrawer open={open} sx={sx} anchor='right' variant='persistent'>
      {children}
    </MuiDrawer>
  );
};

export default PersistentDrawer;
