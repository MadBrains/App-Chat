import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { UserDataInput } from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/styled';
import CopyContentIcon from 'src/assets/icons/action/CopyContentIcon';
import copyToClipboard from 'src/utils/helpers/copyToClipboard';
import { CreateUserForm } from 'src/components/UserList/components/UserListTable/AddNewUser/components/UserFormDrawer';
import { Button } from 'src/ui/Button/Button';
import LockIcon from 'src/assets/icons/userEditing/LockIcon';
import { putAdminWorkers } from 'src/api/admin/workers';
import RoleSelector from 'src/components/Select/RoleSelector';
import { UserData } from 'src/api/user/user';
import { useUserList } from 'src/api/user/hooks';
import { EditWorkerParam } from 'src/components/UserList/components/UserListTable/UserListTable';

const InfoTextField = styled(UserDataInput)(
  ({ theme, hidden }) => `
	& .MuiFilledInput-root.Mui-disabled {
		background-color: white;
		border: 1px solid ${theme.palette.secondary.main};
		cursor: text;
		opacity: ${hidden ? '0.5' : ''};
	}
	& input.Mui-disabled {
		color: ${theme.palette.primary.main};
		-webkit-text-fill-color: ${theme.palette.primary.main};
		cursor: text;
	}
`
);

const Form = styled('form')``;

const EndIconContainer = styled('div')`
  position: absolute;
  display: flex;
  right: 16px;
  cursor: pointer;
`;

export interface EditUserField extends CreateUserForm {
  displayName?: string;
}

interface EditUserFormProps {
  handleOpenBlocking: () => void;
  isBlockedUser?: boolean;
  selectedUserData: UserData | null;
  setIsDirty: (isDirty: boolean) => void;
  onClose: () => void;
  setEditUser: (value: EditWorkerParam) => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  handleOpenBlocking,
  isBlockedUser,
  selectedUserData,
  setIsDirty,
  onClose,
  setEditUser
}) => {
  const {
    register,
    formState: { errors, isDirty },
    reset,
    handleSubmit
  } = useForm<EditUserField>({
    defaultValues: {
      role_id: '',
      middleName: selectedUserData?.middle_name,
      name: selectedUserData?.first_name,
      lastName: selectedUserData?.last_name,
      email: selectedUserData?.email,
      displayName: selectedUserData?.outside_name
    }
  });

  useEffect(() => {
    setIsDirty(isDirty);
  }, [isDirty]);

  const onSubmit: SubmitHandler<EditUserField> = data => {
    putAdminWorkers({
      id: selectedUserData?.id,
      first_name: data.name,
      last_name: data.lastName,
      middle_name: data.middleName,
      outside_name: data.displayName,
      email: data.email,
      phone: data.phoneNumber,
      role_ids: [Number(data.role_id)],
      user_type: selectedUserData?.user_type,
      permission_list: ['CREATE_GROUP_CHATS']
    })
      .then(data => {
        setEditUser(data);
        onClose();
      })
      .catch(err => {
        console.log('ERROR', err);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Button variant='contained' color='secondary' sx={{ mb: 2 }} onClick={handleOpenBlocking}>
          <span>{isBlockedUser ? 'Разблокировать' : 'Заблокировать'}</span>
          <EndIconContainer>
            <LockIcon />
          </EndIconContainer>
        </Button>
        <InfoTextField
          hidden={isBlockedUser}
          label='Id'
          defaultValue={selectedUserData?.id}
          disabled
          InputProps={{
            endAdornment: (
              <EndIconContainer onClick={() => copyToClipboard('3463456456')}>
                <CopyContentIcon />
              </EndIconContainer>
            )
          }}
        />
        <InfoTextField label='Статус' defaultValue='Активен' disabled hidden={isBlockedUser} />
        <RoleSelector
          label='Роль'
          sx={{ height: '46px', mb: 2 }}
          register={register('role_id', { required: 'Обязательное поле' })}
          errorMessage={errors?.role_id?.message}
          disabled={isBlockedUser}
        />
        <UserDataInput
          register={register('lastName', { required: 'Поле обязательно к заполнению' })}
          label='Фамилия'
          error={!!errors?.lastName?.message}
          errorMessage={errors?.lastName?.message}
          disabled={isBlockedUser}
        />
        <UserDataInput
          register={register('name', { required: 'Поле обязательно к заполнению' })}
          label='Имя'
          error={!!errors?.name?.message}
          errorMessage={errors?.name?.message}
          disabled={isBlockedUser}
        />
        <UserDataInput
          register={register('middleName')}
          label='Отчество'
          error={!!errors?.middleName?.message}
          errorMessage={errors?.middleName?.message}
          disabled={isBlockedUser}
        />
        <UserDataInput
          register={register('email')}
          label='E-mail'
          error={!!errors?.email?.message}
          errorMessage={errors?.email?.message}
          disabled={isBlockedUser}
        />
        <InfoTextField
          label='Телефон'
          disabled
          defaultValue={selectedUserData?.phone}
          hidden={isBlockedUser}
        />
        <UserDataInput
          register={register('displayName')}
          label='Отображаемое имя'
          error={!!errors?.displayName?.message}
          errorMessage={errors?.displayName?.message}
          disabled={isBlockedUser}
        />
        <InfoTextField label='Создан' disabled defaultValue='07.06.2022 15:10:32' />
        <InfoTextField label='Изменен' disabled defaultValue='07.06.2022 15:10:32' />
        <Button fullWidth variant='contained' type='submit' disabled={isBlockedUser}>
          Сохранить
        </Button>
      </Form>
    </>
  );
};

export default EditUserForm;
