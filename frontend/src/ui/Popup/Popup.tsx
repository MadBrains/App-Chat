import React, { PropsWithChildren } from 'react';
import { Box, Popover } from '@mui/material';
import { Button } from 'src/ui/Button/Button';
import CloseIcon from 'src/assets/icons/CloseIcon';
import { closePopupSx, PopupHeader } from 'src/ui/Popup/styles';
import { PopoverProps } from '@mui/material/Popover/Popover';

const Popup: React.FC<PopoverProps & PropsWithChildren> = ({ open, onClose, children, sx }) => {
  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center'
      }}
    >
      <PopupHeader>
        <Button
          variant='text'
          endIcon={<CloseIcon />}
          onClick={event => onClose && onClose(event, 'backdropClick')}
          sx={closePopupSx}
        >
          Закрыть
        </Button>
      </PopupHeader>
      <Box sx={sx}>{children}</Box>
    </Popover>
  );
};

export default Popup;
