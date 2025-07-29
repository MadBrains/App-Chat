import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from 'src/ui/Typography/Typography';
import { StyledSwitch } from 'src/ui/Switch/StyledSwitch';

const SwitchContainer = styled('label')({
  display: 'flex',
  alignItems: 'center',
  cursor: 'auto'
});

interface SwitchWithLabelProps {
  label?: string;
  defaultChecked?: boolean;
  register?: any;
  checked?: boolean;
}
const SwitchWithLabel: React.FC<SwitchWithLabelProps> = ({
  label,
  defaultChecked,
  register,
  checked
}) => {
  return (
    <SwitchContainer>
      <StyledSwitch defaultChecked={defaultChecked} checked={checked} {...register} />
      <Typography
        variant='body2'
        component='span'
        letterSpacing='-0.03em'
        sx={{ fontSize: '16px', lineHeight: '22px' }}
      >
        {label}
      </Typography>
    </SwitchContainer>
  );
};

export default SwitchWithLabel;
