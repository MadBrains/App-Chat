import React from 'react';
import { TextField } from '@mui/material';
import { textInputSx } from 'src/ui/TextInput/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField/TextField';

export interface TextInputProps {
  errorMessage?: string;
  register?: UseFormRegisterReturn;
}

const TextInput: React.FC<TextInputProps & TextFieldProps> = ({
  errorMessage,
  register = {},
  sx = {},
  ...textFieldProps
}) => (
  <TextField
    {...register}
    variant='filled'
    sx={{ ...textInputSx, ...sx }}
    helperText={errorMessage}
    autoComplete='off'
    {...textFieldProps}
  />
);

export default TextInput;
