import { styled } from '@mui/material/styles';
import { IconButton as MuiIconButton } from 'src/ui/IconButton/IconButton';

export const AddChat = styled('div')(({ theme }) => ({
  marginBottom: '4px',
  fontSize: '14px',
  fontWeight: '400',
  cursor: 'pointer',
  ':hover': {
    background: `linear-gradient(270deg, ${theme.palette.background.default} 46.9%, rgba(255, 255, 255, 0) 100%)`
  }
}));
export const AddNewChatButton = styled(MuiIconButton)<{ small: boolean | undefined }>(
  ({ theme, small }) => ({
    backgroundColor: theme.palette.primary.main,
    ':hover': {
      backgroundColor: theme.palette.primary.main
    },
    color: theme.palette.neutral.light,
    height: small ? '36px' : '53px',
    width: small ? '36px' : '53px',
    marginRight: '10px'
  })
);
