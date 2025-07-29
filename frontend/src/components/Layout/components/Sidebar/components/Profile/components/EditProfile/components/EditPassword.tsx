import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  ChangeInfo,
  EditPasswordContainer
} from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/styled';
import PasswordField from 'src/components/Authorization/components/PasswordField';
import { Button } from 'src/ui/Button/Button';
import { changeUserPassword } from 'src/api/user/user';
import { toastAlert } from 'src/ui/Alert/toastify';
import PasswordValidation from 'src/components/Authorization/components/PasswordValidation';
export interface EditPasswordForm {
  password: string;
  passwordRepeat: string;
  oldPassword: string;
}
interface EditPasswordProps {
  close: () => void;
}

const EditPassword = ({ close }: EditPasswordProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    getValues,
    control
  } = useForm<EditPasswordForm>();

  const onSubmit: SubmitHandler<EditPasswordForm> = data => {
    changeUserPassword({ new_pass: data.password, old_pass: data.oldPassword })
      .then(r => close())
      .then(() => toastAlert('Пароль изменен'))
      .catch(e => {
        setError('oldPassword', { type: 'custom', message: 'Неверный пароль' });
      });
  };
  const [isValidPassword, setIsValidPassword] = useState(false);

  return (
    <div>
      <ChangeInfo>Пожалуйста, введите новый пароль</ChangeInfo>
      <EditPasswordContainer>
        <div>
          <PasswordField
            label='Старый пароль'
            register={register('oldPassword', {
              required: 'Поле обязательно к заполнению'
            })}
            errorMessage={errors?.oldPassword?.message}
          />
          <PasswordField
            label='Новый пароль'
            register={register('password', {
              required: 'Поле обязательно к заполнению'
            })}
            errorMessage={errors?.password?.message}
          />
          <PasswordField
            label='Повторите пароль'
            register={register('passwordRepeat', {
              required: 'Поле обязательно к заполнению',
              validate: value => value === getValues('password') || 'Пароли различаются'
            })}
            error={!!errors?.passwordRepeat?.message}
            errorMessage={errors?.passwordRepeat?.message}
          />
        </div>
        <PasswordValidation control={control} setIsValidPassword={setIsValidPassword} />
        <Button
          disabled={!isValidPassword}
          onClick={handleSubmit(onSubmit)}
          color='primary'
          variant='contained'
        >
          Сохранить
        </Button>
      </EditPasswordContainer>
    </div>
  );
};

export default EditPassword;
