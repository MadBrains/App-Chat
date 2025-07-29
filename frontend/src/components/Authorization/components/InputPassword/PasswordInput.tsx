import React from 'react';
import PasswordField from 'src/components/Authorization/components/PasswordField';
import PasswordValidation from 'src/components/Authorization/components/PasswordValidation';
import { AuthNewPasswordForm } from 'src/components/Authorization/AuthorizationNewPassword';
import { Control, UseFormRegisterReturn } from 'react-hook-form';

interface PasswordInputProps {
  passwordRegister: UseFormRegisterReturn;
  repeatPasswordRegister: UseFormRegisterReturn;
  passwordErrorMessage?: string;
  passwordRepeatErrorMessage?: string;
  control: Control<AuthNewPasswordForm, any>;
  setIsValidPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  passwordRegister,
  repeatPasswordRegister,
  setIsValidPassword,
  passwordErrorMessage,
  passwordRepeatErrorMessage,
  control
}) => {
  return (
    <>
      <PasswordField
        label='Пароль'
        register={passwordRegister}
        errorMessage={passwordErrorMessage}
      />
      <PasswordField
        label='Повторите пароль'
        register={repeatPasswordRegister}
        errorMessage={passwordRepeatErrorMessage}
      />
      <PasswordValidation control={control} setIsValidPassword={setIsValidPassword} />
    </>
  );
};

export default PasswordInput;
