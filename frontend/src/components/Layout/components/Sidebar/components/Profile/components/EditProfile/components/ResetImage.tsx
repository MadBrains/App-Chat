import React, { useState } from 'react';
import CloseIcon from 'src/assets/icons/CloseIcon';
import { deleteButtonSx } from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/styled';
import { Button } from 'src/ui/Button/Button';
import DialogDrawer from 'src/ui/Drawer/DialogDrawer';
import { Stack } from '@mui/material';

interface ResetImageProps {
  onResetImage: () => void;
}

const ResetImage: React.FC<ResetImageProps> = ({ onResetImage }) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const toggleConfirm = () => {
    setIsOpenConfirm(prevState => !prevState);
  };

  const handleResetImage = () => {
    onResetImage();
    toggleConfirm();
  };
  return (
    <>
      <Button variant='text' onClick={toggleConfirm} startIcon={<CloseIcon />} sx={deleteButtonSx}>
        Удалить
      </Button>
      <DialogDrawer title='Удалить фотографию?' open={isOpenConfirm} onClose={toggleConfirm}>
        <Stack direction='row' spacing={1}>
          <Button variant='contained' onClick={handleResetImage}>
            Да
          </Button>
          <Button variant='outlined' onClick={toggleConfirm}>
            Нет
          </Button>
        </Stack>
      </DialogDrawer>
    </>
  );
};

export default ResetImage;
