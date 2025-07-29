import { PopoverOrigin } from '@mui/material/Popover/Popover';

export const arrowDropDownProps = {
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
      top: 0,
      right: 22,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0
    }
  }
};

export const dropDownTransformOrigin: PopoverOrigin = { horizontal: 'right', vertical: 'top' };

export const dropDownAnchorOrigin: PopoverOrigin = { horizontal: 45, vertical: 'bottom' };
