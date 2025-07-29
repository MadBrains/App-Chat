import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps
} from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface SelectOptionsItemProps {
  label?: string;
  value: string;
}

export interface SelectFieldProps extends SelectProps {
  label: string;
  options?: Array<SelectOptionsItemProps> | undefined;
  register?: UseFormRegisterReturn;
  errorMessage?: string;
}

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  marginRight: '39px',
  marginLeft: '39px',
  paddingTop: '17px',
  paddingBottom: '17px',
  borderTop: `1px solid ${theme.palette.secondary.main}`,
  display: 'flex',
  justifyContent: 'center',
  lineHeight: '20px'
}));

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  register = {},
  sx,
  errorMessage,
  ...restSelectProps
}) => {
  return (
    <FormControl sx={sx} size='small' fullWidth error={!!errorMessage}>
      <InputLabel
        sx={{
          fontSize: '16px',
          top: '4px',
          width: '92.5%',
          transformOrigin: 'center',
          display: 'flex',
          justifyContent: 'center',
          '&.MuiInputLabel-shrink': { mt: 1, fontSize: '12px' }
        }}
        id='demo-select-small'
      >
        {label}
      </InputLabel>
      <Select
        {...register}
        id='demo-select-small'
        variant='filled'
        label='Роль'
        MenuProps={{
          PaperProps: {
            sx: {
              boxShadow: 'none !important',
              backgroundColor: (theme: Theme) => theme.palette.input.main,
              backgroundImage: 'none',
              overflow: 'unset',
              borderRadius: '0 0 25px 25px',
              ':before': {
                position: 'absolute',
                content: '""',
                backgroundColor: (theme: Theme) => theme.palette.input.main,
                top: -20,
                left: 0,
                width: '25px',
                height: '25px'
              },
              ':after': {
                position: 'absolute',
                content: '""',
                backgroundColor: (theme: Theme) => theme.palette.input.main,
                top: -20,
                right: 0,
                width: '25px',
                height: '25px'
              }
            }
          }
        }}
        {...restSelectProps}
      >
        {options &&
          options.map(item => (
            <StyledMenuItem key={item.value} value={item.value}>
              {item.label}
            </StyledMenuItem>
          ))}
      </Select>
      {!!errorMessage && (
        <FormHelperText sx={{ textAlign: 'center' }}>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectField;
