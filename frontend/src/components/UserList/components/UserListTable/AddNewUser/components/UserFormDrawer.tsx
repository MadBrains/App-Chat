import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { UserDataInput } from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/styled';
import { Button } from 'src/ui/Button/Button';
import DialogDrawer, { ControlDrawerProps } from 'src/ui/Drawer/DialogDrawer';
import ConfirmDrawer from 'src/ui/Drawer/ConfirmDrawer';
import { postAdminWorkers } from 'src/api/admin/workers';
import RoleSelector from 'src/components/Select/RoleSelector';
import { emailPattern, phonePattern, RU_PHONE_MASK } from 'src/config/formPatterns';
import InputMask from 'react-input-mask';
import { toastAlert } from 'src/ui/Alert/toastify';
import { EnumPermissionList } from 'src/api/types';

export type UserFormFieldParams = {
  name: keyof CreateUserForm;
  label: string;
  rule?: any;
};

export const userFormFields: UserFormFieldParams[] = [
  {
    name: 'lastName',
    rule: { required: 'Поле обязательно к заполнению' },
    label: 'Фамилия'
  },
  {
    name: 'name',
    rule: { required: 'Поле обязательно к заполнению' },
    label: 'Имя'
  },
  {
    name: 'middleName',
    label: 'Отчество'
  },
  {
    name: 'email',
    label: 'E-mail',
    rule: { required: 'Поле обязательно к заполнению', pattern: emailPattern }
  }
];

export interface CreateUserForm {
  phoneNumber: string;
  name: string;
  middleName: string;
  lastName: string;
  foreignName: string;
  email: string;
  role_id: string;
  permission_list?: Array<string>;
}

const UserFormDrawer: React.FC<ControlDrawerProps> = ({ isOpen, onClose }) => {
  const {
    register,
    formState: { errors, isDirty },
    reset,
    handleSubmit,
    control,
    getValues
  } = useForm<CreateUserForm>({
    defaultValues: {
      middleName: '',
      name: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      role_id: ''
    }
  });
  const [isOpenConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleClose = () => {
    if (isDirty) {
      setOpenConfirmDialog(true);
    } else {
      onClose();
    }
  };

  const handleCancelChange = () => {
    reset();
    setOpenConfirmDialog(false);
    onClose();
  };
  const onSubmit: SubmitHandler<CreateUserForm> = data => {
    postAdminWorkers({
      first_name: data.name,
      last_name: data.lastName,
      middle_name: data.middleName,
      email: data.email,
      phone: data.phoneNumber,
      role_ids: [Number(data.role_id)],
      user_type: 1,
      permission_list: [EnumPermissionList.CREATE_GROUP_CHATS]
    })
      .then(() => toastAlert('Пользователь успешно создан'))
      .then(() => {
        reset();
        onClose();
      })
      .catch(err => {
        toastAlert(`Что-то пошло не так: ${err.response.data}`, true);
      });
  };

  return (
    <DialogDrawer open={isOpen} title='Создание' onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {userFormFields.map(field => (
          <UserDataInput
            key={field.name}
            register={register(field.name, field.rule)}
            label={field.label}
            error={!!errors?.[field.name]?.message}
            errorMessage={errors?.[field.name]?.message}
          />
        ))}
        <Controller
          control={control}
          rules={{ pattern: phonePattern }}
          name='phoneNumber'
          render={({ field: { onChange, value } }) => (
            <InputMask mask={RU_PHONE_MASK} value={value} onChange={onChange}>
              <UserDataInput error={!!errors.phoneNumber?.message} label='Телефон' />
            </InputMask>
          )}
        />
        <RoleSelector
          label='Роль'
          sx={{ height: '46px', mb: 4.5 }}
          register={register('role_id', { required: 'Обязательное поле' })}
          errorMessage={errors?.role_id?.message}
        />
        <Button fullWidth variant='contained' type='submit'>
          Создать пользователя
        </Button>
      </form>
      <ConfirmDrawer
        open={isOpenConfirmDialog}
        title='Вы уверены, что хотите выйти?'
        description='Ваши данные не сохранятся'
        confirmLabel='Сбросить данные'
        onCancel={() => setOpenConfirmDialog(false)}
        onConfirm={handleCancelChange}
      />
    </DialogDrawer>
  );
};

export default UserFormDrawer;
