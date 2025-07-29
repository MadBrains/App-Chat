import { Colors } from 'src/config/colors';
import { styled } from '@mui/material/styles';

export const AuthorizationBlock = styled('div')({
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
});

export const AuthorizationContainer = styled('div')({
  minHeight: '365px',
  maxWidth: '400px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

export const RecoveryContainer = styled('div')({
  minHeight: '365px',
  maxWidth: '460px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

export const AdditionalTitle = styled('div')({
  color: `${Colors.darkGray}`,
  marginTop: '10px',
  marginBottom: '40px',
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '17.85px'
});

export const RecoverPassword = styled('div')({
  marginTop: '5px',
  color: `${Colors.black}`,
  fontSize: '14px',
  textAlign: 'center',
  cursor: 'pointer',
  textDecoration: 'underline'
});

export const DescriptionBlock = styled('div')({
  textAlign: 'center'
});

export const Description = styled('div')({
  color: `${Colors.darkGray}`,
  fontSize: '14px',
  marginBottom: '5px'
});

export const Subtitle = styled('div')({
  color: `${Colors.black}`,
  fontSize: '14px'
});

export const buttonSx = {
  marginBottom: '15px'
};

export const inputSx = {
  marginBottom: '15px',
  '& .MuiFilledInput-input': {
    paddingLeft: 0
  }
};
export const retrievePassword = {
  textAlign: 'center',
  position: 'relative',
  right: '40px'
};

export const arrowLeftSx = {
  marginRight: '45px'
};

export const PasswordValidationContainer = styled('span')({
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '15px'
});

export const IconBox = styled('span')({
  marginRight: '10px'
});

export const InviteTeapotTitle = styled('p')(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: '8px',
  textAlign: 'center',
  lineHeight: '19px',
  marginBottom: '28px'
}));
