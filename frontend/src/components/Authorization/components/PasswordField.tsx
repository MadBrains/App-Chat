import React, { useState } from 'react';
import TextInput, { TextInputProps } from 'src/ui/TextInput/TextInput';
import { inputSx } from 'src/components/Authorization/styled';
import { IconButton, InputAdornment } from '@mui/material';
import SvgEyeOff from 'src/assets/icons/EyeOff';
import SvgEye from 'src/assets/icons/Eye';
import { TextFieldProps } from '@mui/material/TextField/TextField';

type PasswordFieldProps = Pick<TextInputProps, 'register' | 'errorMessage'> & TextFieldProps;

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  register,
  errorMessage,
  ...textFieldProps
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setIsShowPassword(prevState => !prevState);
  };

  return (
    <TextInput
      error={!!errorMessage}
      type={isShowPassword ? 'text' : 'password'}
      register={register}
      label={label}
      errorMessage={errorMessage}
      sx={inputSx}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handleClickShowPassword}>
              {!isShowPassword ? <SvgEyeOff /> : <SvgEye />}
            </IconButton>
          </InputAdornment>
        )
      }}
      {...textFieldProps}
    />
  );
};

export default PasswordField;
