import React from 'react';
import {
  ChangeInfo,
  UserDataInput
} from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import SendEmailButton from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/components/SendEmailButton';
import { emailPattern } from 'src/config/formPatterns';
import { changeUserEmail } from 'src/api/user/user';

interface EditEmailProps {
  email?: string;
}

interface EditEmailForm {
  email: string;
}

const ChangeEmailInfo = styled('span')({
  display: 'inline-block',
  marginBottom: '20px',
  color: '#A5A5A5',
  fontSize: 14,
  lineHeight: '18px'
});

const EditEmail: React.FC<EditEmailProps> = ({ email }) => {
  const {
    register,
    formState: { errors, isValid, isSubmitted },
    handleSubmit
  } = useForm<EditEmailForm>();

  const onSubmit: SubmitHandler<EditEmailForm> = data => {
    changeUserEmail(data.email).then(r => console.log(r));
  };
  return (
    <div>
      <ChangeInfo>Введите свой e-mail. Мы вышлем на него ссылку для подтверждения</ChangeInfo>
      <UserDataInput
        error={!!errors.email?.message}
        errorMessage={errors.email?.message}
        defaultValue={email}
        register={register('email', {
          required: 'Поле обязательно к заполнению',
          pattern: emailPattern
        })}
        label='E-mail'
      />
      <SendEmailButton
        onClick={handleSubmit(onSubmit)}
        isValid={isValid}
        isSubmitted={isSubmitted}
        buttonText='Отправить ссылку для подтверждения'
      />
      {isSubmitted && (
        <>
          <ChangeEmailInfo>
            На указанный e-mail отправлено письмо для подтверждения. Пожалуйста, перейдите по ссылке
            в письме
          </ChangeEmailInfo>
          <span>Ссылка действительна 24 часа</span>
        </>
      )}
    </div>
  );
};

export default EditEmail;
