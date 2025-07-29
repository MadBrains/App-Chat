import React, { useState } from 'react';
import { Typography } from 'src/ui/Typography/Typography';
import { IconButton, InputAdornment } from '@mui/material';
import NextIcon from 'src/assets/icons/userEditing/NextIcon';
import {
  ChangePasswordButton,
  ChangePasswordText,
  defaultInputSx,
  EditProfileImageContainer,
  EditUserDataContainer,
  SaveButton,
  SetProfileImage,
  UserDataInput
} from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import DialogDrawer from 'src/ui/Drawer/DialogDrawer';
import EditProfileImage from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/components/EditProfileImage';
import ResetImage from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/components/ResetImage';
import { updateUserInfo, UserData } from 'src/api/user/user';
import { useDispatch } from 'src/redux/store';
import { getProfile } from 'src/redux/slices/profileSlice';
import { parseUserNameForAvatar } from 'src/utils/helpers/parseUserNameForAvatar';
import { toastAlert } from 'src/ui/Alert/toastify';
import ConfirmDrawer from 'src/ui/Drawer/ConfirmDrawer';
import EditProfileDrawer from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/components/EditProfileDrawer/EditProfileDrawer';
import { EnumDrawer } from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/types';

interface EditProfileProps {
  profile: UserData;
  open: boolean;
  onClose: () => void;
}

const editFormValidate = { required: 'Поле обязательно к заполнению' };

const title = {
  [EnumDrawer.emailDrawer]: 'Изменить e-mail',
  [EnumDrawer.passwordDrawer]: 'Изменение пароля',
  [EnumDrawer.phoneDrawer]: 'Изменить номер телефона'
};

export interface EditProfileForm {
  phoneNumber?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  outsideName?: string;
  image?: FileList | null;
}

const EditProfile: React.FC<EditProfileProps> = ({ profile, onClose, open }) => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
    control
  } = useForm<EditProfileForm>({
    defaultValues: {
      image: null,
      middleName: profile?.middle_name ?? '',
      firstName: profile?.first_name ?? '',
      lastName: profile?.last_name ?? '',
      outsideName: profile?.outside_name ?? '',
      phoneNumber: profile?.phone ?? ''
    }
  });

  const [isOpenConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [typeDrawer, setTypeDrawer] = useState<null | EnumDrawer>(null);
  const [formImage, setFormImage] = useState(profile?.avatar_url);
  const dispatch = useDispatch();

  const openDrawer = (type: EnumDrawer) => () => {
    setTypeDrawer(type);
  };

  const closeDrawer = () => {
    setTypeDrawer(null);
  };

  const resetImage = () => {
    reset(formValues => ({
      ...formValues,
      image: null
    }));
    setFormImage(profile?.avatar_url);
  };

  const handleClose = () => {
    if (isDirty) {
      setOpenConfirmDialog(true);
    } else {
      onClose();
    }
  };

  const handleCancelClose = () => {
    setOpenConfirmDialog(false);
  };

  const handleConfirmClose = () => {
    reset();
    setOpenConfirmDialog(false);
    onClose();
  };

  const onSubmit: SubmitHandler<EditProfileForm> = data => {
    updateUserInfo({
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        middle_name: data?.middleName,
        outside_name: data?.outsideName,
        email: profile.email,
        user_type: profile.user_type,
        role_ids: [1]
      } as UserData
    })
      .then(() => dispatch(getProfile()))
      .then(() => reset(formValues => formValues))
      .then(() => toastAlert('Информация обновлена'));
  };

  return (
    <DialogDrawer open={open} title='Мой профиль' onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditProfileImageContainer>
          <EditProfileImage
            src={formImage}
            setFormImage={setFormImage}
            control={control}
            shortUserName={parseUserNameForAvatar({
              firstName: profile?.first_name,
              middleName: profile?.middle_name,
              lastName: profile?.last_name
            })}
          />
          <SetProfileImage>
            <Typography component='span' sx={{ mb: 0.5 }}>
              Изменить <br /> фотографию профиля
            </Typography>
            <ResetImage onResetImage={resetImage} />
          </SetProfileImage>
        </EditProfileImageContainer>
        <EditUserDataContainer>
          <UserDataInput
            register={register('lastName', editFormValidate)}
            error={!!errors?.lastName?.message}
            errorMessage={errors?.lastName?.message}
            label='Фамилия'
          />
          <UserDataInput
            register={register('firstName', editFormValidate)}
            error={!!errors?.firstName?.message}
            errorMessage={errors?.firstName?.message}
            label='Имя'
          />
          <UserDataInput register={register('middleName')} label='Отчество' />
          <UserDataInput register={register('outsideName')} label='Внешнее имя' />
          <UserDataInput
            onClick={openDrawer(EnumDrawer.emailDrawer)}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={openDrawer(EnumDrawer.emailDrawer)}>
                    <NextIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            label='E-mail'
            defaultValue={profile.email}
          />
          <UserDataInput
            register={register('phoneNumber')}
            error={!!errors?.phoneNumber?.message}
            sx={defaultInputSx}
            errorMessage={errors?.phoneNumber?.message}
            InputProps={{
              readOnly: true,
              disabled: true,
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={openDrawer(EnumDrawer.phoneDrawer)}>
                    <NextIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            label='Телефон'
            defaultValue={profile?.phone}
          />
          <ChangePasswordButton
            variant='text'
            endIcon={<NextIcon />}
            onClick={openDrawer(EnumDrawer.passwordDrawer)}
          >
            <ChangePasswordText>Изменить пароль</ChangePasswordText>
          </ChangePasswordButton>
          <SaveButton
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
            variant='contained'
            color='primary'
          >
            Сохранить
          </SaveButton>
          <EditProfileDrawer typeDrawer={typeDrawer} closeDrawer={closeDrawer} />
          <ConfirmDrawer
            open={isOpenConfirmDialog}
            title='Вы уверены, что хотите выйти?'
            description='Ваши данные не сохранятся'
            confirmLabel='Сбросить изменения'
            onCancel={handleCancelClose}
            onConfirm={handleConfirmClose}
          />
        </EditUserDataContainer>
      </form>
    </DialogDrawer>
  );
};

export default EditProfile;
