import React, { useState } from 'react';
import { Modal } from 'src/ui/Modal/Modal';
import { Box } from 'src/ui/Box/Box';
import { Button } from 'src/ui/Button/Button';
import CloseIcon from 'src/assets/icons/CloseIcon';
import { closePopupSx } from 'src/ui/Popup/styles';
import { Typography } from 'src/ui/Typography/Typography';
import { Stack } from '@mui/material';
import { EnumShowMoreSettingsControls } from 'src/components/Settings/components/SettingsListTable/constants';
import {
  ModalContent,
  ModalDeleteRole,
  ModalHeader
} from 'src/components/Settings/components/SettingsModal/styled';
interface SettingsModalProps {
  isError: boolean;
  isOpen: EnumShowMoreSettingsControls | null;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, isError, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  const titleSx = {
    mb: '24px',
    fontSize: '38px',
    lineHeight: '38px',
    letterSpacing: '-0.05em'
  };

  return (
    <Modal open={isOpen === EnumShowMoreSettingsControls.delete} onClose={handleClose}>
      <Box sx={ModalDeleteRole}>
        <ModalHeader>
          <Button variant='text' endIcon={<CloseIcon />} onClick={handleClose} sx={closePopupSx}>
            Закрыть
          </Button>
        </ModalHeader>
        <ModalContent>
          {isError ? (
            <>
              <Typography variant='h1' sx={titleSx}>
                Ошибка при удалении
              </Typography>
              <Typography variant='h3'>
                Невозможно удалить роль «Оператор», т.к. она задействована в системе. Сначала
                отвяжите роль от пользователей.
              </Typography>
              <Stack spacing={2} mt='35px'>
                <Button variant='contained'>Перейти в раздел «Пользователи»</Button>
              </Stack>
            </>
          ) : (
            <>
              <Typography variant='h1' sx={titleSx}>
                Удалить роль
              </Typography>
              <Typography variant='h3'>Вы уверены, что хотите удалить роль «Оператор» ?</Typography>
              <Stack spacing={2} mt='35px'>
                <Button onClick={handleClose} variant='contained' color='secondary'>
                  Отменить
                </Button>
                <Button variant='contained'>Удалить</Button>
              </Stack>
            </>
          )}
        </ModalContent>
      </Box>
    </Modal>
  );
};

export default SettingsModal;
