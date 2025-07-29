import React from 'react';
import { IconButton } from 'src/ui/IconButton/IconButton';
import {
  AdditionalTitle,
  arrowLeftSx,
  retrievePassword
} from 'src/components/Authorization/styled';
import SvgArrowLeft from 'src/assets/icons/ArrowLeft';
import { Typography } from 'src/ui/Typography/Typography';
import { EnumRoutes } from 'src/config/routes';
import { useRouter } from 'next/router';
interface AuthorizationTitleProps {
  path: EnumRoutes;
  teapot?: string;
}
const AuthorizationTitle: React.FC<AuthorizationTitleProps> = ({ path, teapot }) => {
  const router = useRouter();
  const handleMoveBack = () => {
    router.push(EnumRoutes.auth);
  };

  return (
    <div>
      {path === EnumRoutes.auth ? (
        <Typography variant='h2' component='h2' sx={{ textAlign: 'center' }}>
          Авторизация
        </Typography>
      ) : (
        <Typography variant='h2' component='h2' sx={retrievePassword}>
          <IconButton onClick={handleMoveBack} sx={arrowLeftSx}>
            <SvgArrowLeft height={24} width={24} />
          </IconButton>
          Восcтановление пароля
        </Typography>
      )}
      {path === EnumRoutes.authNewPassword ? (
        <AdditionalTitle>
          Пожалуйста, введите
          <br />
          новый пароль
        </AdditionalTitle>
      ) : (
        <>
          {!teapot && (
            <AdditionalTitle>
              Пожалуйста, введите ваш эл. адрес для получения <br /> ссылки для восстановления
              пароля
            </AdditionalTitle>
          )}
        </>
      )}
    </div>
  );
};

export default AuthorizationTitle;
