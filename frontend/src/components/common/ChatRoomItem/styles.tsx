import { styled } from '@mui/material/styles';
import { Typography } from 'src/ui/Typography/Typography';

interface ChatContainerProps {
  small?: boolean;
  active?: boolean;
}

export const Container = styled('div')<ChatContainerProps>(({ small, active, theme }) => ({
  height: small ? '45px' : '60px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',
  paddingRight: 20,
  paddingLeft: 25,
  backgroundColor: active ? theme.palette.neutral.light : ''
}));

export const Chip = styled('div')(
  ({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  width: 29px;
  height: 15px;
  font-size: 12px;
  line-height: 12px;
  background-color: ${theme.palette.secondary.main};
  padding-top: 2px;
  letter-spacing: -0.03em;
`
);

export const ShortMessage = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 250,
  mt: '2px',
  color: theme.palette.secondary.main
}));

export const MessageAuthor = styled(Typography)(({ theme }) => ({
  display: 'inline',
  fontSize: '14px',
  fontWeight: '400',
  color: theme.palette.primary.main
}));

export const Subtitle = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main
}));

export const ArchivedIconField = styled('span')<{ isMuted?: boolean }>(({ isMuted }) => ({
  position: 'relative',
  top: '3px',
  marginRight: isMuted ? '5px' : '0px'
}));

export const MuteIconContainer = styled('span')(({ theme }) => ({
  marginLeft: '6px',
  color: theme.palette.secondary.main
}));
