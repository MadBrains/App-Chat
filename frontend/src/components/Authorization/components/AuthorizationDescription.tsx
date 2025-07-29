import React from 'react';
import {
  DescriptionBlock,
  Description,
  Subtitle,
  RecoverPassword
} from 'src/components/Authorization/styled';
import { useRouter } from 'next/router';
import { EnumRoutes } from 'src/config/routes';

const AuthorizationDescription = () => {
  const router = useRouter();

  const handleMoveRecovery = () => {
    router.push(EnumRoutes.authRecovery);
  };

  return (
    <DescriptionBlock>
      {router.pathname === EnumRoutes.authRecovery && (
        <div>
          <Description>
            На указанный e-mail отправлено письмо для смены пароля.
            <br />
            Пожалуйста, перейдите по ссылке в письме
          </Description>
          <Subtitle>Ссылка действительна 24 часа</Subtitle>
        </div>
      )}
      {router.pathname === EnumRoutes.auth && (
        <RecoverPassword onClick={handleMoveRecovery}>Восстановить пароль</RecoverPassword>
      )}
    </DescriptionBlock>
  );
};

export default AuthorizationDescription;
