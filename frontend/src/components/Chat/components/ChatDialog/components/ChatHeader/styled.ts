import { styled } from '@mui/material/styles';

export const drawerWidth = 300;

interface ChatHeaderProps {
  open?: boolean;
}

export const ChatHeaderWrapper = styled('div', {
  shouldForwardProp: prop => prop !== 'open'
})<ChatHeaderProps>(({ theme, open }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '11px 20px',
  alignItems: 'center',
  boxShadow: '0px 16px 25px rgba(0, 0, 0, 0.05)',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth
  })
}));

export const ChatContainer = styled('div', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: '20px 0 20px 20px',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginRight: 0,
  height: 'calc(100% - 60px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  })
}));

export const Wrapper = styled('div')({
  overflowY: 'auto',
  height: '100%',
  display: 'flex',
  flexDirection: 'column-reverse'
});
