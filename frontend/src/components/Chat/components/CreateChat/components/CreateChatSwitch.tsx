import React from 'react';
import { Typography } from 'src/ui/Typography/Typography';
import { StyledSwitch } from 'src/ui/Switch/StyledSwitch';
import { styled } from '@mui/material/styles';
import { UseFormRegisterReturn } from 'react-hook-form';
import CheckboxView from 'src/assets/icons/chat/CheckboxView';
import CheckboxViewChecked from 'src/assets/icons/chat/CheckboxViewChecked';

const SwitchContainer = styled('label')<{ clickable: boolean }>(({ clickable }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: clickable ? 'pointer' : 'auto'
}));

const labelSx = {
  maxWidth: '215px',
  display: 'flex',
  overflowWrap: 'anywhere',
  letterSpacing: '-0.03em'
};

interface CreateChatSwitchProps {
  label: string;
  register?: UseFormRegisterReturn;
  active?: boolean;
}

const CreateChatSwitch: React.FC<CreateChatSwitchProps> = ({ label, register, active }) => {
  const ShowSwitchStatus = active ? <CheckboxViewChecked /> : <CheckboxView />;

  return (
    <SwitchContainer clickable={!!register}>
      <Typography variant='body2' component='span' sx={labelSx}>
        {label}
      </Typography>
      {register ? <StyledSwitch {...register} defaultChecked={!!active} /> : ShowSwitchStatus}
    </SwitchContainer>
  );
};

export default CreateChatSwitch;
