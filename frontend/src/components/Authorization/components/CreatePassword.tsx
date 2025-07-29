import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthNewPasswordForm } from 'src/components/Authorization/AuthorizationNewPassword';
import PasswordInput from 'src/components/Authorization/components/InputPassword/PasswordInput';
import {
  AdditionalTitle,
  AuthorizationBlock,
  RecoveryContainer
} from 'src/components/Authorization/styled';
import { Typography } from 'src/ui/Typography/Typography';
import { Button } from 'src/ui/Button/Button';
import { useQuery } from 'src/utils/hooks/useQuery';
import { registration } from 'src/api/auth/login';
import { EnumRoutes } from 'src/config/routes';

const CreatePassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    control
  } = useForm<AuthNewPasswordForm>();
  const [isValidPassword, setIsValidPassword] = useState(false);
  const { inviteValue } = useQuery(['inviteValue']);

  const router = useRouter();

  const onSubmit: SubmitHandler<AuthNewPasswordForm> = data =>
    registration({ password: data.password, username: inviteValue }).then(res =>
      router.push(EnumRoutes.auth)
    );

  return (
    <AuthorizationBlock>
      <RecoveryContainer>
        <Typography variant='h2' component='h2' align='center'>
          Создание пароля
        </Typography>
        <AdditionalTitle>
          Пожалуйста, введите
          <br />
          новый пароль
        </AdditionalTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PasswordInput
            setIsValidPassword={setIsValidPassword}
            repeatPasswordRegister={register('passwordRepeat')}
            passwordRegister={register('password')}
            control={control}
          />
          <Button disabled={!isValidPassword} type='submit' color='primary' variant='contained'>
            Сохранить
          </Button>
        </form>
      </RecoveryContainer>
    </AuthorizationBlock>
  );
};

export default CreatePassword;
