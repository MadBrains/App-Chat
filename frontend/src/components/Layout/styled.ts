import { CSSObject, styled, Theme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

export const drawerWidth = 180;
export const mainSx = { marginLeft: 7.5, height: '100vh' };

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: 60,
  padding: '66px 15px 20px',
  [theme.breakpoints.up('sm')]: {
    width: 60
  }
});

export const SidebarDrawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    position: 'fixed',
    '& .MuiPaper-root': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },

    ...(open && {
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        padding: '66px 15px 20px',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        }),
        overflowX: 'hidden'
      }
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
);
