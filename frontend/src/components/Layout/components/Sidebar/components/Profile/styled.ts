import { styled } from '@mui/material/styles';
import { Switch } from 'src/ui/Switch/Switch';
import { Colors } from 'src/config/colors';
import { FormControlLabel } from '@mui/material';
import { palette } from '@mui/system';

export const defaultButtonSx = {
  width: '100%',
  padding: '2px',
  borderRadius: 'initial',
  letterSpacing: 'initial',
  minWidth: '30px',
  fontSize: 12,
  justifyContent: 'flex-start'
};

export const profileBoxSx = {
  display: 'flex',
  alignItems: 'center',
  ...defaultButtonSx
};

interface ProfileImageProps {
  size: number;
}

export const onlineSwitchSx = {
  display: 'flex',
  mt: 2,
  mr: 1,
  ...defaultButtonSx
};

export const AvatarContainer = styled('div')<ProfileImageProps>(({ size }) => ({
  borderRadius: '100%',
  width: size,
  height: size,
  position: 'relative',
  border: '1px solid black',
  padding: 1,
  marginRight: 14
}));

export const OnlineSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)'
    }
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    color: '#FC8181',
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: Colors.green,
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.neutral.light
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200
    })
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.neutral.light,
    border: `1px solid ${Colors.black}`,
    boxSizing: 'border-box'
  }
}));

interface SwitchWithLabelProps {
  open?: boolean;
}

export const SwitchWithLabel = styled(FormControlLabel)<SwitchWithLabelProps>(({ open }) => ({
  marginLeft: 0,
  marginRight: 0,
  '& .MuiTypography-root': {
    fontSize: '12px',
    opacity: open ? 1 : 0
  }
}));
