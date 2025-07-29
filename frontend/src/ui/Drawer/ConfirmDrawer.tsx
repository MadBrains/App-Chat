import React from 'react';
import DialogDrawer from 'src/ui/Drawer/DialogDrawer';
import { Typography } from 'src/ui/Typography/Typography';
import { Button } from 'src/ui/Button/Button';
import { Stack } from '@mui/material';

interface ConfirmDrawerProps {
  open: boolean;
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
}

const ConfirmDrawer: React.FC<ConfirmDrawerProps> = ({
  open,
  onConfirm,
  description,
  onCancel,
  title,
  confirmLabel
}) => (
  <DialogDrawer open={open} onClose={onCancel}>
    <Stack spacing={3}>
      <Typography component='h3' fontSize={38} lineHeight='38px' letterSpacing='-0.05em'>
        {title}
      </Typography>
      {description && (
        <Typography variant='h3' component='p' letterSpacing='-0.03em'>
          {description}
        </Typography>
      )}
      <Stack spacing={2} mt={1}>
        <Button onClick={onCancel} variant='contained' color='secondary'>
          Отменить
        </Button>
        <Button onClick={onConfirm} variant='contained'>
          {confirmLabel}
        </Button>
      </Stack>
    </Stack>
  </DialogDrawer>
);

export default ConfirmDrawer;
