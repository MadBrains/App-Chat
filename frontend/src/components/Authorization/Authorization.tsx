import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'src/ui/Button/Button';
import TextInput from 'src/ui/TextInput/TextInput';
import {
  AuthorizationBlock,
  AuthorizationContainer,
  inputSx
} from 'src/components/Authorization/styled';
import PasswordField from 'src/components/Authorization/components/PasswordField';
import { EnumRoutes } from 'src/config/routes';
import AuthorizationTitle from 'src/components/Authorization/components/AuthorizationTitle';
import AuthorizationDescription from 'src/components/Authorization/components/AuthorizationDescription';
import { setAuthTokens } from 'src/utils/helpers/authHelper';
import { useRouter } from 'next/router';
import { loginRequest } from 'src/api/auth/login';

export interface AuthForm {
  email: string;
  password: string;
}

const Authorization = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm<AuthForm>();
  const router = useRouter();

  const onSubmit: SubmitHandler<AuthForm> = data => {
    loginRequest({ username: data.email, password: data.password })
      .then(data => {
        setAuthTokens(data);
        router.push('/clients');
      })
      .catch(err => {
        console.log('ERROR', err);
        setError('email', {
          type: 'custom',
          message: 'Введённый адрес электронной почты или пароль неверен'
        });
      });
  };

  return (
    <AuthorizationBlock>
      <AuthorizationContainer>
        <div>
          <AuthorizationTitle path={EnumRoutes.auth} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              error={!!errors?.email?.message}
              register={register('email', {
                required: 'Поле обязательно к заполнению'
              })}
              label='E-mail или телефон'
              sx={inputSx}
            />

            <PasswordField
              error={!!errors?.email?.message}
              label='Пароль'
              register={register('password', {
                required: 'Поле обязательно к заполнению'
              })}
              errorMessage={errors?.email?.message}
            />

            <Button type='submit' color='primary' variant='contained'>
              Войти
            </Button>
          </form>
        </div>
        <AuthorizationDescription />
      </AuthorizationContainer>
    </AuthorizationBlock>
  );
};

export default Authorization;
