import { PopoverOrigin } from '@mui/material/Popover/Popover';

export const anchorElementSx = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: '46%',
      right: -4,
      width: 17,
      height: 17,
      bgcolor: 'secondary.light',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0
    }
  }
};

export const popoverAnchorOrigin: PopoverOrigin = {
  vertical: 'center',
  horizontal: -10
};

export const popoverTransformOrigin: PopoverOrigin = {
  vertical: 'center',
  horizontal: 'right'
};
