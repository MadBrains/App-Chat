import { styled } from '@mui/material/styles';
import { Button } from 'src/ui/Button/Button';
import TextInput from 'src/ui/TextInput/TextInput';

export const RightsButton = styled(Button)({
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '22px',
  textAlign: 'center',
  letterSpacing: '-0.03em',
  backgroundColor: '#F6F6F6',
  marginBottom: '30px',
  padding: '12px 24px',
  '.MuiButton-endIcon': {
    margin: 0
  }
});

export const EditRoleInput = styled(TextInput)({
  marginBottom: '30px',
  '.MuiInputBase-root': {
    width: '100%'
  },
  '.MuiInputAdornment-root': {
    right: 18,
    left: 'auto'
  },
  '& .MuiFilledInput-root.Mui-disabled': {
    opacity: 0.5
  }
});
