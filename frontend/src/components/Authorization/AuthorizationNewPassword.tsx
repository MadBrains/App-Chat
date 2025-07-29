import React, { useState } from 'react';
import { AuthorizationBlock, RecoveryContainer } from 'src/components/Authorization/styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'src/ui/Button/Button';
import PasswordField from 'src/components/Authorization/components/PasswordField';
import PasswordValidation from 'src/components/Authorization/components/PasswordValidation';
import AuthorizationTitle from 'src/components/Authorization/components/AuthorizationTitle';
import { EnumRoutes } from 'src/config/routes';
import { useQuery } from 'src/utils/hooks/useQuery';
import { setNewPassword } from 'src/api/auth/login';
import { useRouter } from 'next/router';
import PasswordInput from 'src/components/Authorization/components/InputPassword/PasswordInput';

export interface AuthNewPasswordForm {
  password: string;
  passwordRepeat: string;
}

const AuthorizationNewPassword: React.FC<AuthNewPasswordForm> = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    clearErrors,
    reset,
    getValues,
    control
  } = useForm<AuthNewPasswordForm>();
  const [isValidPassword, setIsValidPassword] = useState(false);
  const { uuid, userId } = useQuery(['uuid', 'userId']);
  const router = useRouter();

  const onSubmit: SubmitHandler<AuthNewPasswordForm> = data =>
    setNewPassword({ password: data.password, invite_code: uuid, userId }).then(() =>
      router.push(EnumRoutes.auth)
    );

  return (
    <AuthorizationBlock>
      <RecoveryContainer>
        <div>
          <AuthorizationTitle path={EnumRoutes.authNewPassword} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <PasswordInput
              passwordRegister={register('password', {
                required: 'Поле обязательно к заполнению'
              })}
              repeatPasswordRegister={register('passwordRepeat', {
                required: 'Поле обязательно к заполнению',
                validate: value => value === getValues('password') || 'Пароли различаются'
              })}
              control={control}
              setIsValidPassword={setIsValidPassword}
            />
            <Button disabled={!isValidPassword} type='submit' color='primary' variant='contained'>
              Сохранить
            </Button>
          </form>
        </div>
      </RecoveryContainer>
    </AuthorizationBlock>
  );
};

export default AuthorizationNewPassword;
