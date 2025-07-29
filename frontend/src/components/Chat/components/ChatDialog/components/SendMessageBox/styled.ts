import { styled, Theme } from '@mui/material/styles';
import { IconButton as MuiIconButton } from 'src/ui/IconButton/IconButton';

export const SendMessageContainer = styled('div')({
  display: 'flex',
  alignItems: 'end',
  boxShadow: '0px -4px 25px 0px #00000008',
  paddingRight: '18px',
  paddingTop: '20px'
});

export const sendFieldSx = {
  '& .MuiFilledInput-root': {
    minHeight: 46,
    fontSize: 14,
    boxSizing: 'inherit',
    display: 'block',
    textAlign: 'left',
    borderRadius: '30px',
    padding: '13px 20px',
    backgroundColor: (theme: Theme) => theme.palette.input.main
  },
  '& .MuiInputBase-input': {
    borderRadius: 'none'
  }
};

export const invisibleInputSx = {
  opacity: 0,
  position: 'absolute',
  left: 0,
  height: '100%',
  zIndex: 1,
  width: '100%',
  '& .MuiInputBase-input': {
    height: '100%',
    cursor: 'pointer'
  }
};

export const AttachFileIcon = styled(MuiIconButton)(({ theme }) => ({
  backgroundColor: theme.palette.input.main,
  marginRight: '8px',
  height: '46px',
  width: '46px',
  ':hover': {
    backgroundColor: theme.palette.input.light
  },
  color: 'inherit',
  '&:disabled': {
    backgroundColor: theme.palette.input.main
  }
}));

export const SendIcon = styled(MuiIconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  marginLeft: '8px',
  height: '46px',
  width: '46px',
  ':hover': {
    backgroundColor: theme.palette.primary.main
  },
  color: theme.palette.secondary.main
}));
