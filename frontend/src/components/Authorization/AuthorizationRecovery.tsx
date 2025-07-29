import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  AuthorizationBlock,
  inputSx,
  InviteTeapotTitle,
  RecoveryContainer
} from 'src/components/Authorization/styled';
import TextInput from 'src/ui/TextInput/TextInput';
import AuthorizationDescription from 'src/components/Authorization/components/AuthorizationDescription';
import AuthorizationTitle from 'src/components/Authorization/components/AuthorizationTitle';
import { EnumRoutes } from 'src/config/routes';
import SendEmailButton from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/components/SendEmailButton';
import { emailPattern } from 'src/config/formPatterns';
import { useRouter } from 'next/router';
import { useQuery } from 'src/utils/hooks/useQuery';
import { Typography } from 'src/ui/Typography/Typography';
import { recoveryPassword } from 'src/api/auth/login';

interface RecoveryAuthForm {
  email: string;
}
const AuthorizationRecovery = () => {
  const {
    register,
    formState: { errors, isValid, isSubmitted, submitCount },
    handleSubmit
  } = useForm<RecoveryAuthForm>();
  const { teapot } = useQuery(['teapot']);

  const onSubmit: SubmitHandler<RecoveryAuthForm> = data => recoveryPassword(data.email);

  return (
    <AuthorizationBlock>
      <RecoveryContainer>
        <div>
          <AuthorizationTitle teapot={teapot} path={EnumRoutes.authRecovery} />
          {teapot && (
            <InviteTeapotTitle>
              Срок действия ссылки истёк. <br /> Пожалуйста, отправьте ссылку для восстановления{' '}
              <br />
              пароля повторно.
            </InviteTeapotTitle>
          )}
          <form>
            <TextInput
              error={!!errors?.email?.message}
              register={register('email', {
                required: 'Поле обязательно к заполнению',
                pattern: emailPattern
              })}
              label='E-mail или телефон'
              errorMessage={errors?.email?.message}
              sx={inputSx}
            />
            <SendEmailButton
              onClick={handleSubmit(onSubmit)}
              isSubmitted={isSubmitted}
              isValid={isValid}
              buttonText='Восстановить пароль'
            />
          </form>
        </div>
        {isSubmitted && <AuthorizationDescription />}
      </RecoveryContainer>
    </AuthorizationBlock>
  );
};

export default AuthorizationRecovery;
