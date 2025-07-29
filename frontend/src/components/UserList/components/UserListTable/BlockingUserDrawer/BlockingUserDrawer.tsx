import React from 'react';
import DialogDrawer, { ControlDrawerProps } from 'src/ui/Drawer/DialogDrawer';
import SelectField from 'src/ui/Select/Select';
import { Stack } from '@mui/material';
import { Button } from 'src/ui/Button/Button';
import { useForm } from 'react-hook-form';
import { UserDataInput } from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/styled';
import { SelectedUserControl } from 'src/components/UserList/components/UserListTable/UserListTable';

const blockReasonOptions = [
  {
    label: 'Нецензурная лексика',
    value: 'toxic'
  },
  {
    label: 'Спам',
    value: 'spam'
  },
  {
    label: 'Другое',
    value: 'other'
  }
];

const blockingTimeOptions = [
  {
    label: 'Сутки',
    value: 'short'
  },
  {
    label: 'Неделя',
    value: 'week'
  },
  {
    label: 'Навсегда',
    value: 'forever'
  }
];

interface BlockingUserDrawerProps {
  isBlockedUser?: boolean;
  selectedUserData: SelectedUserControl;
}

interface BlockingUserScheme {
  reason: string;
  time: string;
  comment: string;
}

const BlockingUserDrawer: React.FC<ControlDrawerProps & BlockingUserDrawerProps> = ({
  isOpen,
  onClose,
  isBlockedUser,
  selectedUserData
}) => {
  const {
    register,
    formState: { errors, isDirty },
    reset,
    watch,
    handleSubmit
  } = useForm<BlockingUserScheme>({ shouldUnregister: true });

  const reasonField = watch('reason');
  const fullName = `${selectedUserData.userData?.first_name} ${selectedUserData.userData?.last_name}`;
  return (
    <DialogDrawer
      open={isOpen}
      title={isBlockedUser ? 'Разблокировать пользователя' : 'Заблокировать пользователя'}
      description={
        isBlockedUser
          ? `Вы уверены, что хотите разблокировать пользователя ${fullName}?`
          : `Вы уверены, что хотите заблокировать пользователя ${fullName}?`
      }
      onClose={onClose}
      descriptionColor='main'
    >
      {isBlockedUser ? (
        <Stack component='div' spacing={2}>
          <Button variant='contained' color='secondary' onClick={onClose}>
            Отменить
          </Button>
          <Button variant='contained' onClick={onClose}>
            Разблокировать
          </Button>
        </Stack>
      ) : (
        <Stack component='form' spacing={2}>
          <SelectField
            register={register('reason', { required: 'Обязательное поле' })}
            label='Причина блокировки'
            options={blockReasonOptions}
            sx={{ height: 48 }}
          />
          {reasonField === 'other' && (
            <UserDataInput register={register('comment')} label='Комментарий' />
          )}
          <SelectField
            register={register('time', { required: 'Обязательное поле' })}
            label='Время блокировки'
            options={blockingTimeOptions}
            sx={{ height: 48 }}
          />
          <div>
            <Button variant='contained' sx={{ mt: 2 }} onClick={onClose}>
              Заблокировать
            </Button>
          </div>
        </Stack>
      )}
    </DialogDrawer>
  );
};

export default BlockingUserDrawer;
