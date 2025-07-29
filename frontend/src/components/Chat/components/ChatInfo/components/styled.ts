import { styled } from '@mui/material/styles';

export const ChatDescriptionContainer = styled('div')(({ theme }) => ({
  marginTop: '4px',
  marginBottom: '25px',
  padding: '15px',
  width: '100%',
  height: '100%',
  background: '#EEEDED',
  color: theme.palette.primary.main,
  fontSize: '14px',
  lineHeight: '19px'
}));

export const ChatText = styled('span')(({ theme }) => ({
  color: theme.palette.info.light,
  fontSize: '14px',
  lineHeight: '16px'
}));

export const ChatTitle = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '24px',
  lineHeight: '33px',
  padding: '4px 0',
  wordBreak: 'break-word'
}));

export const ChatOption = styled('span')({
  fontSize: '12px',
  lineHeight: '16px'
});

export const ChatBaseInformation = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 10
});

export const Container = styled('div')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});
