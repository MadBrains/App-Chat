import React, { useEffect, useState } from 'react';
import { Button } from 'src/ui/Button/Button';
import { useCountDown } from 'src/utils/hooks/useCountDown';

interface SendEmailButtonProps {
  onClick?: () => void;
  isSubmitted?: boolean;
  isValid: boolean;
  isAuth?: boolean;
  buttonText: string;
}

const SendEmailButton: React.FC<SendEmailButtonProps> = ({
  onClick,
  isValid,
  isSubmitted,
  buttonText
}) => {
  const { counter, start, startCountDown } = useCountDown(45, 1000);
  const isDisabledButton = !isValid || startCountDown;

  const sendEmail = () => {
    onClick && onClick();
    start();
  };

  return (
    <Button
      type={'submit'}
      sx={{ mt: 3, mb: 3, width: '100%', maxWidth: '100%' }}
      onClick={sendEmail}
      disabled={isDisabledButton}
      variant='contained'
      color='primary'
    >
      {!isSubmitted && !startCountDown && <span>{buttonText}</span>}
      {isSubmitted && !startCountDown && <span>Отправить ссылку повторно</span>}
      {startCountDown && <span>Повторно отправить через {counter}c</span>}
    </Button>
  );
};

export default SendEmailButton;
