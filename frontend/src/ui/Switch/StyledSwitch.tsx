import { styled } from '@mui/material/styles';
import { Switch } from 'src/ui/Switch/Switch';
import { Colors } from 'src/config/colors';

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 41,
  height: 24,
  padding: 0,
  display: 'flex',
  marginRight: 8,
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 20
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(17px)'
    }
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    color: Colors.darkGray,
    '& + .MuiSwitch-track': {
      opacity: 1,
      border: `1px solid ${theme.palette.primary.main}`
    },
    '&.Mui-checked': {
      transform: 'translateX(17px)',
      color: Colors.black,
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: Colors.white,
        border: `1px solid ${theme.palette.primary.main}`
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 20,
    height: 20,
    borderRadius: '100px',
    transition: theme.transitions.create(['width'], {
      duration: 200
    })
  },
  '& .MuiSwitch-track': {
    borderRadius: '100px',
    opacity: 1,
    backgroundColor: Colors.white,
    border: `1px solid ${theme.palette.primary.main}`,
    boxSizing: 'border-box'
  }
}));
