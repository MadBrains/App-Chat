import { styled } from '@mui/material/styles';
import { Button } from 'src/ui/Button/Button';
import TextInput from 'src/ui/TextInput/TextInput';
import { Colors } from 'src/config/theme/palette';

export const EditProfileImageContainer = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

export const SetProfileImage = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

export const EditUserDataContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 49
});

export const ChangePasswordButton = styled(Button)(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  paddingRight: 35,
  paddingLeft: 35,
  letterSpacing: '-0.03em',
  minHeight: 46,
  borderRadius: 100,
  width: '100%',
  maxWidth: '100%',
  backgroundColor: theme.palette.input.main
}));

export const ChangePasswordText = styled('span')({
  flex: 1,
  fontWeight: 400
});

export const UserDataInput = styled(TextInput)({
  cursor: 'pointer',
  marginBottom: 16,
  '.MuiInputBase-root': {
    width: '100%',
    cursor: `pointer !important`
  },
  '.MuiInputAdornment-root': {
    right: 18,
    left: 'auto'
  },
  '& .MuiFilledInput-root.Mui-disabled': {
    opacity: 0.5
  }
});

export const SaveButton = styled(Button)({
  marginTop: 24,
  width: '100%',
  maxWidth: '100%'
});

export const deleteButtonSx = { maxWidth: '100px', borderRadius: 'initial', padding: 0.5 };

export const ChangeInfo = styled('span')({
  display: 'inline-block',
  marginBottom: '20px',
  color: '#A5A5A5',
  fontSize: 14,
  lineHeight: '18px'
});

export const EditPasswordContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

export const invisibleInput = {
  opacity: 0,
  position: 'absolute',
  left: 0,
  height: '100%',
  zIndex: 1,
  width: '100%',
  '& .MuiInputBase-input': {
    height: '100%',
    cursor: 'pointer'
  }
};

export const defaultInputSx = { '& .MuiFilledInput-root.Mui-disabled': { opacity: '1' } };
