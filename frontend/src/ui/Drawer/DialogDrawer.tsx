import React, { PropsWithChildren } from 'react';
import { Box, Drawer as MuiDrawer } from '@mui/material';
import { DrawerProps } from '@mui/material/Drawer/Drawer';
import { Button } from 'src/ui/Button/Button';
import CloseIcon from 'src/assets/icons/CloseIcon';
import { styled } from '@mui/material/styles';
import { Typography } from 'src/ui/Typography/Typography';
import { Variant } from '@mui/material/styles/createTypography';

const drawerSx = {
  '& .MuiPaper-root': {
    pt: '25px',
    pb: '25px',
    maxWidth: '500px',
    overflow: 'hidden',
    width: '100%'
  }
};

const closeDrawerSx = {
  fontSize: 14,
  lineHeight: '18px',
  padding: 1,
  width: 'max-content',
  borderRadius: 'initial',
  ml: 'auto'
};

const drawerContentSx = { padding: '36px', overflow: 'auto' };
const drawerTitleSx = { mt: 3, mb: 3, px: 4.5 };
const drawerDescriptionSx = { px: 4.5 };

export const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  padding: '0 36px 15px',
  alignItems: 'center',
  justifyContent: 'flex-end',
  borderBottom: '1px solid #D9D9D9'
}));

type DrawerDescriptionColors = 'secondary' | 'main';

interface UiDrawerProps {
  title?: string;
  description?: string;
  titleVariant?: Variant;
  additionalButton?: React.ReactNode;
  descriptionColor?: DrawerDescriptionColors;
}

export interface ControlDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DialogDrawer: React.FC<DrawerProps & UiDrawerProps & PropsWithChildren> = ({
  onClose,
  open,
  title,
  children,
  description,
  titleVariant,
  additionalButton,
  descriptionColor
}) => {
  return (
    <MuiDrawer open={open} anchor='right' sx={drawerSx} onClose={onClose}>
      <DrawerHeader>
        {additionalButton}
        <Button
          variant='text'
          endIcon={<CloseIcon />}
          onClick={event => onClose && onClose(event, 'backdropClick')}
          sx={closeDrawerSx}
        >
          Закрыть
        </Button>
      </DrawerHeader>
      {title && (
        <Typography variant={titleVariant ? titleVariant : 'h1'} component='p' sx={drawerTitleSx}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography
          variant='h3'
          component='p'
          color={descriptionColor ?? 'secondary'}
          sx={drawerDescriptionSx}
          letterSpacing='-0.03em'
        >
          {description}
        </Typography>
      )}
      <Box sx={drawerContentSx}>{children}</Box>
    </MuiDrawer>
  );
};

export default DialogDrawer;
